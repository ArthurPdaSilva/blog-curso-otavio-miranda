import Link from "next/link";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="pb-16 text-center">
      <p>
        <span>Copyright &copy; {CURRENT_YEAR} - </span>
        <Link href="/">The Blog</Link>
      </p>
    </footer>
  );
}
