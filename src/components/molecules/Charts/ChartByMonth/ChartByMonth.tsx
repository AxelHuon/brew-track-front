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
import { TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

const getMonthName = (date: string) => {
  const options = { month: 'long' } as const;
  return new Date(date).toLocaleDateString('fr-FR', options);
};

const generateSurroundingMonths = (monthName: string, year: number) => {
  const months = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ];

  const currentIndex = months.indexOf(monthName.toLowerCase());
  if (currentIndex === -1) return []; // Sécurité

  const getMonthYear = (indexOffset: number) => {
    let newIndex = currentIndex + indexOffset;
    let newYear = year;

    if (newIndex < 0) {
      newIndex += 12;
      newYear -= 1;
    } else if (newIndex >= 12) {
      newIndex -= 12;
      newYear += 1;
    }

    return { month: months[newIndex], year: newYear };
  };

  return [
    getMonthYear(-2),
    getMonthYear(-1),
    { month: monthName, year },
    getMonthYear(1),
    getMonthYear(2),
  ];
};

const ChartByMonths: React.FC<{ drinks: DrinkDTO[] }> = ({ drinks }) => {
  const drinksByMonth = drinks
    .sort((a, b) => {
      return new Date(a.drinkDate).getTime() - new Date(b.drinkDate).getTime();
    })
    .reduce<Record<string, number>>((acc, drink) => {
      const dateObj = new Date(drink.drinkDate);
      const month = getMonthName(drink.drinkDate);
      const year = dateObj.getFullYear();
      const key = `${month} ${year}`;

      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

  let allMonths = Object.keys(drinksByMonth);
  if (allMonths.length === 1) {
    const [singleMonth] = allMonths;
    const [monthName, yearStr] = singleMonth.split(' ');
    const surroundingMonths = generateSurroundingMonths(
      monthName,
      parseInt(yearStr, 10)
    );
    allMonths = surroundingMonths.map(({ month, year }) => `${month} ${year}`);
  }

  const chartData = allMonths.map((monthKey) => ({
    month: monthKey,
    count: drinksByMonth[monthKey] || 0,
  }));

  const lastMonthData =
    chartData.length > 1 ? chartData[chartData.length - 2].count : 0;
  const currentMonthData =
    chartData.length > 0 ? chartData[chartData.length - 1].count : 0;

  let percentageChange = 0;
  if (lastMonthData > 0) {
    percentageChange =
      ((currentMonthData - lastMonthData) / lastMonthData) * 100;
  }

  const isIncrease = percentageChange > 0;
  const trendIcon = isIncrease ? (
    <TrendingUp className="h-4 w-4 text-green-500" />
  ) : (
    <TrendingDown className="h-4 w-4 text-red-500" />
  );
  const trendText = isIncrease
    ? `Tendance en hausse de ${percentageChange.toFixed(1)}% ce mois-ci`
    : `Tendance en baisse de ${Math.abs(percentageChange).toFixed(1)}% ce mois-ci`;

  const chartConfig = {
    count: {
      label: 'Nombre de boissons',
      color: 'var(--color-chart-1)',
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consommation mensuelle</CardTitle>
        <CardDescription>Nombre total de boissons par mois</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="count"
              type="natural"
              fill="var(--color-chart-1)"
              fillOpacity={0.4}
              stroke="var(--color-chart-1)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-start gap-2 font-medium leading-none">
              {trendText} {trendIcon}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Vue mensuelle des consommations
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartByMonths;
