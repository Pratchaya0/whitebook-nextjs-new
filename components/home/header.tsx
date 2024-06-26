import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import UserButton from "@/components/auth/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import HomeNavigationMenu from "@/components/home/home-navigation-menu";
import CartButton from "./cart-button";
import { ThemeModeToggle } from "./theme-mode-toggle";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label?: string;
  webName: string;
}

const Header = ({ label = "E-book marketplace", webName }: HeaderProps) => {
  const users = useCurrentUser();

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-x-3 justify-center items-center">
        <div className="w-full flex flex-col gap-y-1 items-left justify-start">
          <h1 className={cn("text-3xl font-semibold", font.className)}>
            {webName}
          </h1>
          <p className="text-muted-foreground text-sm">{label}</p>
        </div>
        <div>
          <HomeNavigationMenu webName={webName} />
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-2">
        <div>
          <ThemeModeToggle />
        </div>
        <div>
          <CartButton />
        </div>
        <div>
          {users && <UserButton />}
          {!users && (
            <LoginButton mode="redirect" asChild>
              <Button variant="secondary" size="lg">
                Sign in
              </Button>
            </LoginButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
