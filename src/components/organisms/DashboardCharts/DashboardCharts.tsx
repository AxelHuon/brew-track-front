import type { GetDrinksByUserIdDTO } from '@/api/generated/Api.schemas.ts';
import ChartByAverageLiters from '@/components/molecules/Charts/ChartByAverageLiters/ChartByAverageLiters';
import ChartByMonth from '@/components/molecules/Charts/ChartByMonth/ChartByMonth.tsx';
import ChartByTypeOfDrinks from '@/components/molecules/Charts/ChartByTypeOfDrinks/ChartByTypeOfDrinks.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { RotateCcw } from 'lucide-react';
import { useQueryState } from 'nuqs';
import React from 'react';

interface DashBoardChartsProps {
  drinksData?: GetDrinksByUserIdDTO;
  isLoading: boolean;
}

const DashboardCharts: React.FC<DashBoardChartsProps> = ({
  drinksData,
  isLoading,
}) => {
  const [alcohol, setAlcohol] = useQueryState('type');
  const resultEmpty =
    !isLoading && drinksData?.drinks && drinksData.drinks.length === 0;
  const resultEmptyBcOfFilter =
    !isLoading &&
    drinksData?.drinks &&
    drinksData.drinks.length === 0 &&
    alcohol !== null;

  const handleResetFilter = async () => {
    await setAlcohol(null);
  };

  return (
    <div
      className={
        resultEmpty || resultEmptyBcOfFilter
          ? 'flex justify-center items-center h-[40vh]'
          : 'grid grid-cols-1 xl:grid-cols-2  2xl:grid-cols-3 gap-3'
      }
    >
      {resultEmptyBcOfFilter && (
        <div className={'flex flex-col gap-3'}>
          <p className="text-2xl font-medium">
            Rien ne correspond à vos filtre 😕
          </p>
          <p className="text-base font-normal">
            Changez vos filtres pour voir plus de données ou réinitialisez les
          </p>
          <Button
            className={'w-fit flex gap-2 items-center'}
            variant={'default'}
            onClick={handleResetFilter}
          >
            Réinitialiser les filtres
            <RotateCcw />
          </Button>
        </div>
      )}
      {resultEmpty && !resultEmptyBcOfFilter && (
        <p className="text-center text-2xl font-medium">
          Aucune boisson consommée 😕
        </p>
      )}
      {!resultEmpty && drinksData && drinksData.drinks && (
        <>
          {!alcohol && <ChartByTypeOfDrinks drinks={drinksData?.drinks} />}
          <ChartByMonth drinks={drinksData.drinks} />
          <ChartByAverageLiters drinks={drinksData.drinks} />
        </>
      )}
      {isLoading && !drinksData && (
        <>
          <Skeleton className="h-[446px]" />
          <Skeleton className="h-[446px]" />
          <Skeleton className="h-[446px]" />
        </>
      )}
    </div>
  );
};

export default DashboardCharts;
