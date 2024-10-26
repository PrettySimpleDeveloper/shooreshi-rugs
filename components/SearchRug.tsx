"use client";
import {MaximumRugLength, MaximumRugWidth} from "@/lib/data/data";
import {Rug} from "@/lib/types";
import {useLocale} from "next-intl";
import {useRouter} from "next/navigation";
import queryString from "query-string";
import {useEffect, useState} from "react";
import RugCard from "./RugCard";
import SearchFilters from "./SearchFilters";

export interface filters {
  maxWidth: string;
  maxLength: string;
  sortBy: string;
}

function sortRugs(rugs: Rug[], sortBy: string): Rug[] {
  if (sortBy === "oldest") {
    return rugs.reverse();
  } else if (sortBy === "name") {
    return rugs.sort((a, b) =>
      a.rugFeatures.name.localeCompare(b.rugFeatures.name)
    );
  }
  // Default to "newest"
  return rugs;
}

export default function SearchRug() {
  const [rugs, setRugs] = useState<Rug[]>([]);
  const router = useRouter();
  const [isSearcching, setIsSearching] = useState<boolean>(false);
  const locale = useLocale();

  async function searchRugs(filtersInputs?: filters) {
    setIsSearching(true);
    const {maxWidth, maxLength, sortBy} = queryString.parse(
      window.location.search
    );
    const filters = {
      maxWidth: +MaximumRugWidth,
      maxLength: +MaximumRugLength,
      sortBy: "newest"
    };

    if (filtersInputs) {
      filters.maxWidth = +filtersInputs.maxWidth;
      filters.maxLength = +filtersInputs.maxLength;
      filters.sortBy = filtersInputs.sortBy;
    } else {
      if (maxWidth) {
        filters.maxWidth = +maxWidth;
      }
      if (maxLength) {
        filters.maxLength = +maxLength;
      }
      if (sortBy && typeof sortBy === "string") {
        filters.sortBy = sortBy;
      }
    }

    const res = await fetch("../../api/search", {
      method: "POST",
      body: JSON.stringify({...filters})
    });
    // console.log("res", res);

    const data = await res.json();

    const sortedRugs = sortRugs(data.rugs, filters.sortBy);

    setRugs(sortedRugs);
    setIsSearching(false);
  }

  useEffect(() => {
    searchRugs();
  }, []);

  async function handleSearch(filters: filters) {
    // update search resault api
    router.push(
      `/rugs?maxWidth=${filters.maxWidth}&maxLength=${filters.maxLength}&sortBy=${filters.sortBy}`,
      {
        scroll: true
      }
    );
    searchRugs(filters);
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 pt-12 pb-48">
      <div className="md:basis-1/5">
        <SearchFilters onSearch={handleSearch} />
      </div>
      <div className="md:basis-4/5">
        {isSearcching ? (
          <div className="flex justify-center items-center mt-8">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : (
          <SearchResaults rugs={rugs} />
        )}
      </div>
    </div>
  );
}

function SearchResaults({rugs}: {rugs: Rug[]}) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6">
        {rugs.map((rug, idx) => (
          <RugCard rug={rug} key={idx} type="list" />
        ))}
      </div>
    </div>
  );
}
