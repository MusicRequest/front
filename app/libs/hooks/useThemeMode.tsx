import * as React from "react";

export default function useThemeMode() {
  const themeStorage =
    localStorage.getItem("MusicRequestThemePreference") === null
      ? "light"
      : localStorage.getItem("MusicRequestThemePreference");
  const [theme, setTheme] = React.useState<any>(themeStorage);
  const colorTheme = theme === "light" ? "dark" : "light";

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("MusicRequestThemePreference", theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorTheme, theme]);

  return [colorTheme, setTheme, theme] as const;
  return [];
}
