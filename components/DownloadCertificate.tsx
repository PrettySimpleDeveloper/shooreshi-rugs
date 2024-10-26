"use client";

import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {PiDownloadBold} from "react-icons/pi";

export default function DownloadCertificate({url}: {url: string}) {
  const searchparams = useSearchParams();
  const id = searchparams.get("sos311");

  if (!id) return null;

  return (
    <Link
      href={url}
      target="_blank"
      className="btn btn-primary px-8 w-full gap-4  mt-8 btn-outline"
    >
      Certificate
      {/* <PiCertificateBold className="text-xl" /> */}
      <PiDownloadBold className="text-xl" />
    </Link>
  );
}
