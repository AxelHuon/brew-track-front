import type { DrinkTypeCountDTO } from '@/api/generated/Api.schemas.ts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import React, { useMemo } from 'react';
import { Pie, PieChart } from 'recharts';

interface ChartByTypeOfDrinksProps {
  data: DrinkTypeCountDTO;
}

const ChartByTypeOfDrinks: React.FC<ChartByTypeOfDrinksProps> = ({ data }) => {
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

  const chartData = useMemo(() => {
    return Object.entries(data.drinkTypeCounts).map(([type, count], index) => ({
      type,
      count,
      fill: colorPalette[index % colorPalette.length],
    }));
  }, [data.drinkTypeCounts]);

  const mostDrinkedType = useMemo(() => {
    return chartData.reduce((prev, current) =>
      prev.count > current.count ? prev : current
    );
  }, [chartData]);

  const currentYear = new Date().getFullYear();
  const chartPeriod = `Janvier - Décembre ${currentYear}`;

  const chartConfig = useMemo(() => {
    return chartData.reduce((config, { type, fill }) => {
      // @ts-ignore
      config[type] = {
        label: type,
        color: fill,
      };
      return config;
    }, {});
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Type d'alcool consommé</CardTitle>
        <CardDescription>{chartPeriod}</CardDescription>
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
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="type"
              stroke="0"
              cx="50%"
              cy="50%"
              outerRadius={80}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-regular leading-none">
          C'est le/la{' '}
          <strong className={'font-medium'}>{mostDrinkedType.type}</strong> que
          vous consommez le plus.
        </div>
        <div className="leading-none text-muted-foreground">
          Votre rétrospective pour l'année {currentYear} en types de boissons
          consommées.
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartByTypeOfDrinks;
