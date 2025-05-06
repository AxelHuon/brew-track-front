import { useForgotPassword } from '@/api/generated/auth.ts';
import { Button } from '@/components/ui/button.tsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { forgotPasswordSchema } from '@/utils/schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { RotateCw } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const LoginForm: React.FC = () => {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  const { mutateAsync, isError, isPending, isSuccess } = useForgotPassword();

  const [customMessageError, setCustomMessageError] = useState<string | null>(
    null
  );

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    await mutateAsync(
      { data: values },
      {
        onError: (error: any) => {
          if (
            error.response?.data?.message ===
            'No user found with that email address.'
          ) {
            setCustomMessageError(
              'Aucun utilisateur ne correspond à cette adresse mail'
            );
          }
        },
      }
    );
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-7 w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse mail</FormLabel>
              <FormControl>
                <Input placeholder="exemple@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isError && (
          <FormMessage>
            {customMessageError || (
              <>
                Une erreur est survenue, ré essayer ou contacter le support{' '}
                <a className={'underline'} href={'mailto:support@brewtrack.fr'}>
                  ici
                </a>
              </>
            )}
          </FormMessage>
        )}
        {isSuccess && (
          <FormMessage className={'text-green-500'}>
            Un mail de confirmation vous à été envoyé
          </FormMessage>
        )}
        <Button variant={'default'} size={'lg'} type="submit">
          {isPending && <RotateCw className="mr-2 h-4 w-4 animate-spin" />}
          Envoyer un mail de réinitialisation de mot de passe
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
