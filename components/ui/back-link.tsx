import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import type { UrlObject } from "url";

interface BackLinkProps {
  label: string;
  url: string | UrlObject;
}
export default function BackLink({ label, url }: BackLinkProps) {
  return (
    <nav className="mb-2 flex" aria-label="return link">
      <Link href={url}>
        <span className="-ml-1 flex items-center">
          <ChevronLeftIcon
            className="size-5 shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <span className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700">
            {label}
          </span>
        </span>
      </Link>
    </nav>
  );
}
