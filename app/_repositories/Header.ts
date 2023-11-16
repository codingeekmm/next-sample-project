import { prisma } from '@/app/_utils/prismaSingleton';

import type { HeaderItemsFormData } from '@/app/_formSchema/header_items_schema';

import type { Prisma } from '@prisma/client';
import type { Header as _Header } from '@prisma/client';

export type Header = _Header;

export type HeaderWithItems = Exclude<
  Prisma.PromiseReturnType<typeof HeaderRepository.findUnique>,
  null
>;

export namespace HeaderRepository {
  export async function findMany() {
    return await prisma.header.findMany({
      include: {
        items: true,
      },
    });
  }

  export async function findUnique(id: string) {
    return await prisma.header.findUnique({
      include: {
        items: true,
      },
      where: {
        id: id,
      },

    });
  }

  export async function create(header_items: HeaderItemsFormData) {

    type ItemRequiredType = Required<(typeof header_items.items)[number]>;


    return await prisma.header.create({
      data: {
        ...header_items.header,

        items: {
          create: header_items.items as ItemRequiredType[],
        },
      },

      include: {
        items: true,
      },
    });
  }


  export async function update(id: string, header_items: HeaderItemsFormData) {

    type ItemRequiredType = Required<(typeof header_items.items)[number]>;


    return await prisma.header.update({
      where: {
        id: id,
      },
      data: {
        ...header_items.header,

        items: {

          deleteMany: {},
          create: header_items.items as ItemRequiredType[],
        },
      },

      include: {
        items: true,
      },
    });
  }


  export async function remove(id: string) {
    return await prisma.header.delete({
      where: {
        id: id,
      },

    });
  }
}
