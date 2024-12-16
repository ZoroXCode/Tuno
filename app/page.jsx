import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import tunobd from "@/public/tunobd.jpg";
import tunobd2 from "@/public/tunobd2.jpg";
import tunovid from "@/public/tunobdvid.gif";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full py-20 lg:py-40 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
          <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline">We&apos;re live!</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-6xl max-w-lg tracking-tighter text-left font-regular fr">
                Why choose between quality and price when you can have both?
              </h1>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                Managing a small business today is already tough. Avoid further
                complications by ditching outdated, tedious trade methods. Our
                goal is to streamline SMB trade, making it easier and faster
                than ever.
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Link href={"/latest-products"}>
                <Button>
                  Contact Us <PhoneCall />
                </Button>
              </Link>
              <Link href={"/shop"}>
                <Button variant={"secondary"}>
                  Visit Hot Products <MoveRight />
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center">
              <Image
                src={tunobd}
                alt="Image"
                className="bg-muted rounded-md aspect-square w-full"
              />
            </div>
            <div className="row-span-2 flex items-center justify-center">
              <Image
                src={tunovid}
                alt="Image"
                className="bg-muted rounded-md w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center justify-center">
              <Image
                src={tunobd2}
                alt="Image"
                className="bg-muted rounded-md aspect-square w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
