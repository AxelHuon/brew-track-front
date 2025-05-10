import {
  useGetDrinkCountByUserId,
  useGetDrinksType,
  useGetDrinkTypeCountByUserId,
  useGetMonthlyAverageConsumption,
  useGetMonthlyDrinkCount,
} from '@/api/generated/drinks.ts';
import DateRangePicker from '@/components/molecules/DateRangePicker/DateRangePicker.tsx';
import DashboardCharts from '@/components/organisms/DashboardCharts/DashboardCharts.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppLayout } from '@/contexts/AppLayoutContext/AppLayoutContext.tsx';
import { useAuth } from '@/contexts/AuthContext/AuthContext.tsx';
import { useQueryState } from 'nuqs';

export const DashboardTemplate = () => {
  const [alcohol, setAlcohol] = useQueryState('type');
  const [dropDateGte] = useQueryState('drop_date_gte');
  const [dropDateLte] = useQueryState('drop_date_lte');
  const { user } = useAuth();

  const { data: drinksOfUserData, isLoading: isLoadingDrinkCount } =
    useGetDrinkCountByUserId(user?.id ?? '', {
      type: alcohol ? alcohol : undefined,
      drink_date_gte: dropDateGte ? dropDateGte : undefined,
      drink_date_lte: dropDateLte ? dropDateLte : undefined,
    });

  const { data: drinksType } = useGetDrinksType();

  const handleChangeSelectAlcool = async (value: string) => {
    if (value === 'tout') {
      await setAlcohol(null);
      return;
    }
    await setAlcohol(value);
  };

  const { data: drinkTypeOfUser, isLoading: isLoadingTypeCount } =
    useGetDrinkTypeCountByUserId(user?.id ?? '', {
      type: alcohol ? alcohol : undefined,
      drink_date_gte: dropDateGte ? dropDateGte : undefined,
      drink_date_lte: dropDateLte ? dropDateLte : undefined,
    });

  const { data: monthlyDrinkOfTheUser, isLoading: isLoadingMounthlyDink } =
    useGetMonthlyDrinkCount(user?.id ?? '', {
      type: alcohol ? alcohol : undefined,
      drink_date_gte: dropDateGte ? dropDateGte : undefined,
      drink_date_lte: dropDateLte ? dropDateLte : undefined,
    });

  const { setIsDialogAddDrinkOpen } = useAppLayout();

  const {
    data: monthlyAverageConsumption,
    isLoading: isLoadingMonthlyAverageConsumption,
  } = useGetMonthlyAverageConsumption(user?.id ?? '', {
    type: alcohol ? alcohol : undefined,
    drink_date_gte: dropDateGte ? dropDateGte : undefined,
    drink_date_lte: dropDateLte ? dropDateLte : undefined,
  });

  return (
    <div className={'relative flex gap-[21px] flex-col m-auto'}>
      <div className={'flex justify-between gap-[21px]'}>
        <h1 className={'text-3xl  font-[600]'}>Dashboard 🍻</h1>
        <div className={'flex gap-5'}>
          <Button onClick={() => setIsDialogAddDrinkOpen(true)}>
            Ajouter une boisson
          </Button>
        </div>
      </div>
      <div className={'flex justify-between gap-2 items-center'}>
        <div>
          <p className={''}>
            Total de boissons consommées :{' '}
            <span className={'font-bold'}>
              {drinksOfUserData && drinksOfUserData.count}
            </span>
          </p>
        </div>
        <div className={'flex gap-2 items-center'}>
          <label className={'font-medium '}>Filtrer par alcool :</label>
          {drinksType && (
            <Select
              value={!alcohol ? 'tout' : alcohol}
              onValueChange={(value) => handleChangeSelectAlcool(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par alcool" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={'tout'}>Tout</SelectItem>
                  {drinksType.map((drinkType) => (
                    <SelectItem key={drinkType.id} value={drinkType.slug}>
                      {drinkType.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          <DateRangePicker />
        </div>
      </div>
      <DashboardCharts
        monthlyAverageConsumption={monthlyAverageConsumption}
        drinkTypeOfUser={drinkTypeOfUser}
        monthlyDrinkOfTheUser={monthlyDrinkOfTheUser}
        isLoading={
          isLoadingTypeCount ||
          isLoadingMounthlyDink ||
          isLoadingMonthlyAverageConsumption ||
          isLoadingDrinkCount
        }
      />
    </div>
  );
};
