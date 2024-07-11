'use client'
// useSlug.js
import { useCallback } from 'react';

const useSlug = () => {
  const createSlug = useCallback((title: string) => {
    return title
      .toLowerCase()              // Convert to lowercase
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
      .replace(/^-+|-+$/g, '')
      .trim();
        // Remove leading or trailing hyphens
  }, []);

  return { createSlug };
};

export default useSlug;
