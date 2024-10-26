import getAllPosts from "@/lib/queries/getAllPosts";
import getPageBySlug from "@/lib/queries/getPageBySlug";
import {Page, Post} from "@/lib/types";
import {useTranslations} from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";

/**
 * Fetches data from WordPress.
 */
async function fetchData(slug: string, language: string) {
  // If the slug is 'blog', fetch all posts.
  if (slug === "blog") {
    return {posts: await getAllPosts(language)};
  }

  // If the slug is 'books', fetch all books.
  // if (slug === "books") {
  //   return {posts: await getAllBooks(), context: "books"}
  // }

  // If the slug is 'rugs', fetch all rugs.
  // if (slug === "rugs") {
  //   return {rugs: await getAllRugs(), context: "rugs"}
  // }

  // Otherwise, this could be a page.
  const page = await getPageBySlug(slug, language);

  // If page data exists, return it.
  if (page) {
    return {post: page};
  }

  // Otherwise, return an error.
  return {error: "No data found"};
}

/**
 * Render a single page.
 */
function RenderPage({page}: {page: Page}) {
  return (
    <main className="flex flex-col gap-8">
      <article>
        <h1 dangerouslySetInnerHTML={{__html: page.title}} />
        <div dangerouslySetInnerHTML={{__html: page.content}} />
      </article>
    </main>
  );
}

/**
 * Render posts list.
 */
function RenderPostsList({posts}: {posts: Post[]}) {
  const t = useTranslations("BlogsPage");
  return (
    <div className="container">
      <div className="mx-auto">
        <main className="flex flex-col gap-8 container pt-16 pb-32">
          <h1 className="capitalize font-semibold text-2xl">{t("Title")}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post: Post) => (
              <article className="" key={post.databaseId}>
                <div className="flex flex-col items-start justify-between gap-4 h-full bg-base-100 shadow-xl ">
                  <figure className="flex grow basis-56  shrink-0">
                    <Image
                      alt={post.featuredImage.node.altText}
                      height={post.featuredImage.node.mediaDetails.height}
                      src={post.featuredImage.node.sourceUrl}
                      width={post.featuredImage.node.mediaDetails.width}
                      priority={true}
                      className="w-full object-cover block "
                    />
                  </figure>
                  <div className="card-body pt-4 grow-0">
                    <Link href={`/blog/${post.slug}`}>
                      <h2
                        className="card-title"
                        dangerouslySetInnerHTML={{__html: post.title}}
                      />
                    </Link>
                    {/* <p className="text-sm text-gray-500">
                {post.commentCount} Comments
              </p> */}
                    <div
                      className="line-clamp-6"
                      dangerouslySetInnerHTML={{__html: post.excerpt}}
                    />
                    <div className="card-actions justify-end">
                      <Link
                        className="btn btn-primary mt-4"
                        href={`/blog/${post.slug}`}
                      >
                        {t("BlogCard.CallToAction")}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

/**
 * Catch-all Archive Page route.
 */
export default async function Archive({
  params
}: {
  params: {slug: string; locale: string};
}) {
  // Get the slug from the params.
  const {slug, locale} = params;
  const language = locale.toUpperCase();

  // Fetch data from WordPress.
  const data = await fetchData(slug, language);
  // If there's an error, return a 404 page.
  if (data.error) {
    notFound();
  }

  // If this is a single page, render the page.
  if (data.post) {
    return <RenderPage page={data.post} />;
  }

  // Otherwise, this must be an archive. Render the posts list.
  if (data.posts && data.posts.length > 0) {
    return <RenderPostsList posts={data.posts} />;
  }

  // Otherwise, return a 404 page.
  notFound();
}
