import Image from "next/image";
import { Shapes } from "@/components/custom_ui/Shapes";
import Header from "./Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto w-full max-w-7xl h-full">
      <Header />
      <div className="grid grid-cols-1 items-center md:grid-cols-2 mt-12 md:mt-8 lg:mt-0">
        <div className="col-start-1">
          {children}
        </div>
        <div className="hidden md:block md:col-start-2">
          <Shapes />
        </div>
      </div>
      <Footer />
    </div>
  );
}
