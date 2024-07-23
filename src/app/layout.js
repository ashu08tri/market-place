import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Market Place",
  description: "Ecommerce Website for goodies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        <AuthProvider>
        <Navbar />
        {children}
        <Footer />
        </AuthProvider>
        </body>
    </html>
  );
}
