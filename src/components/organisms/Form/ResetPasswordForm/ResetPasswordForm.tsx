import type { AuthResetPasswordRequestDTO } from '@/api/generated/Api.schemas.ts';
import { useResetPassword } from '@/api/generated/auth.ts';
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
import { resetPasswordSchema } from '@/utils/schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { RotateCw } from 'lucide-react';
import { useQueryState } from 'nuqs';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const LoginForm: React.FC = () => {
  const [token] = useQueryState('token');
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });
  const { mutateAsync, isError, isPending } = useResetPassword();

  const [customMessageError, setCustomMessageError] = useState<string | null>(
    null
  );

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    if (token) {
      const data: AuthResetPasswordRequestDTO = {
        token,
        newPassword: values.newPassword,
      };
      await mutateAsync(
        { data },
        {
          onError: (error) => {
            const axiosError = error as {
              response?: { data?: { message?: string } };
            };
            if (axiosError.response?.data?.message?.includes('invalid token')) {
              setCustomMessageError(
                'Le lien de modification de mot de passe est invalide'
              );
            } else {
              setCustomMessageError(null);
            }
          },
          onSuccess: () => {
            navigate({ to: '/login' });
          },
        }
      );
    } else {
      setCustomMessageError(
        'Veuillez faire une nouvelle demande de modification de mot de passe'
      );
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div className={'flex gap-4'}>
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className={'w-full'}>
                <FormLabel>Nouveau mot de passe</FormLabel>
                <FormControl>
                  <Input type={'password'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className={'w-full'}>
                <FormLabel>Confirmation du mot de passe</FormLabel>
                <FormControl>
                  <Input type={'password'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
        <Button variant={'default'} size={'lg'} type="submit">
          {isPending && <RotateCw className="mr-2 h-4 w-4 animate-spin" />}
          Modifier le mot de passe
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
