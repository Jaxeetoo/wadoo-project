import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function newProjectID() : string{
  const newID = customAlphabet("abcdefghijklmnopqrstuvwxyz12345-_", 10);
  return newID(10);
}

export function newUserID() : string{
  const newID = customAlphabet("abcdefghijklmnopqrstuvwxyz67890-_", 10);
  return newID(8);
}
