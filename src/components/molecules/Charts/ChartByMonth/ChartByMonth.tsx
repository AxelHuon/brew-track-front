import type { MonthlyDrinkCountDTO } from '@/api/generated/Api.schemas.ts';
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

const ChartByMonths: React.FC<{
  data: MonthlyDrinkCountDTO;
}> = ({ data }) => {
  const { monthlyCounts } = data;

  // On transforme les données reçues (objet clé-valeur) en tableau exploitable par le graphique
  const sortedEntries = Object.entries(monthlyCounts).sort(
    ([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime()
  );

  const chartData = sortedEntries.map(([date, count]) => ({
    month: new Date(date).toLocaleDateString('fr-FR', {
      month: 'long',
      year: 'numeric',
    }),
    count, // Valeur du nombre total
  }));

  // Récupération des données des deux derniers mois pour afficher la tendance
  const lastMonthData =
    chartData.length > 1 ? chartData[chartData.length - 2].count : 0;
  const currentMonthData =
    chartData.length > 0 ? chartData[chartData.length - 1].count : 0;

  // Calcul de la variation en pourcentage
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
