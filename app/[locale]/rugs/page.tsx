import SearchRug from "@/components/SearchRug";
import getPageBySlug from "@/lib/queries/getPageBySlug";
import {notFound} from "next/navigation";

export default async function Rugs({
  params: {locale}
}: {
  params: {locale: string};
}) {
  const language = locale.toUpperCase();

  const rugspage = await getPageBySlug("/rugs", language);

  // Fetch rugs from WordPress.
  // const rugs = await getAllRugs()

  // No data? Bail...
  if (!rugspage) {
    notFound();
  }

  return (
    <main className="container">
      <SearchRug />
    </main>
  );
}
