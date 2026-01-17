import clsx from "clsx";

/*
  Notas de loading:
  - Use este componente em `loading.tsx` para Suspense/indicações de carregamento.
  - Em desenvolvimento às vezes adicionamos delay artificial para testes locais.
*/

type SpinLoaderProps = {
  className?: string;
};

export function SpinLoader({ className }: SpinLoaderProps) {
  return (
    <div className={clsx("flex", "items-center", "justify-center", className)}>
      <div
        className={clsx(
          "w-10 h-10",
          "border-5 border-t-transparent border-slate-900 rounded-full",
          "animate-spin",
        )}
      ></div>
    </div>
  );
}
