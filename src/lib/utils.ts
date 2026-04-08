import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(path: string) {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  
  // Ensure path starts with a single slash and remove any trailing slashes
  const cleanPath = '/' + path.replace(/^\/+/, '');
  
  // In Vite, assets in the public folder are served from the root.
  // Using root-relative paths is the most reliable way for static assets.
  return cleanPath;
}
