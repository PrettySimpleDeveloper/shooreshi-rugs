"use client";
import {EmblaOptionsType} from "embla-carousel";
import {NextButton, PrevButton, usePrevNextButtons} from "../CarouselButtons";

import {Rug} from "@/lib/types";
import useEmblaCarousel from "embla-carousel-react";
import {useTranslations} from "next-intl";
import Image from "next/image";
import Link from "next/link";
import "../Carousel.css";

type RugCarouselProps = {
  slides: Rug[];
  options?: EmblaOptionsType;
};

export default function RugCarousel({slides, options}: RugCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const t = useTranslations("RugCard");

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div
              className="embla__slide basis-full sm:basis-1/2 lg:basis-1/4 shrink-0 grow-0"
              key={index}
            >
              <Link href={`/rugs/${slide.slug}`}>
                <div className="flex flex-col items-start justify-between gap-4 h-full">
                  <Image
                    className="w-full object-cover block"
                    src={slide.featuredImage.node.sourceUrl}
                    width={slide.featuredImage.node.mediaDetails.width}
                    height={slide.featuredImage.node.mediaDetails.height}
                    alt={slide.featuredImage.node.altText}
                  />

                  <div className="flex flex-col items-start justify-between gap-1">
                    <p className="font-semibold text-lg">
                      {slide.rugFeatures.name}
                    </p>

                    <p className="text-sm font-light">
                      {slide.rugFeatures.width} {t("SizeBetween")}{" "}
                      {slide.rugFeatures.length}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls absolute end-0 bottom-[104%]">
        <div className="embla__buttons">
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            direction={options?.direction}
          />
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            direction={options?.direction}
          />
        </div>
      </div>
    </section>
  );
}
