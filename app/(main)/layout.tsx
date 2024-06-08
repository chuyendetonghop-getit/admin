import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-56px)] overflow-hidden">
        <div className="hidden md:block w-[300px]">
          <Sidebar />
        </div>
        <div className="p-5 w-full max-h-[calc(100vh-56px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
