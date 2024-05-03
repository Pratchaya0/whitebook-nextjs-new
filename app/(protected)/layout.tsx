import CardWrapper from "@/components/home/card-wrapper";
import Navbar from "./_components/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-slate-500">
      <CardWrapper headerLabel="E-Book marketplace">
        <ScrollArea className="w-full p-10 m-0 h-[87vh]">
          {children}
        </ScrollArea>
      </CardWrapper>
    </div>
  );
};

export default ProtectedLayout;
