import { Merriweather, Roboto } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/AuthProvider/AuthProvider";
import Footer from "@/components/Footer";

const merriweather = Merriweather({ subsets: ["latin"], weight: ['400', '700'] });
const roboto = Roboto({ subsets: ["latin"], weight: ['400', '700'] });

export const metadata = {
  title: "Blogify App",
  description: "A Comprehensive Blogging and Content Management Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${merriweather.className}`}>
        <AuthProvider>
        
        {children}
        <Footer/>
        </AuthProvider>
        
      </body>
    </html>
  );
}
