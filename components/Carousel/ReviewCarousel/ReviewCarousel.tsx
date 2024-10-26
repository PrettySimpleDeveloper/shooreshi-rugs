"use client";
import {EmblaOptionsType} from "embla-carousel";
import {NextButton, PrevButton, usePrevNextButtons} from "../CarouselButtons";

import {Review} from "@/lib/types";
import useEmblaCarousel from "embla-carousel-react";
import {PiStarFill} from "react-icons/pi";
import "../Carousel.css";

type ReviewCarouselProps = {
  slides: Review[];
  options?: EmblaOptionsType;
};

export default function ReviewCarousel({slides, options}: ReviewCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

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
              className="embla__slide basis-full sm:basis-1/2 lg:basis-1/3 shrink-0 grow-0"
              key={index}
            >
              <div className="shadow-soft bg-white  rounded-none py-12 px-6 flex flex-col justify-between h-72">
                <p className="">{slide.review}</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-xl">{slide.name}</p>
                  <div className="flex items-center justify-center gap-1">
                    {Array.from({length: slide.rate}).map((item, index) => (
                      <PiStarFill key={index} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls absolute end-0 bottom-[107%]">
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
