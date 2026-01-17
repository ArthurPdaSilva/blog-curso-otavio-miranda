/** biome-ignore-all lint/a11y/noStaticElementInteractions: false positive */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: false positive */
"use client";
import clsx from "clsx";
import { Button } from "./Button";

type DialogProps = {
  isVisible?: boolean;
  title: string;
  content: React.ReactNode;
  disabled: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function Dialog({
  isVisible,
  title,
  content,
  disabled,
  onCancel,
  onConfirm,
}: DialogProps) {
  if (!isVisible) return null;

  function handleCancel() {
    if (disabled) return;
    onCancel();
  }

  return (
    <div
      onClick={handleCancel}
      className={clsx(
        "fixed z-50 inset-0 bg-black/50 backdrop-blur-xs",
        "flex items-center justify-center",
      )}
    >
      <div
        role="dialog"
        aria-modal={true}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        className={clsx(
          "bg-slate-100 p-6 rounded-lg max-w-2xl mx-6",
          "flex flex-col gap-6 text-center",
          "shadow-lg shadow-black/30",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="dialog-title" className="text-xl font-extrabold">
          {title}
        </h3>
        <div id="dialog-description">{content}</div>
        <div className="flex items-center justify-around">
          <Button
            variant="ghost"
            autoFocus
            type="button"
            onClick={handleCancel}
            disabled={disabled}
          >
            Cancelar
          </Button>
          <Button
            variant="default"
            className={clsx(
              "cursor-pointer bg-blue-500 text-blue-50 hover:bg-blue-600 transition",
              "flex items-center",
              "py-2 px-4 rounded-lg",
              "disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed",
            )}
            type="button"
            onClick={onConfirm}
            disabled={disabled}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
