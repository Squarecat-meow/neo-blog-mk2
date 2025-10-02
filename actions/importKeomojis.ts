'use server';

import prismaClient from '@/lib/prisma';
import { IKeomoji, IKeomojiResponse } from '@/types/KeomojiType';
import ky from 'ky';

export async function importKeomojis() {
  try {
    const { emojis } = await ky
      .get('https://serafuku.moe/api/emojis')
      .json<IKeomojiResponse>();

    const payload: IKeomoji[] = emojis.map((el) => {
      return {
        aliases: el.aliases,
        name: el.name,
        category: el.category,
        url: el.url,
      };
    });

    const res = await prismaClient.keomoji.createMany({
      data: payload,
      skipDuplicates: true,
    });

    return { result: res };
  } catch (err) {
    if (err instanceof Error) return err;
  }
}
