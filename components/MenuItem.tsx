"use client";
import {navLink} from "@/lib/types";
import {useTranslations} from "next-intl";
import Link from "next/link";

export default function MenuItem({item}: {item: navLink}) {
  const t = useTranslations("Navigation");
  function closeDrawer() {
    const drawer: HTMLInputElement = document.getElementById(
      "my-drawer"
    ) as HTMLInputElement;
    drawer.checked = false;
  }

  return (
    <li key={item.databaseId} onClick={closeDrawer}>
      <Link href={item.uri}>
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="!block w-full h-full"
        >
          {t(item.label)}
        </label>
      </Link>
    </li>
  );
}
