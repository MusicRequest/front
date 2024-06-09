import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PropsComponent = {
  subNavigation: any[];
  currentItem: number | string;
  handleChangeMenu: (id: number | string) => void;
  children: ReactNode;
};

export default function SidebarNavigationLayout({
  subNavigation,
  currentItem,
  handleChangeMenu,
  children,
}: PropsComponent) {
  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
      <aside className="px-2 py-6 sm:px-6 lg:col-span-2 lg:p-0">
        <nav className="space-y-1">
          {subNavigation.map((item) => (
            <div
              onClick={() => handleChangeMenu(item.id)}
              key={item.name}
              className={cn(
                currentItem === item.id
                  ? "text-primary dark:text-green-400 bg-gray-100"
                  : "text-gray-700 dark:text-gray-400",
                "group flex items-center gap-x-2 rounded-md p-2 text-sm leading-6 hover:text-primary dark:hover:text-green-400 cursor-pointer",
              )}
            >
              {item.icon && (
                <FontAwesomeIcon
                  icon={item.icon}
                  fixedWidth={true}
                  className={cn(
                    currentItem === item.id
                      ? "text-primary dark:text-green-400"
                      : null,
                    "-ml-1 mr-3 h-4 w-4 flex-shrink-0",
                  )}
                  size="xl"
                />
              )}
              <span className="truncate">{item.name}</span>
            </div>
          ))}
        </nav>
      </aside>
      <div className="space-y-6 sm:px-6 lg:col-span-10 lg:px-0">{children}</div>
    </div>
  );
}
