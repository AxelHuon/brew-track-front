import ForgotPasswordForm from '@/components/organisms/Form/ForgotPasswordForm/ForgotPasswordForm.tsx';
import React from 'react';

const ResetPasswordTemplate: React.FC = () => {
  return (
    <section className={'relative'}>
      <aside
        className={
          'min-h-[100vh] max-w-[700px] m-auto flex flex-col items-center container justify-center gap-[21px] relative'
        }
      >
        <div className={'flex flex-col items-center w-full gap-[34px]'}>
          <div className={'flex flex-col gap-[13px]'}>
            <h1 className={'text-center text-4xl  font-[600]'}>
              Mot de passe oublié ?
            </h1>
            <p className={'text-center text-default '}>
              Ne t'inquiètes pas, tu vas le retrouver dans quelques instants.
            </p>
          </div>
          <ForgotPasswordForm />
        </div>
      </aside>
    </section>
  );
};

export default ResetPasswordTemplate;
