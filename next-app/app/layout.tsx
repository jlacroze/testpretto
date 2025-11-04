import "./globals.css";

export const metadata = {
  title: "Pretto Blog",
  description: "Actualités et conseils immobiliers Pretto",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
