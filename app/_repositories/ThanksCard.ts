import { prisma } from '@/app/_utils/prismaSingleton';
import type { Prisma } from '@prisma/client';

export type ThanksCardWithFromTo = Exclude<
  Prisma.PromiseReturnType<typeof ThanksCardRepository.findUnique>,
  null
>;

export namespace ThanksCardRepository {
  export async function findMany() {
    return await prisma.thanksCard.findMany({
      include: {
        from: true,
        to: true,
      },
    });
  }

  export async function findUnique(id: string) {
    return await prisma.thanksCard.findUnique({
      include: {
        from: true,
        to: true,
      },
      where: {
        id: id,
      },
    });
  }
}
