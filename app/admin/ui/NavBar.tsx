"use client";
import { Fragment } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { XMarkIcon, Bars4Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import ThemeSelect from "@/app/ui/common/ThemeToogle";
import { useAuth } from "@/components/hook/useAuth";

type RouterItem = {
  id: number;
  path: string;
  name: string;
  icon: string;
};

export const ROUTES: RouterItem[] = [
  {
    id: 1,
    path: "/admin/event",
    name: "Event",
    icon: "mdi mdi-pencil-circle",
  },
  {
    id: 2,
    path: "/admin/music",
    name: "Musique",
    icon: "mdi mdi-pencil-circle",
  },
  // {
  //   id: 3,
  //   path: "/admin/picture",
  //   name: "Photo",
  //   icon: "mdi mdi-pencil-circle",
  // },
  {
    id: 4,
    path: "/admin/visitor",
    name: "Visiteur",
    icon: "mdi mdi-pencil-circle",
  },
  {
    id: 5,
    path: "/admin/pop",
    name: "Annonce",
    icon: "mdi mdi-pencil-circle",
  },
];

const NavBar = () => {
  const pathname = usePathname();
  const { logout } = useAuth();

  const disconect = () => {
    logout();
  };

  return (
    <Disclosure
      as="nav"
      className="bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-700"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {ROUTES.map((item: RouterItem) => (
                    <Link
                      href={item.path}
                      key={item.name}
                      className={clsx(
                        "inline-flex items-center px-1 pt-1 border-b-2 border-gray-500 text-sm font-medium dark:text-white",
                        {
                          "dark:border-white dark:text-white border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 ":
                            pathname === item.path,
                        },
                      )}
                      aria-current={pathname === item.path ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                <ThemeSelect />
                <button
                  onClick={() => {
                    disconect();
                  }}
                  type="button"
                  className="bg-white dark:bg-transparent dark:text-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Deconnexion
                  {/* <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                </button>
              </div>
              {/* Mobile menu button */}
              <div className="w-full flex items-center sm:hidden justify-between">
                <Disclosure.Button className="bg-white dark:bg-gray-600 dark:text-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars4Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
                <ThemeSelect />
              </div>
            </div>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Disclosure.Panel className="sm:hidden">
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="mt-3 space-y-1 flex flex-col items-start">
                  {ROUTES.map((item) => (
                    <Disclosure.Button className="" key={item.id}>
                      <Link
                        href={item.path}
                        key={item.name}
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                      >
                        {item.name}
                      </Link>
                    </Disclosure.Button>
                  ))}
                  <div
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      disconect();
                    }}
                  >
                    Deconnexion
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
