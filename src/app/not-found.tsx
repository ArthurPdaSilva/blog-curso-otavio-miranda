import ErrorMessage from "@/components/ErrorMessage";

export default function NotFoundPage() {
  return (
    <ErrorMessage
      pageTitle="404 - Página não encontrada"
      contentTitle="404"
      content={<p>Desculpe, a página que você está procurando não existe.</p>}
    />
  );
}
