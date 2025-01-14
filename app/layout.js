import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
export const metadata = {
  title: "Mutiple steps form",
  description: "Using with Next.js, Tailwind CSS, React Hook Form, and ShadCN UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {children} <Toaster />
      </body>
    </html>
  );
}
