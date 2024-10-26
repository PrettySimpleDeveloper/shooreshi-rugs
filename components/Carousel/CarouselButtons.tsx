"use client";
import {EmblaCarouselType} from "embla-carousel";
import {ComponentPropsWithRef, useCallback, useEffect, useState} from "react";
import {PiArrowLeftBold, PiArrowRightBold} from "react-icons/pi";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export function usePrevNextButtons(
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  };
}

type ButtonPropType = {
  direction: string | undefined;
} & ComponentPropsWithRef<"button">;

export function PrevButton({direction, ...props}: ButtonPropType) {
  const {children, ...restProps} = props;
  const rtl = direction === "rtl";

  return (
    <button
      className="embla__button border-4 border-solid border-black disabled:cursor-not-allowed disabled:opacity-50 embla__button--prev "
      type="button"
      {...restProps}
    >
      {rtl ? (
        <PiArrowRightBold className="text-2xl" />
      ) : (
        <PiArrowLeftBold className="text-2xl" />
      )}
      {children}
    </button>
  );
}

export function NextButton({direction, ...props}: ButtonPropType) {
  const {children, ...restProps} = props;
  const rtl = direction === "rtl";
  return (
    <button
      className="embla__button border-4 border-solid border-black disabled:cursor-not-allowed disabled:opacity-50  embla__button--next "
      type="button"
      {...restProps}
    >
      {rtl ? (
        <PiArrowLeftBold className="text-2xl" />
      ) : (
        <PiArrowRightBold className="text-2xl" />
      )}

      {children}
    </button>
  );
}
