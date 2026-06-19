// src/components/windows/RicingControls.tsx
"use client";
import React from "react";
import { useTheme, themes, wallpapers } from "@/contexts/ThemeContext";
import { useRicing } from "@/contexts/RicingContext";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import * as Slider from "@radix-ui/react-slider";
import { LayoutGrid, Maximize, Palette, Image, Sliders, Layers } from "lucide-react";

const RicingControls = () => {
  const { theme, setTheme, wallpaper, setWallpaper } = useTheme();
  const { gaps, setGaps, borderRadius, setBorderRadius, glow, setGlow } = useRicing();
  const { layoutMode, setLayoutMode, setFocusedWindow } = useWorkspace();

  return (
    <div
      className="h-full w-full p-3 flex flex-col gap-3 font-mono text-[12px] bg-opacity-95 overflow-y-auto scrollbar-thin select-none"
      style={{
        backgroundColor: theme.colors.surface,
        color: theme.colors.text,
      }}
      onClick={() => setFocusedWindow("rice")}
    >
      {/* Title */}
      <div 
        className="flex items-center gap-1.5 pb-1 border-b"
        style={{ borderColor: `${theme.colors.border}44`, color: theme.colors.accent }}
      >
        <Sliders size={14} />
        <span className="font-bold uppercase tracking-wider">Ricing Configurator</span>
      </div>

      {/* Tiling Mode */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 opacity-70 text-[10px] uppercase font-bold">
          <Layers size={11} />
          <span>Tiling Layout Engine</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 mt-0.5">
          <button
            onClick={() => setLayoutMode("tiled")}
            className="flex items-center justify-center gap-1 py-1 rounded cursor-pointer border transition-all active:scale-95 text-[11px]"
            style={{
              backgroundColor: layoutMode === "tiled" ? theme.colors.accent : "transparent",
              color: layoutMode === "tiled" ? theme.colors.background : theme.colors.text,
              borderColor: layoutMode === "tiled" ? "transparent" : theme.colors.border,
              fontWeight: layoutMode === "tiled" ? "bold" : "normal",
            }}
          >
            <LayoutGrid size={12} />
            <span>Tiled</span>
          </button>
          <button
            onClick={() => setLayoutMode("maximized")}
            className="flex items-center justify-center gap-1 py-1 rounded cursor-pointer border transition-all active:scale-95 text-[11px]"
            style={{
              backgroundColor: layoutMode === "maximized" ? theme.colors.accent : "transparent",
              color: layoutMode === "maximized" ? theme.colors.background : theme.colors.text,
              borderColor: layoutMode === "maximized" ? "transparent" : theme.colors.border,
              fontWeight: layoutMode === "maximized" ? "bold" : "normal",
            }}
          >
            <Maximize size={12} />
            <span>Maximized</span>
          </button>
        </div>
      </div>

      {/* Theme Presets */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 opacity-70 text-[10px] uppercase font-bold">
          <Palette size={11} />
          <span>Visual Skin (Theme)</span>
        </div>
        <div className="grid grid-cols-2 gap-1 mt-0.5">
          {Object.entries(themes).map(([key, value]) => {
            const isSelected = theme.name === value.name;
            return (
              <button
                key={key}
                onClick={() => setTheme(key as keyof typeof themes)}
                className="py-1 px-1.5 rounded cursor-pointer border text-left text-[11px] truncate flex items-center gap-1 transition-all active:scale-95"
                style={{
                  backgroundColor: isSelected ? `${theme.colors.accent}1c` : "transparent",
                  borderColor: isSelected ? theme.colors.accent : theme.colors.border,
                  color: isSelected ? theme.colors.accent : theme.colors.text,
                  fontWeight: isSelected ? "bold" : "normal",
                }}
              >
                <span 
                  className="w-2 h-2 rounded-full inline-block flex-shrink-0"
                  style={{ backgroundColor: value.colors.accent }}
                />
                <span className="truncate">{value.name.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Wallpaper Meshes */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 opacity-70 text-[10px] uppercase font-bold">
          <Image size={11} />
          <span>Desktop Wallpaper Mesh</span>
        </div>
        <div className="grid grid-cols-2 gap-1 mt-0.5">
          {Object.entries(wallpapers).map(([key, value]) => {
            const isSelected = wallpaper === key;
            return (
              <button
                key={key}
                onClick={() => setWallpaper(key as keyof typeof wallpapers)}
                className="py-1 px-1.5 rounded cursor-pointer border text-center text-[10px] truncate transition-all active:scale-95"
                style={{
                  backgroundColor: isSelected ? `${theme.colors.accent}1c` : "transparent",
                  borderColor: isSelected ? theme.colors.accent : theme.colors.border,
                  color: isSelected ? theme.colors.accent : theme.colors.text,
                  fontWeight: isSelected ? "bold" : "normal",
                }}
              >
                {value}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tiling Gaps Slider */}
      <div className="flex flex-col gap-0.5">
        <div className="flex justify-between text-[11px]">
          <span className="opacity-70 font-bold">Gaps Size</span>
          <span style={{ color: theme.colors.accent }}>{gaps}px</span>
        </div>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-4 mt-0.5 cursor-pointer"
          value={[gaps]}
          onValueChange={(val) => setGaps(val[0])}
          max={24}
          step={1}
        >
          <Slider.Track
            className="relative grow rounded-full h-[4px]"
            style={{ backgroundColor: theme.colors.border }}
          >
            <Slider.Range
              className="absolute rounded-full h-full"
              style={{ backgroundColor: theme.colors.accent }}
            />
          </Slider.Track>
          <Slider.Thumb
            className="block w-3.5 h-3.5 rounded-full shadow border transition-transform hover:scale-110 focus:outline-none"
            style={{ 
              backgroundColor: theme.colors.accent,
              borderColor: theme.colors.background 
            }}
          />
        </Slider.Root>
      </div>

      {/* Border Rounding Slider */}
      <div className="flex flex-col gap-0.5">
        <div className="flex justify-between text-[11px]">
          <span className="opacity-70 font-bold">Rounding Radius</span>
          <span style={{ color: theme.colors.accent }}>{borderRadius}px</span>
        </div>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-4 mt-0.5 cursor-pointer"
          value={[borderRadius]}
          onValueChange={(val) => setBorderRadius(val[0])}
          max={16}
          step={1}
        >
          <Slider.Track
            className="relative grow rounded-full h-[4px]"
            style={{ backgroundColor: theme.colors.border }}
          >
            <Slider.Range
              className="absolute rounded-full h-full"
              style={{ backgroundColor: theme.colors.accent }}
            />
          </Slider.Track>
          <Slider.Thumb
            className="block w-3.5 h-3.5 rounded-full shadow border transition-transform hover:scale-110 focus:outline-none"
            style={{ 
              backgroundColor: theme.colors.accent,
              borderColor: theme.colors.background 
            }}
          />
        </Slider.Root>
      </div>

      {/* Glow Toggle */}
      <div className="flex items-center justify-between pt-1 border-t border-dashed" style={{ borderColor: `${theme.colors.border}44` }}>
        <span className="opacity-70 font-bold text-[11px]">Active Window Glow</span>
        <button
          onClick={() => setGlow(!glow)}
          className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none cursor-pointer"
          style={{
            backgroundColor: glow ? theme.colors.accent : theme.colors.border,
          }}
        >
          <span
            className={`${
              glow ? "translate-x-5" : "translate-x-1"
            } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
            style={{
              backgroundColor: glow ? theme.colors.background : "#ffffff",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default RicingControls;
