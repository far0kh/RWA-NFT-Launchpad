import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col md:flex-row gap-4 justify-center items-center">
      <div className="hidden md:flex w-1/2 justify-center items-center">
        <Image
          src="/images/side-bg.png"
          alt="Tezuka"
          width={200}
          height={200}
          className="h-screen w-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
