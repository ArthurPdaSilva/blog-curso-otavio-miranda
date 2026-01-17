import clsx from "clsx";
import Link from "next/link";

type PostHeadingProps = {
  children: React.ReactNode;
  href: string;
  as?: "h1" | "h2";
};

export function PostHeading({
  children,
  href,
  as: Tag = "h2",
}: PostHeadingProps) {
  const headingClassesMap = {
    h1: "text-2xl/tight sm:text-4xl font-extrabold",
    h2: "text-2xl/tight font-bold",
  };

  return (
    <Tag className={clsx(headingClassesMap[Tag])}>
      <Link className="transition group-hover:text-slate-600" href={href}>
        {children}
      </Link>
    </Tag>
  );
}
