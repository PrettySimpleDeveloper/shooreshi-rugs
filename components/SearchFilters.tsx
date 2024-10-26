"use client";
import {MaximumRugLength, MaximumRugWidth, SliderStep} from "@/lib/data/data";
import queryString from "query-string";
import {useEffect, useState} from "react";
import {useTranslations} from "use-intl";
import {filters} from "./SearchRug";

type SearchFiltersProps = {
  onSearch: (filters: filters) => void;
};
export default function SearchFilters({onSearch}: SearchFiltersProps) {
  const [maxWidth, setMaxWidth] = useState<string>(MaximumRugWidth);
  const [maxLength, setMaxLength] = useState<string>(MaximumRugLength);
  const [sortBy, setSortBy] = useState<string>("newest");

  const t = useTranslations("RugsPage");

  function handleSort(sortBy: string) {
    setSortBy(sortBy);
  }

  function handleSearch() {
    const filters: filters = {
      maxWidth,
      maxLength,
      sortBy
    };
    onSearch(filters);
  }

  useEffect(() => {
    const parsedQuery = queryString.parse(window.location.search);
    const maxWidthInitial = Array.isArray(parsedQuery.maxWidth)
      ? parsedQuery.maxWidth[0]
      : parsedQuery.maxWidth;
    const maxLengthInitial = Array.isArray(parsedQuery.maxLength)
      ? parsedQuery.maxLength[0]
      : parsedQuery.maxLength;
    const sortByInitial = Array.isArray(parsedQuery.sortBy)
      ? parsedQuery.sortBy[0]
      : parsedQuery.sortBy;

    setMaxWidth(maxWidthInitial ?? MaximumRugWidth);
    setMaxLength(maxLengthInitial ?? MaximumRugLength);
    setSortBy(sortByInitial ?? "newest");
  }, []);

  return (
    <div className="flex flex-col gap-6 sticky top-8">
      <div>
        <h3 className="font-bold uppercase">
          {t("SearchFilters.SortedBy.Title")}
        </h3>
        <div className="form-control mt-4">
          <label className="label !py-1 justify-start gap-2 cursor-pointer ">
            <input
              type="radio"
              name="radio-sort"
              className="radio h-4 w-4"
              value="name"
              checked={sortBy == "name"}
              onChange={(e) => handleSort(e.target.value)}
            />
            <span className="label-text font-medium">
              {t("SearchFilters.SortedBy.Sort.Name")}
            </span>
          </label>
        </div>
        <div className="form-control">
          <label className="label !py-1 justify-start gap-2 cursor-pointer">
            <input
              type="radio"
              name="radio-sort"
              className="radio h-4 w-4"
              value="newest"
              checked={sortBy == "newest"}
              onChange={(e) => handleSort(e.target.value)}
            />
            <span className="label-text font-medium">
              {t("SearchFilters.SortedBy.Sort.NewestAdded")}
            </span>
          </label>
        </div>
        <div className="form-control">
          <label className="label !py-1 justify-start gap-2 cursor-pointer">
            <input
              type="radio"
              name="radio-sort"
              className="radio h-4 w-4"
              value="oldest"
              checked={sortBy == "oldest"}
              onChange={(e) => handleSort(e.target.value)}
            />
            <span className="label-text font-medium">
              {t("SearchFilters.SortedBy.Sort.OldestAdded")}
            </span>
          </label>
        </div>
      </div>

      <div className="">
        <h3 className="font-bold uppercase">
          {t("SearchFilters.Sizes.Title")}
        </h3>
        <div className="form-control mt-4">
          <p className="label-text font-medium">
            {t("SearchFilters.Sizes.Filters.MaximumWidth")}
          </p>
          <div className="flex items-center justify-between gap-2 mt-2">
            <input
              type="range"
              min="0"
              max={MaximumRugWidth}
              className="range range-xs "
              value={maxWidth}
              onChange={(e) => setMaxWidth(e.target.value)}
              step={SliderStep}
              dir="ltr"
            />
            <p className="label-text-alt shrink-0">
              {maxWidth} {t("SearchFilters.Sizes.Measurements")}
            </p>
          </div>
        </div>

        <div className="form-control mt-2">
          <p className="label-text font-medium">
            {t("SearchFilters.Sizes.Filters.MaximumLength")}
          </p>
          <div className="flex items-center justify-between gap-2 mt-2">
            <input
              type="range"
              min="0"
              max={MaximumRugLength}
              className="range range-xs"
              value={maxLength}
              onChange={(e) => setMaxLength(e.target.value)}
              step={SliderStep}
              dir="ltr"
            />
            <p className="label-text-alt shrink-0">
              {maxLength} {t("SearchFilters.Sizes.Measurements")}
            </p>
          </div>
        </div>
      </div>

      <button
        className="btn btn-primary btn-md w-full mt-4"
        onClick={handleSearch}
      >
        {t("SearchFilters.CallToAction")}
      </button>
    </div>
  );
}
