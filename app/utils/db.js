import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Use a global variable to store the Prisma Client instance
if (typeof globalThis.prismaGlobal === "undefined") {
  globalThis.prismaGlobal = prismaClientSingleton();
}

const prisma = globalThis.prismaGlobal;

export default prisma;

// Ensure that the Prisma Client instance is only created once in non-production environments
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
