import { MenuAdmin } from "@/features/admin/components/MenuAdmin";
import { requireLoginSessionForApiOrRedirect } from "@/features/login/lib/manage-login";

type AdminPostLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminPostLayout({
  children,
}: Readonly<AdminPostLayoutProps>) {
  await requireLoginSessionForApiOrRedirect();

  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
