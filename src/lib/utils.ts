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

const damp = (current: number, target: number, lambda: number, dt: number) => {
  return THREE.MathUtils.damp(current, target, lambda, dt);
};