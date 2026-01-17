type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminPostIdPage({
  params,
}: AdminPostIdPageProps) {
  return <div className="py-16 text-6xl">Admin Post Id Page</div>;
}
