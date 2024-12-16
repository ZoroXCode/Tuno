"use client";

import { useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";

import { Facebook, Instagram, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Scroll } from "../components/Scroll";

export default function Page() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => [
      "Amazing Design",
      "New Collections",
      "Wonderful Service",
      "Beautiful Cloths",
      "Smart Fashion",
    ],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <>
      <div className="w-full px-4">
        <div className="container mx-auto">
          <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
            <div>
              <Button variant="secondary" size="sm" className="gap-4">
                Contact Us through email <MoveRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-5xl max-w-2xl tracking-tighter text-center font-regular">
                <span className="text-spektr-cyan-50 fr">
                  TUNO is known for
                </span>
                <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                  &nbsp;
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute font-semibold fr text-primary"
                      initial={{ opacity: 0, y: "-100" }}
                      transition={{ type: "spring", stiffness: 70 }}
                      animate={
                        titleNumber === index
                          ? {
                              y: 0,
                              opacity: 1,
                            }
                          : {
                              y: titleNumber > index ? -150 : 150,
                              opacity: 0,
                            }
                      }
                    >
                      {title}
                    </motion.span>
                  ))}
                </span>
              </h1>

              <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
                Managing a small business today is already tough. Avoid further
                complications by ditching outdated, tedious trade methods. Our
                goal is to streamline SMB trade, making it easier and faster
                than ever.
              </p>
            </div>
            <div className="flex flex-row gap-3">
              <Button variant="outline" size="icon">
                <Instagram className="size-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Facebook className="size-4" />
              </Button>
            </div>
            <Scroll />
          </div>
        </div>
      </div>
    </>
  );
}