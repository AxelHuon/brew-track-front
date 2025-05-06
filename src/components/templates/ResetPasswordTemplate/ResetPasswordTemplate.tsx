import ResetPasswordForm from '@/components/organisms/Form/ResetPasswordForm/ResetPasswordForm.tsx';
import React from 'react';

const ForgotPasswordTemplate: React.FC = () => {
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
              Modifier votre mot de passe
            </h1>
          </div>
          <ResetPasswordForm />
        </div>
      </aside>
    </section>
  );
};

export default ForgotPasswordTemplate;
