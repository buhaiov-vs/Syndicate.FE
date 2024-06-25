"use server";

import { revalidateTag } from "next/cache";

export const tagRevalidate = (tag: string) => {
  revalidateTag(tag);
}