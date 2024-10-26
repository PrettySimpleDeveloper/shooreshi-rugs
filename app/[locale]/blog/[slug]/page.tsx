import getAllPosts from "@/lib/queries/getAllPosts";
import getPostBySlug from "@/lib/queries/getPostBySlug";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import Link from "next/link";
import {notFound} from "next/navigation";

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
  // Get all blog posts.
  const posts = await getAllPosts(language);

  // No posts? Bail...
  if (!posts) {
    return [];
  }

  // Return the slugs for each post.
  return posts.map((post: {slug: string}) => ({
    locale: params.locale,
    slug: post.slug
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
  params: {slug: string; locale: string};
}): Promise<Metadata | null> {
  const language = params.locale.toUpperCase();
  // Get the blog post.
  const post = await getPostBySlug(params.slug, language);

  // No post? Bail...
  if (!post) {
    return {};
  }

  return {
    title: post.seo.title,
    description: post.seo.metaDesc
  };
}

/**
 * The blog post route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function Post({
  params
}: {
  params: {slug: string; locale: string};
}) {
  const language = params.locale.toUpperCase();
  const t = await getTranslations("BlogPage");
  // Fetch a single post from WordPress.
  const post = await getPostBySlug(params.slug, language);

  // No post? Bail...
  if (!post) {
    notFound();
  }

  return (
    <article className="container pt-16 pb-32 blog">
      <header>
        <div
          className="hero min-h-80"
          style={{
            backgroundImage: `url(${post.translation.featuredImage.node.sourceUrl})`
          }}
        >
          <div className="hero-overlay bg-opacity-20"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1
                className="mb-5 text-5xl font-bold"
                dangerouslySetInnerHTML={{__html: post.translation.title}}
              />
              <p className="mb-5 italic">
                {t("By")} {post.translation.author.node.name} {t("On")}{" "}
                <time>{post.translation.date}</time>
              </p>
            </div>
          </div>
        </div>
      </header>
      <div
        className="mt-8 blog"
        dangerouslySetInnerHTML={{__html: post.translation.content}}
      />
      <footer className="flex items-center justify-between gap-4 pb-4">
        <div className="my-8">
          <h3 className="text-xl">{t("Categories")}</h3>
          <ul className="flex list-none gap-2 ">
            {post.translation.categories.nodes.map((category) => (
              <li className=" " key={category.databaseId}>
                <Link className="link" href={`/blog/category/${category.name}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>{t("Tags")}</h3>
          <ul className="m-0 flex list-none gap-2 p-0">
            {post.translation.tags.nodes.map((tag) => (
              <li className="m-0 p-0" key={tag.databaseId}>
                <Link className="link" href={`/blog/tag/${tag.name}`}>
                  {tag.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </footer>

      {/**
       * Comments Section
       */}
      {/* <section className="border-t-2">
        <h3>Comments</h3>
        {post.comments.nodes.map((comment) => (
          <article key={comment.databaseId}>
            <header className="flex items-center gap-2">
              <img
                alt={comment.author.node.name}
                className="m-0 rounded-full"
                height={64}
                loading="lazy"
                src={comment.author.node.avatar.url}
                width={64}
              />
              <div className="flex flex-col gap-2">
                <h4
                  className="m-0 p-0 leading-none"
                  dangerouslySetInnerHTML={{__html: comment.author.node.name}}
                />
                <time className="italic">{comment.date}</time>
              </div>
            </header>

            <div dangerouslySetInnerHTML={{__html: comment.content}} />
          </article>
        ))}
      </section>
      <CommentForm postID={post.databaseId} /> */}
    </article>
  );
}
