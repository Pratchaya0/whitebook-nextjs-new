"use server";

import { writeFile } from "fs/promises";
import { join } from "path";

export const uploadBookFile = async (book: File) => {
  console.dir(book);
  //   const byte = await book.arrayBuffer();
  //   const buffer = Buffer.from(byte);
  //   const path = join("/", "books", book.name as string);
  //   await writeFile(path, buffer);

  //   return path;
};
