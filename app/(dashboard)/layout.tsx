import LeftSideBar from "@/components/dashboard/LeftSideBar";
import TopBar from "@/components/dashboard/TopBar";
// import { ToasterProvider } from "@/lib/ToasterProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex max-lg:flex-col">
      <LeftSideBar />
      <TopBar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
