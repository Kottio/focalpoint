import { useEffect, useState } from "react";
import { Tag } from "@/types/spot";

export function useCatandTags() {
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    async function fetchCatandTags() {
      const response = await fetch("/api/categoriestags");
      if (!response.ok) {
        console.error("could not fetch categories and tags");
      } else {
        const data = await response.json();
        console.log("fecthing Data");
        if (data) {
          setCategories(data.categories.map((cat: any) => cat.name));
          setTags(data.tags);
        }
        return { categories, tags };
      }
    }
    fetchCatandTags();
  }, []);

  return { categories, tags };
}
