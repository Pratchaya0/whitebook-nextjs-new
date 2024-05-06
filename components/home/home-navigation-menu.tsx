"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const serviceComponents: {
  title: string;
  href: string;
  description: string;
}[] = [
  // {
  //   title: "Explore",
  //   href: "/services/explore",
  //   description:
  //     "If your want to find some interesting E-book. Let me help you.",
  // },
  {
    title: "Your library",
    href: "/services/library",
    description: "All of your available E-book stay here.",
  },
  {
    title: "Your cart",
    href: "/services/cart",
    description: "You can edit your personal data in here.",
  },
  {
    title: "Your profile",
    href: "/settings",
    description: "You can edit your personal data in here.",
  },
];
const adminComponents: { title: string; href: string; description: string }[] =
  [
    {
      title: "Products",
      href: "/admin/products",
      description: "You can manage all of product here.",
    },
    {
      title: "Orders",
      href: "/admin/orders",
      description: "You can manage all of orders here.",
    },
    {
      title: "User",
      href: "/admin/user",
      description: "You can manage all of users here.",
    },
    {
      title: "Categories",
      href: "/admin/categories",
      description: "You can manage all of categories here.",
    },
    {
      title: "Genre Tag",
      href: "/admin/genre",
      description: "You can manage all of genres (tags) here.",
    },
    {
      title: "Web Information",
      href: "/admin/webinfo",
      description: "You can manage all of web information here.",
    },
  ];

interface HomeNavigationMenuProps {
  webName: string;
}

const HomeNavigationMenu = ({ webName }: HomeNavigationMenuProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    {/* <Icons.logo className="h-6 w-6" /> */}
                    <div className="mb-2 mt-4 text-lg font-medium">
                      {webName}
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      E-book marketplace for everyone.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {serviceComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Management</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {adminComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <Link href="/services/contract" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About & Report
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default HomeNavigationMenu;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
