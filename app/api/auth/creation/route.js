import prisma from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    throw new Error("User not found");
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        name: user.given_name || "",
        email: user.email || "",
        profileImage:
          user.picture || "https://avatar.vercel.sh/rauchg?rounded=60",
      },
    });
  }

  return NextResponse.redirect("https://tuno-smoky.vercel.app/shop");
}
