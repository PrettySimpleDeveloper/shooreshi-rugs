import Link from "next/link"

/**
 * Not Found component.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 */
export default async function NotFound() {
  // const headersList = headers()
  // const referer = headersList.get("referer")

  return (
    <div className="text-center container pt-16 ">
      <h1 className="font-medium text-7xl leading-normal">
        Rug not found <br />
        <span className="font-semibold text-8xl">404</span>
      </h1>
      {/* <p className="text-red-500 text-2xl">{referer}</p> */}

      <Link href="/rugs" className="btn btn-primary px-12 mt-8">
        Back to Rugs
      </Link>
    </div>
  )
}
