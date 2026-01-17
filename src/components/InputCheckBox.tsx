import clsx from "clsx";
import { useId } from "react";

type InputCheckboxProps = {
  labelText?: string;
} & React.ComponentProps<"input">;

export function InputCheckbox({
  labelText = "",
  ...props
}: InputCheckboxProps) {
  const id = useId();

  return (
    <div className="flex items-center gap-3">
      <input
        {...props}
        className={clsx(
          // Esse ring é a cor do focus na box
          "w-4 h-4 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer",
          props.className,
        )}
        id={id}
        type="checkbox"
      />

      {labelText && (
        <label className="text-sm cursor-pointer" htmlFor={id}>
          {labelText}
        </label>
      )}
    </div>
  );
}
