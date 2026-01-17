import clsx from "clsx";

type ButtonVariants = "default" | "ghost" | "danger";
type ButtonSizes = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariants;
  size?: ButtonSizes;
} & React.ComponentProps<"button">;

export function Button({
  variant = "default",
  size = "md",
  ...rest
}: ButtonProps) {
  const buttonVariants: Record<ButtonVariants, string> = {
    default: clsx("hover:bg-blue-700 bg-blue-600 text-blue-100"),
    ghost: clsx("hover:bg-slate-400 bg-slate-300 text-slate-900"),
    danger: clsx("hover:bg-red-700 bg-red-600 text-red-100"),
  };

  const buttonSizes: Record<ButtonSizes, string> = {
    sm: clsx(
      "text-xs/tight py-1 px-2",
      "[&>svg]:w-3 [&>svg]:h-3 rounded-sm gap-1",
    ),
    md: clsx(
      "text-base/tight py-2 px-4",
      "[&>svg]:w-4 [&>svg]:w-4 rounded-md gap-2",
    ),
    lg: clsx(
      "text-lg/tight py-4 px-6",
      "[&>svg]:w-5 [&>svg]:w-5 rounded-lg gap-3",
    ),
  };

  const buttonClasses = clsx(
    buttonVariants[variant],
    buttonSizes[size],
    "flex items-center justify-center cursor-pointer ",
    "transition",
    "disabled:bg-slate-200",
    "disabled:text-slate-400",
    "disabled:cursor-not-allowed",
    rest.className,
  );

  return <button {...rest} className={buttonClasses} />;
}
