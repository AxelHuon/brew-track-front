import { useRegister } from '@/api/generated/auth';
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
import { useAuth } from '@/contexts/AuthContext/AuthContext.tsx';
import { authRegisterSchema } from '@/utils/schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@tanstack/react-router';
import { RotateCw } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const RegisterForm: React.FC = () => {
  const form = useForm<z.infer<typeof authRegisterSchema>>({
    resolver: zodResolver(authRegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const { mutateAsync, isPending, isError } = useRegister();

  const { login } = useAuth();

  const onSubmit = async (values: z.infer<typeof authRegisterSchema>) => {
    const { confirmPassword, ...rest } = values;
    await mutateAsync({ data: rest });
    await login({ email: values.email, password: values.password }, '/');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-7 w-full"
      >
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex-1 w-full">
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Mot de passe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="flex-1 w-full">
                <FormLabel>Confirmer le mot de passe</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isError && (
          <FormMessage>
            Une erreur est survenue, ré essayer ou contacter le support{' '}
            <a className={'underline'} href={'mailto:support@brewtrack.fr'}>
              ici
            </a>
          </FormMessage>
        )}
        <Button variant={'default'} size={'lg'} type="submit">
          {isPending && <RotateCw className="mr-2 h-4 w-4 animate-spin" />}
          S'inscrire
        </Button>
        <div className="flex justify-center">
          <Button asChild variant={'link'}>
            <Link to={'/login'}>Vous avez déjà un compte ?</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
