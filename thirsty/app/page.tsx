"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { searchCocktailsByName } from "@/lib/api";
import type { Cocktail } from "@/types/cocktails";

import Shell from "@/components/layout/Shell";
import SearchBar from "@/components/search/SearchBar";
import DrinkList from "@/components/search/DrinkList";
import { Martini } from "lucide-react";

const SearchPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [debounced, setDebounced] = useState(searchParams.get("q") || "");

  useEffect(() => {
    // Debounce the search input to avoid excessive API calls
    const id = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(id);
  }, [query]);

  useEffect(() => {
    // Maintain the query parameter in the URL so that when the user returns, the search is preserved
    if (debounced) {
      const params = new URLSearchParams();
      params.set("q", debounced);
      router.replace(`/?${params.toString()}`, { scroll: false });
    } else {
      router.replace("/", { scroll: false });
    }
  }, [debounced, router]);

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
  );
};

const HomePage: React.FC = () => {
  return (
    <Shell title="Thirsty">
      <Suspense
        fallback={
          <div className="mx-auto w-full max-w-md px-4 pb-6 pt-4">
            <Martini /> Loading...
          </div>
        }
      >
        <SearchPage />
      </Suspense>
    </Shell>
  );
};

export default HomePage;
