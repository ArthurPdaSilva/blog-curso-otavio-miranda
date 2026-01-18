"use client";
import { logoutAction } from "@/actions/login/logout-action";
import clsx from "clsx";
import {
  CircleXIcon,
  FileTextIcon,
  HourglassIcon,
  HouseIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathName = usePathname();
  const [isPending, startTransition] = useTransition();

  // biome-ignore lint/correctness/useExhaustiveDependencies: false positive
  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  const navClasses = clsx(
    "bg-slate-900 text-slate-100 rounded-lg",
    "flex flex-col mb-8",
    "sm:flex-row sm:flex-wrap",
    "transition-all duration-300",
    isOpen ? "max-h-96" : "max-h-10",
    "overflow-hidden sm:overflow-visible sm:max-h-none sm:h-auto",
  );
  const linkClasses = clsx(
    "[&>svg]:w-4 [&>svg]:h-4 px-4",
    // Shring zero impede dele tentar crescer ou diminuir para caber no elemento
    "flex items-center shrink-0 cursor-pointer gap-2",
    "hover:bg-slate-800 transition rounded-lg",
    "h-10",
  );

  const openCloseBtnClasses = clsx(
    linkClasses,
    "text-blue-200 italic",
    "sm:hidden",
  );

  function handleLogout() {
    startTransition(async () => {
      await logoutAction();
    });
  }

  return (
    <nav className={navClasses}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={openCloseBtnClasses}
        type="button"
      >
        {!isOpen && (
          <>
            <MenuIcon />
            Menu
          </>
        )}
        {isOpen && (
          <>
            <CircleXIcon />
            Menu
          </>
        )}
      </button>
      <a className={linkClasses} href="/" target="_blank" rel="noopener">
        <HouseIcon />
        Home
      </a>

      <Link className={linkClasses} href={"/admin/post"}>
        <FileTextIcon />
        Posts
      </Link>

      <Link className={linkClasses} href={"/admin/post/new"}>
        <PlusIcon />
        Criar Post
      </Link>

      <button type="button" onClick={handleLogout} className={linkClasses}>
        {isPending && (
          <>
            <HourglassIcon />
            Aguarde...
          </>
        )}

        {!isPending && (
          <>
            <LogOutIcon />
            Sair
          </>
        )}
      </button>
    </nav>
  );
}
