import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ToastifyContainer } from "@/components/ToastifyContainer";
import type { Metadata } from "next";
import "./globals.css";

/*
  Notas:
  - Metadata: use o objeto `metadata` aqui para controlar o `<head>` da aplicação.
  - Readonly props: declarar props como `Readonly<{ children: React.ReactNode }>` evita
    mutações acidentais no `RootLayout`.
*/

export const metadata: Metadata = {
  title: {
    default: "The blog - Este é um blog com Next.js",
    template: "%s | The blog",
  },
  description: "Essa seria a descrição dessa página.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body>
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
        <ToastifyContainer />
      </body>
    </html>
  );
}
