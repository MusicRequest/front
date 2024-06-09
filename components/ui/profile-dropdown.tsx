import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { Divider } from "@tremor/react";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faScrewdriverWrench,
} from "@fortawesome/pro-light-svg-icons";
import { useAuth } from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";
import { usePathname, useRouter } from "next/navigation";

export default function ProfileDropdown() {
  const { account, logout } = useAuth();
  const { isAdminVicteon } = usePermissions();
  const router = useRouter();

  const path = usePathname();

  const isNotAdminPath = () => {
    return !path.startsWith("/admin") && !path.startsWith("/manage");
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="-m-1.5 flex items-center p-1.5">
        <span className="sr-only">Open user menu</span>
        <span className="hover: flex size-10 items-center justify-center rounded-full bg-primary text-base text-white hover:ring-1">
          <span className="capitalize">{account?.firstName[0] || ""} </span>
          <span className="capitalize">{account?.lastName[0] || ""} </span>
          {/*<FontAwesomeIcon*/}
          {/*  size="lg"*/}
          {/*  icon={faUser}*/}
          {/*  className="text-white"*/}
          {/*/>*/}
        </span>
        {/*<span className="hidden lg:flex lg:items-center">*/}
        {/*  <span className="ml-2 text-sm leading-6" aria-hidden="true">*/}
        {/*    <span className="capitalize">{account?.firstName} </span>*/}
        {/*    <span className="capitalize">{account?.lastName}</span>*/}
        {/*  </span>*/}
        {/*  <ChevronDownIcon*/}
        {/*    className="ml-2 size-5 text-gray-400"*/}
        {/*    aria-hidden="true"*/}
        {/*  />*/}
        {/*</span>*/}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-max origin-top-right rounded-md bg-background p-4 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          <div className={"flex space-x-3"}>
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-base text-white">
              <span className="capitalize">{account?.firstName[0]}</span>
              <span className="capitalize">{account?.lastName[0]}</span>
            </span>
            <div className={"ml-2 flex flex-col"}>
              <span className="text-sm leading-6">
                <span className="capitalize">{account?.firstName} </span>
                <span className="capitalize">{account?.lastName}</span>
              </span>
              <span className="text-xs text-gray-400">{account?.email}</span>
            </div>
          </div>
          <Divider className={"my-3"} />
          {isNotAdminPath() && (
            <>
              {isAdminVicteon() && (
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => router.push("/admin/customers")}
                      className={cn(
                        active ? "hover:bg-muted/50 cursor-pointer" : "",
                        "flex items-center py-2 px-3 leading-6 text-popover-foreground gap-4",
                      )}
                    >
                      <FontAwesomeIcon
                        icon={faScrewdriverWrench}
                        className={"size-6 text-muted-foreground"}
                        fixedWidth
                      />
                      <p>Administration</p>
                    </div>
                  )}
                </Menu.Item>
              )}
            </>
          )}
          <Menu.Item>
            {({ active }) => (
              <div
                onClick={() => logout()}
                className={cn(
                  active ? "hover:bg-muted/50 cursor-pointer" : "",
                  "flex items-center py-2 px-3 leading-6 text-popover-foreground gap-4",
                )}
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className={"size-6 text-muted-foreground"}
                  fixedWidth
                />
                <p> Se déconnecter</p>
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
