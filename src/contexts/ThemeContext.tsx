// src/contexts/ThemeContext.tsx
"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

export const themes = {
  catppuccin: {
    name: "Catppuccin Macchiato",
    colors: {
      background: "#181825",
      accent: "#cba6f7",
      green: "#a6e3a1",
      surface: "#1e1e2e",
      border: "#313244",
      text: "#cad3f5",
      subtext: "#a6adc8",
    },
  },
  gruvbox: {
    name: "Gruvbox Dark Retro",
    colors: {
      background: "#1d2021",
      accent: "#fe8019",
      green: "#b8bb26",
      surface: "#282828",
      border: "#504945",
      text: "#ebdbb2",
      subtext: "#a89984",
    },
  },
  tokyoNight: {
    name: "Tokyo Night Neon",
    colors: {
      background: "#0f0f14",
      accent: "#7aa2f7",
      green: "#9ece6a",
      surface: "#1a1b26",
      border: "#24283b",
      text: "#c0caf5",
      subtext: "#a9b1d6",
    },
  },
  nordic: {
    name: "Nordic Frost",
    colors: {
      background: "#232731",
      accent: "#88c0d0",
      green: "#a3be8c",
      surface: "#2e3440",
      border: "#4c566a",
      text: "#d8dee9",
      subtext: "#e5e9f0",
    },
  },
};

export const wallpapers = {
  radial: "Ambient Radial",
  dots: "Hacker Dot Grid",
  stripes: "Cyber Stripes",
  solid: "Minimal Solid",
};

type Theme = typeof themes.catppuccin;
type ThemeName = keyof typeof themes;
type WallpaperName = keyof typeof wallpapers;

interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
  wallpaper: WallpaperName;
  setWallpaper: (name: WallpaperName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>("catppuccin");
  const [wallpaper, setWallpaper] = useState<WallpaperName>("radial");

  const setTheme = (name: ThemeName) => {
    setThemeName(name);
  };

  const theme = themes[themeName];

  return (
    <ThemeContext.Provider
      value={{ theme, themeName, setTheme, wallpaper, setWallpaper }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
