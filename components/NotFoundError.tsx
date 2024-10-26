import {Link} from "@/i18n/routing";
import {useTranslations} from "next-intl";

export default function NotFoundError() {
  const t = useTranslations("NotFoundPage");

  return (
    <div className="text-center container pt-16 flex flex-col gap-12 items-center">
      <h1 className="font-medium text-7xl leading-normal">
        {t("Title")} <br />
      </h1>

      <h2 className="font-semibold text-8xl">404</h2>
      {/* <p className="text-red-500 text-2xl">{referer}</p> */}

      <Link href="/" className="btn btn-primary px-12">
        {t("CallToAction")}
      </Link>
    </div>
  );
}
