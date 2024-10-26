import SimpleLogo from "@/public/logo.svg";
import WhiteLogo from "@/public/logoWhite.svg";

import SimpleLogoFa from "@/public/logoFa.svg";
import {useLocale} from "next-intl";
import {ComponentPropsWithoutRef} from "react";

type LogoProps = ComponentPropsWithoutRef<"img"> & {
  variant:
    | "simple"
    | "white"
    | "text"
    | "whiteSimple"
    | "whiteText"
    | "textRedWhite";
};

export default function Logo({variant, className, ...props}: LogoProps) {
  const locale = useLocale();

  let image;

  if (locale === "en") {
    switch (variant) {
      case "simple":
        image = SimpleLogo;
        break;
      case "white":
        image = WhiteLogo;
        break;
      default:
        break;
    }
  } else {
    switch (variant) {
      case "simple":
        image = SimpleLogoFa;
        break;
      case "white":
        image = WhiteLogo;
        break;
      default:
        break;
    }
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image.src}
      alt="Termeht Travel Logo"
      className={`${className ?? ""} h-full`}
      {...props}
    />
  );
}
