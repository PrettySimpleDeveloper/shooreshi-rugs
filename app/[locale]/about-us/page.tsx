import ReviewCarousel from "@/components/Carousel/ReviewCarousel/ReviewCarousel";
import SectionTitle from "@/components/SectionTitle";
import getPageBySlug from "@/lib/queries/getPageBySlug";
import {EmblaOptionsType} from "embla-carousel";
import {getTranslations} from "next-intl/server";
import Image from "next/image";
import {notFound} from "next/navigation";
import getAboutUsData from "./data";
/**
 * The about-us route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function AboutUs({
  params: {locale}
}: {
  params: {locale: string};
}) {
  const language = locale.toUpperCase();
  // Fetch homepage from WordPress.
  const aboutUsPage = await getPageBySlug("/about-us", language);
  const blocks = aboutUsPage.translation.blocks;

  const t = await getTranslations("AboutUsPage");

  // Fetch posts from WordPress.
  // const posts = await getAllPosts()

  // No data? Bail...
  if (!aboutUsPage) {
    notFound();
  }

  const {
    heroImage,
    historyTitle,
    historyPerson,
    historyText,
    abouts,
    teamTitle,
    team,
    teamText,
    reviews
  } = getAboutUsData(blocks);

  const OPTIONS: EmblaOptionsType = {
    dragFree: true,
    direction: locale === "fa" ? "rtl" : "ltr"
  };
  const SLIDE_COUNT = 16;
  return (
    <article className="flex flex-col gap-y-16 pb-16">
      <div
        className="hero min-h-screen -mt-navbar"
        style={{
          backgroundImage: `url('${heroImage}')`
        }}
      >
        {/* <div className="hero-overlay bg-opacity-5"></div> */}

        <div className="container">
          {/* <pre>{JSON.stringify(aboutsRowBlocks, undefined, 2)}</pre> */}

          <div className="hero-content text-black text-center ">
            <div className="max-w-4xl mt-14 lg:mt-0">
              <h1
                className="text-3xl hidden"
                dangerouslySetInnerHTML={{__html: aboutUsPage.title}}
              />

              <h2 className="mb-5 text-4xl font-bold leading-normal">
                {historyTitle}
              </h2>

              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
                {historyPerson.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col items-center justify-center gap-4"
                  >
                    <Image
                      className="h-[278px]"
                      src={item.image}
                      alt={item.name}
                      width={204}
                      height={278}
                    />
                    <p
                      className=" font-medium"
                      dangerouslySetInnerHTML={{__html: item.name}}
                    ></p>
                  </div>
                ))}
              </div>

              <p
                className="mb-5 mt-8  text-justify"
                dangerouslySetInnerHTML={{__html: historyText}}
              ></p>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl">
        {abouts.map((item) => (
          <div
            key={item.text}
            className="flex flex-col md:flex-row items-start md:items-center  md:even:flex-row-reverse "
          >
            <p className="py-12 md:p-8 lg:p-12 basis-1/2">{item.text}</p>
            <Image
              className=" basis-1/2  object-cover"
              src={item.image}
              width={1600}
              height={900}
              alt="history"
              priority={true}
            />
          </div>
        ))}
      </div>

      <section className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-5 text-4xl font-bold leading-normal">
            {teamTitle}
          </h2>
          <div className="flex items-center justify-center flex-wrap gap-8">
            {team.map((item) => (
              <div key={item.name} className="text-center">
                <Image
                  className="h-[278px] text-center"
                  src={item.image}
                  alt={item.name}
                  width={204}
                  height={278}
                />

                <p className="font-medium mt-4 mb-0">{item.name}</p>
                <p className="font-normal ">{item.role}</p>
              </div>
            ))}
          </div>

          <p className="mt-8" dangerouslySetInnerHTML={{__html: teamText}}></p>
        </div>
      </section>

      <section className="container">
        <div className="mx-auto">
          <SectionTitle
            title={t("ReviewsSection.Title")}
            beforeTitle={t("ReviewsSection.BeforeTitle")}
          />
          <ReviewCarousel slides={reviews} options={OPTIONS} />
        </div>
      </section>
    </article>
  );
}
