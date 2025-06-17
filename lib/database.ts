import { PrismaClient, type Actor } from "./prisma_generated/index.js";

export const prisma = new PrismaClient();

export function listActors() {
  return prisma.actor.findMany();
}

export function getActor(name: string) {
  return prisma.actor.findFirst({ where: { name: name } });
}

export function createActor(actor: Omit<Actor, "id">) {
  return prisma.actor.create({ data: actor });
}

export function createOrUpdateActor(actor: Omit<Actor, "id">) {
  return prisma.actor.upsert({
    create: actor,
    update: actor,
    where: { name: actor.name },
  });
}
