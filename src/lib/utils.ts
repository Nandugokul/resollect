import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns an object with label ("Due in"/"Overdue by"), value (e.g. "2d 3h"), and isOverdue boolean.
 * @param deadline ISO string or Date
 * @returns { label, value, isOverdue }
 */
export function getDueParts(deadline: string | Date): {
  label: string;
  value: string;
  isOverdue: boolean;
} {
  const now = new Date();
  const due = typeof deadline === "string" ? new Date(deadline) : deadline;
  const diffMs = due.getTime() - now.getTime();
  const absDiffMs = Math.abs(diffMs);
  const minutes = Math.floor(absDiffMs / (1000 * 60)) % 60;
  const hours = Math.floor(absDiffMs / (1000 * 60 * 60)) % 24;
  const days = Math.floor(absDiffMs / (1000 * 60 * 60 * 24));

  let value = "";
  if (days > 0) {
    value = `${days}d${hours > 0 ? ` ${hours}h` : ""}`;
  } else if (hours > 0) {
    value = `${hours}h${minutes > 0 ? ` ${minutes}min` : ""}`;
  } else if (minutes > 0) {
    value = `${minutes}min`;
  } else {
    value = "0min";
  }

  let label = "";
  let isOverdue = false;
  if (diffMs > 0) {
    label = "Due in";
    isOverdue = false;
  } else {
    label = "Overdue by";
    isOverdue = true;
  }

  return { label, value, isOverdue };
}
