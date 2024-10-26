import {useTranslations} from "next-intl";
import Link from "next/link";
import {
  PiFacebookLogoBold,
  PiInstagramLogoBold,
  PiMailboxBold
} from "react-icons/pi";
import Logo from "./Logo";

/**
 * Footer component.
 */
export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <>
      <div
        style={{backgroundImage: "url('/footer.jpg')"}}
        className="bg-cover bg-center h-96"
      ></div>

      <footer className="footer bg-neutral text-neutral-content py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2   grid-rows-2 gap-4">
          <nav>
            <Link href="/">
              <Logo variant="white" className="!h-[80px]" />
            </Link>
          </nav>

          <nav>
            <div className="grid grid-flow-col gap-4">
              <Link
                href="/"
                className="link link-hover p-2 bg-white text-black text-2xl"
              >
                <PiInstagramLogoBold />
              </Link>

              <Link
                href="/"
                className="link link-hover p-2 bg-white text-black text-2xl"
              >
                <PiFacebookLogoBold />
              </Link>

              <Link
                href="/"
                className="link link-hover p-2 bg-white text-black text-2xl"
              >
                <PiMailboxBold />
              </Link>
            </div>
          </nav>

          <nav>
            <h6 className="footer-title">{t("About.Title")}</h6>
            <p>{t("About.Text")}</p>
          </nav>

          <nav className="grid gap-2 place-items-start">
            <h6 className="footer-title">{t("Company.Title")}</h6>
            <Link href="/" className="link link-hover">
              {t("Company.Links.Home")}
            </Link>
            <Link href="/about-us" className="link link-hover">
              {t("Company.Links.About")}
            </Link>
            <Link href="/contct-us" className="link link-hover">
              {t("Company.Links.Contact")}
            </Link>
            <Link href="/rugs" className="link link-hover">
              {t("Company.Links.Rugs")}
            </Link>
            <Link href="/blog" className="link link-hover">
              {t("Company.Links.Blog")}
            </Link>
          </nav>

          <nav>
            <h6 className="footer-title">{t("Address.Title")}</h6>
            <p>{t("Address.Text")}</p>
          </nav>

          <nav>
            <h6 className="footer-title">{t("Phone.Title")}</h6>
            <p>{t("Phone.Text")}</p>
          </nav>
        </div>
      </footer>

      <footer className="footer footer-center bg-neutral text-neutral-content p-10 border-t border-solid border-gray-100">
        <aside className="container px-4">
          <p>
            {t("CopyRight.Title")} © {new Date().getFullYear()} -{" "}
            {t("CopyRight.Text")}
          </p>
        </aside>
      </footer>
    </>
  );
}

//
