import type { DrinkDTO } from '@/api/generated/Api.schemas.ts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import React from 'react';
import { Pie, PieChart } from 'recharts';

interface ChartByTypeOfDrinksProps {
  drinks: DrinkDTO[];
}

const ChartByTypeOfDrinks: React.FC<ChartByTypeOfDrinksProps> = ({
  drinks,
}) => {
  const drinksByType = drinks.reduce<Record<string, number>>((acc, drink) => {
    if (acc[drink.drinkType.name]) {
      acc[drink.drinkType.name] += 1;
    } else {
      acc[drink.drinkType.name] = 1;
    }
    return acc;
  }, {});
  /* Convert to chart data */
  const colorPalette = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
    'var(--chart-5)',
    'var(--chart-6)',
    'var(--chart-7)',
    'var(--chart-8)',
  ];

  const chartData = Object.entries(drinksByType).map(
    ([type, count], index) => ({
      type,
      count,
      fill: colorPalette[index % colorPalette.length],
    })
  );
  const chartConfig = Object.fromEntries(
    Object.keys(drinksByType).map((type, index) => [
      type,
      {
        label: type.charAt(0).toUpperCase() + type.slice(1), // Capitalisation
        color: colorPalette[index % colorPalette.length],
      },
    ])
  ) satisfies ChartConfig;
  const mostDrinkedType = chartData.reduce(
    (acc, curr) => (curr.count > acc.count ? curr : acc),
    {
      type: '',
      count: 0,
      fill: '',
    }
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Type d'alcool bus</CardTitle>
        <CardDescription>Janvier - Décembre 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="count" nameKey="type" stroke="0" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          C'est le/la {mostDrinkedType.type} que vous buvez le plus.
        </div>
        <div className="leading-none text-muted-foreground">
          Votre retrospectives sur l'année 2025 en type d'alcool bus
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartByTypeOfDrinks;
