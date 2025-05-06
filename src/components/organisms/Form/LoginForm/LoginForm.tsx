import GoogleIcon from '@/components/atoms/icons/GoogleIcon/GoogleIcon.tsx';
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
import { loginSchema } from '@/utils/schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleLogin } from '@react-oauth/google';
import { Link } from '@tanstack/react-router';
import { RotateCw } from 'lucide-react';
import { useQueryState } from 'nuqs';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const LoginForm: React.FC = () => {
  const { login, googleLogin, isError, isLoading, loginErrorMessage } =
    useAuth();

  const [from] = useQueryState('from');

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await login(values, from);
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  const clickGoogle = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (codeResponse) => onGoogleLogin(codeResponse.code),
  });

  const onGoogleLogin = async (code: string) => {
    try {
      await googleLogin({ code }, from);
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input
                  type={'password'}
                  placeholder="Mot de passe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isError && (
          <FormMessage>
            {loginErrorMessage || (
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
          {isLoading && <RotateCw className="mr-2 h-4 w-4 animate-spin" />}
          Se connecter
        </Button>
        <div className={'flex justify-between'}>
          <Button asChild variant={'link'}>
            <Link to={'/forgot-password'}>Mot de passe oublié ?</Link>
          </Button>
          <Button asChild variant={'link'}>
            <Link to={'/register'}>Créer un compte</Link>
          </Button>
        </div>
        <div className={'flex items-center gap-[13px]'}>
          <div className={'w-full h-[1px] bg-neutral-200'}></div>
          <p className={'w-1/2 text-center text-base'}>Ou</p>
          <div className={'w-full h-[1px] bg-neutral-200'}></div>
        </div>
      </form>
      <Button
        className={'w-full'}
        type={'button'}
        size={'lg'}
        variant={'secondary'}
        onClick={() => clickGoogle()}
      >
        {isLoading && <RotateCw className="mr-2 h-4 w-4 animate-spin" />}
        <GoogleIcon />
        Google
      </Button>
    </Form>
  );
};

export default LoginForm;
