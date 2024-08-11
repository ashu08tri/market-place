import Head from 'next/head';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';
import Providers from '@/redux/Providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Market Place',
  description: 'Ecommerce Website for goodies',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fanwood+Text:wght@400;700&display=swap"
        />
      </Head>
      <body className="overflow-x-hidden font-fanwood-text">
        <AuthProvider>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
