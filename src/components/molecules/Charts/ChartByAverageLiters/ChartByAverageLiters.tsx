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
import { TrendingUp } from 'lucide-react';
import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

const getMonthName = (date: string) => {
  const options = { month: 'long', year: 'numeric' } as const;
  return new Date(date).toLocaleDateString('fr-FR', options);
};

const getSurroundingMonths = (currentMonth: string) => {
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

  const [monthName, yearStr] = currentMonth.split(' ');
  const year = parseInt(yearStr, 10);
  const currentIndex = months.indexOf(monthName.toLowerCase());

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
    return `${months[newIndex]} ${newYear}`;
  };

  return [
    getMonthYear(-2),
    getMonthYear(-1),
    currentMonth,
    getMonthYear(1),
    getMonthYear(2),
  ];
};

const ChartByAverageLiters: React.FC<{ drinks: DrinkDTO[] }> = ({ drinks }) => {
  const drinksByMonth = drinks.reduce<
    Record<string, { totalLiters: number; count: number }>
  >((acc, drink) => {
    const monthKey = getMonthName(drink.drinkDate);
    if (!acc[monthKey]) {
      acc[monthKey] = { totalLiters: 0, count: 0 };
    }
    acc[monthKey].totalLiters += drink.litersConsumed;
    acc[monthKey].count += 1;
    return acc;
  }, {});

  let allMonths = Object.keys(drinksByMonth);
  if (allMonths.length === 1) {
    const [singleMonth] = allMonths;
    allMonths = getSurroundingMonths(singleMonth);
  }

  const chartData = allMonths.map((monthKey) => ({
    month: monthKey,
    averageLiters: drinksByMonth[monthKey]
      ? parseFloat(
          (
            drinksByMonth[monthKey].totalLiters / drinksByMonth[monthKey].count
          ).toFixed(2)
        )
      : 0,
  }));

  const lastMonthData = chartData[chartData.length - 2]?.averageLiters || 0;
  const currentMonthData = chartData[chartData.length - 1]?.averageLiters || 0;
  const percentageChange =
    lastMonthData > 0
      ? parseFloat(
          (((currentMonthData - lastMonthData) / lastMonthData) * 100).toFixed(
            2
          )
        )
      : 0;

  const chartConfig = {
    averageLiters: {
      label: 'Moyenne litres bus',
      color: 'var(--chart-1)',
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consommation moyenne de litres par mois</CardTitle>
        <CardDescription>Nombre moyen de litres bus par mois</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="averageLiters"
              fill="var(--color-chart-1)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {percentageChange > 0 ? (
            <>
              Tendance en hausse de {percentageChange}% ce mois-ci{' '}
              <TrendingUp className="h-4 w-4 text-green-500" />
            </>
          ) : percentageChange < 0 ? (
            <>
              Tendance en baisse de {Math.abs(percentageChange)}% ce mois-ci{' '}
              <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
            </>
          ) : (
            'Consommation stable ce mois-ci'
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Vue mensuelle de la consommation moyenne de litres
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartByAverageLiters;
