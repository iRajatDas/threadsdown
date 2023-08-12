import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ------------------------------
// Convert date string to readable format
// ------------------------------
export const dateFormatter = (
  date: string,
  structure: "do MMM yyyy" | "MMM do yyyy"
) => {
  return format(new Date(date), structure);
};

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}


export function readTime(wordCount: number) {
  const totalReadTime = wordCount / 200;
  return `${totalReadTime.toFixed(0)} min read`;
}

export function maybeTruncateTextBlock(textBlock: string, charLimit: number) {
  if (textBlock.length > 200) {
    return `${textBlock.slice(0, charLimit)}…`;
  }
  return textBlock;
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}