"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { searchCocktailsByName } from "@/lib/api";
import type { Cocktail } from "@/types/cocktails";

import Shell from "@/components/layout/Shell";
import SearchBar from "@/components/search/SearchBar";
import DrinkList from "@/components/search/DrinkList";

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(id);
  }, [query]);

  const onDrinkClick = (drinkId: string) => {
    router.push(`/drink/${drinkId}`);
  };

  const {
    data: drinks = [],
    isLoading,
    isError,
    error,
  } = useQuery<Cocktail[], Error>({
    queryKey: ["cocktailSearch", debounced.trim()],
    queryFn: () => searchCocktailsByName(debounced.trim()),
    enabled: debounced.trim().length > 0,
    staleTime: 60_000,
  });

  return (
    <Shell title="Thirsty">
      <div className="mx-auto w-full max-w-md px-4 pb-6 pt-4">
        <SearchBar value={query} onChange={setQuery} />

        {isError ? (
          <p className="mt-3 text-sm text-red-600">
            {error?.message ?? "Something went wrong."}
          </p>
        ) : null}
        <DrinkList
          onDrinkClick={onDrinkClick}
          drinks={drinks}
          loading={isLoading}
        />
      </div>
    </Shell>
  );
}
