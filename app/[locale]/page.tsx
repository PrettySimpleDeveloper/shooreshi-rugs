import ReviewCarousel from "@/components/Carousel/ReviewCarousel/ReviewCarousel";
import RugCarousel from "@/components/Carousel/RugCarousel/RugCarousel";
import SectionTitle from "@/components/SectionTitle";
import {reviews, rugSizes} from "@/lib/data/data";
import getAllPosts from "@/lib/queries/getAllPosts";
import getAllRugs from "@/lib/queries/getAllRugs";
import getPageBySlug from "@/lib/queries/getPageBySlug";
import {Post} from "@/lib/types";
import {EmblaOptionsType} from "embla-carousel";
import {getTranslations} from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import getHomeData from "../data";

/**
 * The homepage route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function Home({
  params: {locale}
}: {
  params: {locale: string};
}) {
  // Fetch homepage from WordPress.
  const language = locale.toUpperCase();

  const homePage = await getPageBySlug("/", language);
  const blocks = homePage.translation.blocks;
  // Fetch rugs from WordPress.
  const rugs = await getAllRugs(language);

  // Fetch posts from WordPress.
  const posts = await getAllPosts(language.toUpperCase());

  // No data? Bail...
  if (!rugs || !rugs.length || !posts || !posts.length || !homePage) {
    notFound();
  }

  const {homeCoverImage, heroImage, heroTitle, whyUs} = getHomeData(blocks);

  const OPTIONS: EmblaOptionsType = {
    dragFree: true,
    direction: locale === "fa" ? "rtl" : "ltr"
  };
  const newstRugs = rugs.slice(0, 12);
  const newstPosts = posts.slice(0, 2);
  const topPost = posts[2];

  const bestRugs = rugs.reverse().slice(0, 12);

  const t = await getTranslations("HomePage");

  return (
    <div className="flex flex-col gap-12">
      <div
        className="hero min-h-screen -mt-navbar"
        style={{
          backgroundImage: `url('${homeCoverImage}')`
        }}
      >
        {/* <div className="hero-overlay bg-opacity-5"></div> */}
        <div className="hero-content text-black text-center">
          <div className="max-w-2xl">
            <h1
              className="mb-3 text-4xl font-bold leading-normal"
              dangerouslySetInnerHTML={{
                __html: typeof heroTitle === "string" ? heroTitle : ""
              }}
            ></h1>

            <div className="my-8">
              <Image src={heroImage} alt="hero" width={2000} height={1000} />
            </div>

            <Link href="/rugs" className="btn btn-primary px-8">
              {t("Hero.CallToAction")}
            </Link>
          </div>
        </div>
      </div>

      {/**
       * Latest Rugs
       * */}
      <section className="container">
        <div className="mx-auto">
          <SectionTitle
            title={t("LatestSection.Title")}
            beforeTitle={t("LatestSection.BeforeTitle")}
          />

          <RugCarousel slides={newstRugs} options={OPTIONS} />
        </div>
      </section>

      {/**
       * Last two posts
       * */}
      <section className="container">
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {newstPosts.map((post: Post) => (
              <div className="" key={post.databaseId}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="w-full relative flex h-72 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-transparent after:opacity-65 after:z-10 hover:after:opacity-75 transition-all delay-700 ease-in-out"
                >
                  <Image
                    alt={post.featuredImage.node.altText}
                    height={post.featuredImage.node.mediaDetails.height}
                    src={post.featuredImage.node.sourceUrl}
                    width={post.featuredImage.node.mediaDetails.width}
                    priority={true}
                    className="w-full object-cover"
                  />
                  <h2
                    dangerouslySetInnerHTML={{__html: post.title}}
                    className="absolute start-4 bottom-4 text-white text-xl font-semibold z-20"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/**
       * Best Rugs
       * */}
      <section className="container">
        <div className="mx-auto">
          <SectionTitle
            title={t("BestSection.Title")}
            beforeTitle={t("BestSection.BeforeTitle")}
          />

          <RugCarousel slides={bestRugs} options={OPTIONS} />
        </div>
      </section>

      {/**
       * Top post
       */}

      <section className="container">
        <div className="mx-auto">
          <div className="flex gap-4">
            <div className="basis-full" key={topPost.databaseId}>
              <Link
                href={`/blog/${topPost.slug}`}
                className="w-full relative flex h-72 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-transparent after:opacity-65 after:z-10 hover:after:opacity-75 transition-all delay-700 ease-in-out"
              >
                <Image
                  alt={topPost.featuredImage.node.altText}
                  height={topPost.featuredImage.node.mediaDetails.height}
                  src={topPost.featuredImage.node.sourceUrl}
                  width={topPost.featuredImage.node.mediaDetails.width}
                  priority={true}
                  className="w-full object-cover"
                />
                <h2
                  dangerouslySetInnerHTML={{__html: topPost.title}}
                  className="absolute start-4 bottom-4 text-white text-xl font-semibold z-20"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/**
       * Rug by size
       */}
      <section className="container">
        <div className="mx-auto">
          <SectionTitle
            title={t("SizesSection.Title")}
            beforeTitle={t("SizesSection.BeforeTitle")}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {rugSizes.map((item) => (
              <div key={item.name} className="bg-brand-50  rounded-none">
                <a
                  href={item.link}
                  className="block relative after:absolute after:inset-0 after:bg-black after:opacity-10 after:z-10 hover:after:opacity-20 transition-all delay-700 ease-linear"
                >
                  <div className="pt-[150%]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full absolute inset-0 object-cover"
                      fill
                    />
                  </div>
                  <span className="block  text-center absolute left-3 right-3 top-[50%] translate-y-[-50%] font-normal text-xl z-20">
                    <span className="text-gray-500 px-4 py-2 bg-white">
                      {t("SizesSection.Sizes." + item.name)}
                    </span>
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/**
       * Customer's Review
       * */}
      <section className="container">
        <div className="mx-auto">
          <SectionTitle
            title={t("ReviewsSection.Title")}
            beforeTitle={t("ReviewsSection.BeforeTitle")}
          />

          <ReviewCarousel slides={reviews} options={OPTIONS} />
        </div>
      </section>

      {/**
       * Why us
       * */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-16 container">
        {whyUs.map((item) => {
          const Icon = item.icon;
          return (
            <div
              className="card bg-brand-50 border-4 border-black border-solid rounded-none"
              key={item.title}
            >
              <figure className="px-10 pt-10">
                {/* <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                  className="rounded-xl"
                /> */}
                <Icon className="text-8xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">
                  {t("WhyUs." + item.title + ".Title")}
                </h2>
                <p>{t("WhyUs." + item.title + ".Text")}</p>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
