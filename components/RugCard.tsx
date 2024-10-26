import {Rug} from "@/lib/types";
import {useTranslations} from "next-intl";
import Image from "next/image";
import Link from "next/link";

type RugCardProps = {
  rug: Rug;
  type: "grid" | "list";
};

export default function RugCard({rug, type}: RugCardProps) {
  const t = useTranslations("RugsPage");

  if (type === "list") {
    return (
      <div className="w-full">
        <div className="p-6 border border-soft-grey border-solid flex flex-col sm:flex-row items-bottom gap-6">
          <div className="flex items-start sm:basis-1/2 lg:basis-1/4">
            <Image
              className="w-full object-cover block"
              src={rug.featuredImage.node.sourceUrl}
              width={rug.featuredImage.node.mediaDetails.width}
              height={rug.featuredImage.node.mediaDetails.height}
              alt={rug.featuredImage.node.altText}
            />
          </div>
          <div className="sm:basis-1/2 lg:basis-3/4 flex flex-col justify-between gap-6">
            <div>
              {/* header */}
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">
                  {rug.rugFeatures.name}
                </h1>
                <p className="text-sm font-medium">
                  {rug.rugFeatures.width} {t("RugCard.SizeBetween")}{" "}
                  {rug.rugFeatures.length}
                </p>
              </div>
              {/* content */}
              <div
                className="text-md text-gray-600 font-medium mt-2"
                dangerouslySetInnerHTML={{__html: rug.content}}
              ></div>
            </div>

            {/* link */}
            <Link
              href={`/rugs/${rug.slug}`}
              className="btn btn-primary w-full md:w-auto px-8 py-4 md:ms-auto"
            >
              {t("RugCard.CallToAction")}
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="w-full"></div>;
  }
}
