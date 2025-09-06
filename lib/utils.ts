import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combine class names safely and merge Tailwind utility conflicts.
 *
 * This helper composes class name inputs using `clsx` (for conditional
 * class names) and then runs the result through `twMerge` to collapse
 * conflicting Tailwind utilities (for example `p-2 p-4` -> `p-4`).
 *
 * Inputs: any values accepted by clsx (strings, objects, arrays).
 * Returns: a single merged className string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
