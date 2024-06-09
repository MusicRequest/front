"use client";
import { ReactNode } from "react";

interface PageHeadingProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export default function SectionHeading({
  title,
  description,
  children,
}: PageHeadingProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-medium text-foreground sm:truncate sm:text-lg">
          {title}
        </h3>
        {Description(description)}
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0">
        <span className="sm:ml-3">{children}</span>
      </div>
    </div>
  );
}

function Description(description?: string) {
  if (description) {
    return (
      <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
        <div className="mt-2 flex items-center text-gray-500">
          {description}
        </div>
      </div>
    );
  }
  return <></>;
}
