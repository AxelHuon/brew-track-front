import { useAddDrink, useGetDrinksType } from '@/api/generated/drinks.ts';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar.tsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppLayout } from '@/contexts/AppLayoutContext/AppLayoutContext.tsx';
import { useAuth } from '@/contexts/AuthContext/AuthContext.tsx';
import { cn } from '@/utils';
import { AddDrinkDTOSchema } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const AddDrinkForm: React.FC = () => {
  const [isCustom, setIsCustom] = useState(false);

  const { user } = useAuth();

  const { setIsDialogAddDrinkOpen } = useAppLayout();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof AddDrinkDTOSchema>>({
    resolver: zodResolver(AddDrinkDTOSchema),
    defaultValues: {
      userId: user?.id ?? '',
      drinkTypeSlug: 'Select your drink',
      litersConsumed: 0,
      drinkDate: new Date(),
      customType: null,
    },
  });

  const { data: drinkTypes, isLoading: isLoadingDrinkTypes } =
    useGetDrinksType();

  const { mutate: addDrink, isPending: isSubmitting } = useAddDrink();

  const onSubmit = (data: z.infer<typeof AddDrinkDTOSchema>) => {
    try {
      addDrink(
        { data: { ...data, drinkDate: data.drinkDate.toISOString() } },
        {
          onSuccess: () => {
            // @ts-ignore
            queryClient.invalidateQueries(['getDrinksByUserId']);
            form.reset();
            setIsDialogAddDrinkOpen(false);
          },
        }
      );
    } catch (e) {
    } finally {
      setIsDialogAddDrinkOpen(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="drinkTypeSlug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de boisson</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setIsCustom(value === 'autre');
                  }}
                  value={field.value}
                >
                  <SelectTrigger className={'w-full'}>
                    <SelectValue placeholder="Choisir un type de boisson" />
                  </SelectTrigger>
                  <SelectContent className={'z-[51]'}>
                    <SelectItem value={'Select your drink'} disabled>
                      Sélectionne ta boisson
                    </SelectItem>
                    {isLoadingDrinkTypes ? (
                      <SelectItem value={'loading'} disabled>
                        Chargement...
                      </SelectItem>
                    ) : (
                      drinkTypes?.map((type) => (
                        <SelectItem key={type.id} value={type.slug}>
                          {type.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isCustom && (
          <FormField
            control={form.control}
            name="customType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type personnalisé</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={''}
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="litersConsumed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantité consommée (en litres)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step={0.1}
                  min={0}
                  placeholder="Ex: 0.5"
                  {...form.register('litersConsumed', { valueAsNumber: true })}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="drinkDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date consomé</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'dd/MM/yy')
                      ) : (
                        <span>Choisis une date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value || new Date()}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('2024-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? 'En cours...' : 'Ajouter la boisson'}
        </Button>
      </form>
    </Form>
  );
};

export default AddDrinkForm;
