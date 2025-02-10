import * as THREE from "three"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getVariableColor = (variableName: string) => {
  const root = document.documentElement;
  return getComputedStyle(root).getPropertyValue(variableName);
};

export const damp = (current: number, target: number, lambda: number, dt: number) => {
  return THREE.MathUtils.damp(current, target, lambda, dt);
};

export function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
