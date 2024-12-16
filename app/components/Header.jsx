"use client";

import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ThemeToggle";
import Auth from "./Auth";
import MobAuth from "./MobAuth";

export function Header() {
  const navigationItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Product",
      description: "Visit tuno.bd's Store to buy best products.",
      items: [
        {
          title: "Latest Products",
          href: "/latest-products",
        },
        {
          title: "T-Shirts",
          href: "/t-shirts",
        },
        {
          title: "Winter Wear",
          href: "/winter",
        },
      ],
    },
    {
      title: "Company",
      description: "Know more about tuno.bd",
      items: [
        {
          title: "About us",
          href: "/about",
        },
        {
          title: "Contact us",
          href: "/contact",
        },
      ],
    },
  ];

  const [isOpen, setOpen] = useState(false);

  return (
    <header className="w-full z-40 fixed top-0 left-0 bg-background/40 backdrop-blur-md border-b">
      <div className="container relative mx-auto min-h-16 flex items-center justify-between px-4 lg:grid lg:grid-cols-3">
        {/* Navigation Menu (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          <NavigationMenu className="flex">
            <NavigationMenuList className="flex gap-4">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <Button variant="ghost">
                      <Link href={item.href}>{item.title}</Link>
                    </Button>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="font-medium text-sm">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[450px] p-4">
                        <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                          <div className="flex flex-col h-full justify-between">
                            <div className="flex flex-col">
                              <p className="text-base">{item.title}</p>
                              <p className="text-muted-foreground text-sm">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col text-sm h-full justify-end">
                            {item.items?.map((subItem) => (
                              <NavigationMenuLink
                                href={subItem.href}
                                key={subItem.title}
                                className="flex justify-between items-center hover:bg-muted py-2 px-4 rounded"
                              >
                                <span>{subItem.title}</span>
                                <MoveRight className="w-4 h-4 text-muted-foreground" />
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          <p className="font-semibold text-xl fr">tuno.bd</p>
        </div>

        {/* Actions: Cart, Theme Toggle, and Menu Icon */}
        <div className="flex items-center gap-4 justify-end">
          <Auth />
          <span className="border-r h-10 hidden lg:inline"></span>
          <ModeToggle />
          <div className="lg:hidden inline border-r h-10" />
          <div className="lg:hidden">
            <Button
              variant="secondary"
              size={"icon"}
              onClick={() => setOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-20 right-0 w-64 rounded-lg bg-background/90 backdrop-blur-md shadow-lg py-4">
            <div className="flex flex-col gap-8 px-4">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-col gap-2">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="flex justify-between items-center"
                      >
                        <span className="text-lg">{item.title}</span>
                        <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                      </Link>
                    ) : (
                      <p className="text-lg">{item.title}</p>
                    )}
                    {item.items &&
                      item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="flex justify-between items-center text-muted-foreground"
                        >
                          <span>{subItem.title}</span>
                          <MoveRight className="w-4 h-4 stroke-1" />
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            {/* Ensure Auth is at the bottom of the mobile menu */}
            <MobAuth />
          </div>
        )}
      </div>
    </header>
  );
}
