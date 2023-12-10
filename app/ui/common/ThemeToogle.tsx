"use client";
import useThemeMode from "@/app/libs/hooks/useThemeMode";
import classNamesJoin from "@/app/libs/utils/classNamesJoin";
import { Switch } from "@headlessui/react";
import { BiSun } from "react-icons/bi";
import { BsMoon } from "react-icons/bs";

export default function ThemeSelect() {
  const [colorTheme, setTheme, theme] = useThemeMode();
  return (
    <Switch
      checked={theme === "dark" ? true : false}
      onChange={() => {
        setTheme(colorTheme);
      }}
      className={classNamesJoin(
        theme === "dark" ? "bg-blue-700" : "bg-gray-200",
        "relative inline-flex flex-shrink-0 h-5 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200"
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={classNamesJoin(
          theme === "dark" ? "translate-x-5" : "translate-x-0",
          "pointer-events-none relative inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
        )}
      >
        <span
          className={classNamesJoin(
            theme === "dark"
              ? "opacity-0 ease-out duration-100"
              : "opacity-100 ease-in duration-200",
            "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
          )}
          aria-hidden="true"
        >
          <BiSun className="text-gray-400" />
        </span>
        <span
          className={classNamesJoin(
            theme === "dark"
              ? "opacity-100 ease-in duration-200"
              : "opacity-0 ease-out duration-100",
            "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
          )}
          aria-hidden="true"
        >
          <BsMoon className="h-3 w-3 text-indigo-600" />
        </span>
      </span>
    </Switch>
  );
}
