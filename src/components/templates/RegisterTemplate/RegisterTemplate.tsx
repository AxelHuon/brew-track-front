import RegisterForm from '@/components/organisms/Form/RegisterForm/RegisterForm.tsx';

export const RegisterTemplate = () => {
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
              Créer un compte 🍻
            </h1>
            <p className={'text-center text-default '}>
              L'application pour suivre ta consommation d'alcool
            </p>
          </div>
          <RegisterForm />
        </div>
      </aside>
    </section>
  );
};
