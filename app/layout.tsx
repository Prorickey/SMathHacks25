import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Mars Weather Dashboard",
    description: "A dashboard for interacting with the Mars weather data collection system.",
    icons: [
        "/favicon.png"
    ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
