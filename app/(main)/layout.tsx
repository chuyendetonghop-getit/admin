import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-56px)]">
        <div className="hidden md:block w-[300px]">
          <Sidebar />
        </div>
        <div className="p-5 w-full overflow-y-scroll">{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
