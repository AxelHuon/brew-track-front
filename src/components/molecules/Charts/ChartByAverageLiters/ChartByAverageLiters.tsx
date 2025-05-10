import type { MonthlyAverageConsumptionDTO } from '@/api/generated/Api.schemas.ts';
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

const formatMonthKey = (monthKey: string) => {
  const [year, month] = monthKey.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  const options = { month: 'long', year: 'numeric' } as const;
  return date.toLocaleDateString('fr-FR', options);
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

const ChartByAverageLiters: React.FC<{
  monthlyAverageConsumption?: MonthlyAverageConsumptionDTO;
}> = ({ monthlyAverageConsumption }) => {
  // Si les données sont indisponibles, afficher un tableau vide
  if (!monthlyAverageConsumption || !monthlyAverageConsumption.monthlyAverage) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Consommation moyenne de litres par mois</CardTitle>
          <CardDescription>Aucune donnée disponible</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Convertir le format de données en tableau pour le graphique
  let formattedData = Object.entries(monthlyAverageConsumption.monthlyAverage)
    .map(([monthKey, value]) => ({
      originalKey: monthKey,
      month: formatMonthKey(monthKey),
      averageLiters: parseFloat(value.toFixed(2)),
    }))
    .sort((a, b) => {
      // Trier par date (originalKey est au format YYYY-MM)
      return a.originalKey.localeCompare(b.originalKey);
    });

  // S'il n'y a qu'un seul mois, ajouter les mois environnants
  if (formattedData.length === 1) {
    const singleMonth = formattedData[0].month;
    const surroundingMonths = getSurroundingMonths(singleMonth);

    // Créer un nouveau tableau de données incluant les mois environnants
    formattedData = surroundingMonths.map((month) => {
      const existingData = formattedData.find((item) => item.month === month);
      if (existingData) {
        return existingData;
      }
      // Créer une entrée pour les mois manquants
      const monthIndex = month.split(' ')[0].toLowerCase();
      const year = month.split(' ')[1];
      const monthNumber =
        [
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
        ].indexOf(monthIndex) + 1;
      const paddedMonth = monthNumber.toString().padStart(2, '0');

      return {
        originalKey: `${year}-${paddedMonth}`,
        month: month,
        averageLiters: 0,
      };
    });
  }

  // Calculer le changement de pourcentage entre le mois actuel et le mois précédent
  const lastMonthData =
    formattedData[formattedData.length - 2]?.averageLiters || 0;
  const currentMonthData =
    formattedData[formattedData.length - 1]?.averageLiters || 0;
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
          <BarChart accessibilityLayer data={formattedData}>
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
