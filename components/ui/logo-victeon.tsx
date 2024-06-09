"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import logoLight from "@/public/logo_victeon.svg";
import logoDark from "@/public/logo_victeon_dark.svg";

type Props = {
  width?: number;
  height?: number;
};

export default function LogoVicteon({ width = 500, height = 500 }: Props) {
  const { theme, systemTheme } = useTheme();
  const [logo, setLogo] = useState();

  useEffect(() => {
    if (theme === "system") {
      if (systemTheme === "light") {
        setLogo(logoLight);
      } else {
        setLogo(logoDark);
      }
    } else {
      if (theme === "light") {
        setLogo(logoLight);
      } else {
        setLogo(logoDark);
      }
    }
  }, [systemTheme, theme]);

  return (
    <div>
      {logo && (
        <Image
          src={logo}
          width={width}
          height={height}
          alt="Logo VICTEON"
          priority={true}
        />
      )}
    </div>
  );
}
