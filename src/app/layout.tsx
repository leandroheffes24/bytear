import {roboto} from './ui/fonts'
import "../../styles/global.scss";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Bytear",
  description: "La mejor tienda de componentes para computadoras, periféricos y más.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${roboto.className}`}>
        {children}
      </body>
    </html>
  );
}
