import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';
import React, { useEffect, useState } from 'react';
import { type DateRange } from 'react-day-picker';

const DateRangePicker: React.FC = () => {
  const [dropDateGte, setDropDateGte] = useQueryState('drop_date_gte', {
    parse: (value: string | null) => value,
    defaultValue: null,
  });

  const [dropDateLte, setDropDateLte] = useQueryState('drop_date_lte', {
    parse: (value: string | null) => value,
    defaultValue: null,
  });

  const [localDate, setLocalDate] = useState<DateRange | undefined>({
    from: dropDateGte ? new Date(dropDateGte) : undefined,
    to: dropDateLte ? new Date(dropDateLte) : undefined,
  });

  const [date, setDate] = useState<DateRange | undefined>(localDate);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  useEffect(() => {
    setDate({
      from: dropDateGte ? new Date(dropDateGte) : undefined,
      to: dropDateLte ? new Date(dropDateLte) : undefined,
    });
  }, [dropDateGte, dropDateLte]);

  const handleConfirmDropDate = async () => {
    setPopoverOpen(false);
    if (localDate?.from) {
      await setDropDateGte(localDate.from.toISOString());
    } else {
      await setDropDateGte(null);
    }

    if (localDate?.to) {
      await setDropDateLte(localDate.to.toISOString());
    } else {
      await setDropDateLte(null);
    }

    setDate(localDate);
  };

  const handleResetDropDate = async () => {
    setPopoverOpen(false);
    await setDropDateGte(null);
    await setDropDateLte(null);
    setLocalDate({ from: undefined, to: undefined });
    setDate({ from: undefined, to: undefined });
  };

  const displayResetButton = dropDateLte || dropDateGte;

  return (
    <div className={cn('grid gap-2')}>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            onClick={() => setPopoverOpen(!popoverOpen)}
            variant={'outline'}
            className={cn(
              'w-fit justify-start text-left font-normal',
              !date?.from && !date?.to && 'text-muted-foreground'
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'dd/MM/yyyy')} -{' '}
                  {format(date.to, 'dd/MM/yyyy')}
                </>
              ) : (
                format(date.from, 'dd/MM/yyyy')
              )
            ) : (
              <span>Filtrer par date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={localDate?.from}
            selected={localDate}
            onSelect={setLocalDate}
            numberOfMonths={2}
          />
          <div className="flex flex-col gap-2 mt-2">
            <Button onClick={handleConfirmDropDate} className="flex-1">
              Confirmer
            </Button>
            {displayResetButton && (
              <Button
                variant={'ghost'}
                onClick={handleResetDropDate}
                className="flex-1"
              >
                Réinitialiser
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
