import DownloadCertificate from "@/components/DownloadCertificate";
import getAllRugs from "@/lib/queries/getAllRugs";
import getRugBySlug from "@/lib/queries/getRugBySlug";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import Image from "next/image";
import {notFound} from "next/navigation";
import {Suspense} from "react";

/**
 * Generate the static routes at build time.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams({
  params
}: {
  params: {locale: string};
}) {
  const language = params.locale.toUpperCase();
  // Get a list of all rugs.
  const rugs = await getAllRugs(language);

  // No rugs? Bail...
  if (!rugs) {
    return [];
  }

  // Return the slugs for each rug.
  return rugs.map((rug: {slug: string}) => ({
    locale: params.locale,
    slug: rug.slug
  }));
}

/**
 * Generate the metadata for each static route at build time.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata({
  params
}: {
  params: {locale: string; slug: string};
}): Promise<Metadata | null> {
  const language = params.locale.toUpperCase();

  // Get the page.
  const rug = await getRugBySlug(params.slug, language);

  // No post? Bail...
  if (!rug) {
    return {};
  }

  return {
    title: rug.seo.title,
    description: rug.seo.metaDesc
  };
}

/**
 * A single rug route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function Rug({
  params
}: {
  params: {slug: string; locale: string};
}) {
  const language = params.locale.toUpperCase();
  const t = await getTranslations("RugPage");
  // Fetch a single rug from WordPress.
  const rug = await getRugBySlug(params.slug, language);

  // No rug? Bail...
  if (!rug) {
    notFound();
  }

  return (
    <main className="container">
      <article className="w-full min-h-screen flex flex-col items-start md:flex-row-reverse">
        <aside className="hidden md:block sticky h-screen w-80 right-0 top-0 border-s border-soft-grey p-8 border-solid">
          {/* description */}
          {/* <h1
            className="text-3xl font-bold"
            dangerouslySetInnerHTML={{__html: rug.title}}
          /> */}
          <h1 className="text-3xl font-bold">{rug.rugFeatures.name}</h1>

          <div className="overscroll-contain overflow-y-auto overflow-x-hidden gap-3 mt-8  divide-y">
            <div className="flex justify-between items-center py-2 text-xs">
              <p className="uppercase text-brand-400 ">
                {t("RugFeatures.Origin")}
              </p>

              <p className="w-40 text-end overflow-hidden uppercase">
                {rug.translation.rugFeatures.origin}
              </p>
            </div>

            <div className="flex justify-between items-center py-2 text-xs">
              <p className="uppercase text-brand-400 ">
                {t("RugFeatures.Width")}
              </p>

              <p className="w-40 text-end overflow-hidden uppercase">
                {rug.translation.rugFeatures.width} CM
              </p>
            </div>

            <div className="flex justify-between items-center py-2 text-xs">
              <p className="uppercase text-brand-400 ">
                {t("RugFeatures.Length")}
              </p>

              <p className="w-40 text-end overflow-hidden uppercase">
                {rug.translation.rugFeatures.length} CM
              </p>
            </div>

            <div className="flex justify-between items-center py-2 text-xs">
              <p className="uppercase text-brand-400 ">
                {t("RugFeatures.NumberOfKnots")}
              </p>

              <p className="w-40 text-end overflow-hidden uppercase">
                {rug.translation.rugFeatures.numberOfKnots}
              </p>
            </div>

            <div className="flex justify-between items-center py-2 text-xs">
              <p className="uppercase text-brand-400 ">
                {t("RugFeatures.Material")}
              </p>

              <p className="w-40 text-end overflow-hidden uppercase">
                {rug.translation.rugFeatures.material}
              </p>
            </div>

            <div className="flex justify-between items-center py-2 text-xs">
              <p className="uppercase text-brand-400 ">
                {t("RugFeatures.Idea")}
              </p>

              <p className="w-40 text-end overflow-hidden uppercase">
                {rug.translation.rugFeatures.idea}
              </p>
            </div>

            <div className="flex justify-between items-center py-2 text-xs">
              <p className="uppercase text-brand-400 ">
                {t("RugFeatures.Designer")}
              </p>

              <p className="w-40 text-end overflow-hidden uppercase">
                {rug.translation.rugFeatures.designer}
              </p>
            </div>

            <div className="flex justify-between items-center py-2 text-xs">
              <p className="uppercase text-brand-400 ">
                {" "}
                {t("RugFeatures.NumberOfWeavers")}
              </p>

              <p className="w-40 text-end overflow-hidden uppercase">
                {rug.translation.rugFeatures.numberOfWeavers}
              </p>
            </div>
          </div>
          <Suspense>
            <DownloadCertificate
              url={rug.translation.rugFeatures.certificate.sourceUrl}
            />
          </Suspense>
        </aside>
        <div className="flex-grow">
          <h1 className="text-3xl font-bold mt-4 md:hidden">
            {rug.translation.rugFeatures.name}
          </h1>
          {/* image */}
          <div className="p-8">
            <Image
              className="md:min-h-screen md:h-screen object-contain"
              alt={rug.translation.featuredImage.node.altText}
              height={rug.translation.featuredImage.node.mediaDetails.height}
              src={rug.translation.featuredImage.node.sourceUrl}
              width={rug.translation.featuredImage.node.mediaDetails.width}
              priority={true}
            />
          </div>

          {/* Description */}
          <div className="py-12 px-8 border-y border-soft-grey border-solid">
            <h2 className="uppercase text-brand-400  text-xs font-normal">
              {t("Description")}
            </h2>

            <div
              className="text-xl mt-2"
              dangerouslySetInnerHTML={{__html: rug.translation.content}}
            ></div>

            {/* <pre>{JSON.stringify(rug.translation.content, null, 2)}</pre> */}
          </div>

          <div className="md:hidden">
            <div className="py-12 px-8 border-b border-soft-grey border-solid">
              <h2 className="uppercase text-brand-400  text-xs font-normal">
                {t("RugFeatures.Origin")}
              </h2>

              <p className="text-xl mt-2">
                {rug.translation.rugFeatures.origin}
              </p>
            </div>

            <div className="py-12 px-8 border-b border-soft-grey border-solid">
              <h2 className="uppercase text-brand-400  text-xs font-normal">
                {t("RugFeatures.Width")}
              </h2>

              <p className="text-xl mt-2">
                {rug.translation.rugFeatures.width} CM
              </p>
            </div>

            <div className="py-12 px-8 border-b border-soft-grey border-solid">
              <h2 className="uppercase text-brand-400  text-xs font-normal">
                {t("RugFeatures.Length")}
              </h2>

              <p className="text-xl mt-2">
                {rug.translation.rugFeatures.length} CM
              </p>
            </div>

            <div className="py-12 px-8 border-b border-soft-grey border-solid">
              <h2 className="uppercase text-brand-400  text-xs font-normal">
                {t("RugFeatures.NumberOfKnots")}
              </h2>

              <p className="text-xl mt-2">
                {rug.translation.rugFeatures.numberOfKnots}
              </p>
            </div>

            <div className="py-12 px-8 border-b border-soft-grey border-solid">
              <h2 className="uppercase text-brand-400  text-xs font-normal">
                {t("RugFeatures.Material")}
              </h2>

              <p className="text-xl mt-2">
                {rug.translation.rugFeatures.material}
              </p>
            </div>

            <div className="py-12 px-8 border-b border-soft-grey border-solid">
              <h2 className="uppercase text-brand-400  text-xs font-normal">
                {t("RugFeatures.Idea")}
              </h2>

              <p className="text-xl mt-2">{rug.translation.rugFeatures.idea}</p>
            </div>

            <div className="py-12 px-8 border-b border-soft-grey border-solid">
              <h2 className="uppercase text-brand-400  text-xs font-normal">
                {t("RugFeatures.Designer")}
              </h2>

              <p className="text-xl mt-2">
                {rug.translation.rugFeatures.designer}
              </p>
            </div>

            <div className="py-12 px-8 border-b border-soft-grey border-solid">
              <h2 className="uppercase text-brand-400  text-xs font-normal">
                {t("RugFeatures.NumberOfWeavers")}
              </h2>

              <p className="text-xl mt-2">
                {rug.translation.rugFeatures.numberOfWeavers}
              </p>
            </div>
          </div>

          {/* Gallary */}
          <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-3">
              {rug.translation.rugFeatures.images &&
                rug.translation.rugFeatures.images.map((image, idx) => (
                  <div
                    key={idx}
                    className="w-full h-96 border-separate border border-solid border-soft-grey border-t-0 border-e-0 flex items-center justify-center"
                  >
                    <Image
                      className=" w-36 object-cover"
                      alt={image.altText}
                      height={image.mediaDetails.height}
                      src={image.sourceUrl}
                      width={image.mediaDetails.width}
                      priority={true}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* <div dangerouslySetInnerHTML={{__html: rug.translation.content}} /> */}
        {/* <Link className="button" href={rug..affiliateUrl}>
          View on Amazon
        </Link> */}
      </article>
    </main>
  );
}
