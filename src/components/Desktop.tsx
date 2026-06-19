// src/components/Desktop.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useRicing } from "@/contexts/RicingContext";
import { useWorkspace, WindowId, workspaces } from "@/contexts/WorkspaceContext";
import Terminal from "@/components/windows/Terminal";
import NeovimEditor from "@/components/windows/NeovimEditor";
import FileExplorer from "@/components/windows/FileExplorer";
import BtopMonitor from "@/components/windows/BtopMonitor";
import RicingControls from "@/components/windows/RicingControls";

const Window = ({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id: WindowId;
  className?: string;
}) => {
  const { theme } = useTheme();
  const { borderRadius, glow } = useRicing();
  const { focusedWindow, setFocusedWindow } = useWorkspace();
  const isFocused = focusedWindow === id;

  return (
    <div
      className={`h-full w-full flex flex-col overflow-hidden ${className}`}
      onClick={() => setFocusedWindow(id)}
      style={{
        backgroundColor: theme.colors.surface,
        border: isFocused ? `2px solid ${theme.colors.accent}` : `2px solid ${theme.colors.border}`,
        borderRadius: `${borderRadius}px`,
        boxShadow: isFocused && glow ? `0 0 16px ${theme.colors.accent}4d` : "none",
        transition: "all 0.15s ease-in-out",
      }}
    >
      {/* Title Bar */}
      <div
        className="px-3 py-1 flex items-center justify-between text-[11px] select-none border-b flex-shrink-0"
        style={{
          borderColor: theme.colors.border,
          backgroundColor: isFocused ? `${theme.colors.accent}15` : "transparent",
          color: isFocused ? theme.colors.accent : theme.colors.subtext,
        }}
      >
        <span className="font-mono font-bold capitalize">{id}</span>
        <div className="flex gap-1.5 flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f38ba8] opacity-60"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#f9e2af] opacity-60"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#a6e3a1] opacity-60"></span>
        </div>
      </div>
      <div className="flex-grow overflow-hidden relative">
        {children}
      </div>
    </div>
  );
};

const Desktop = () => {
  const { theme, wallpaper } = useTheme();
  const { gaps } = useRicing();
  const { activeWorkspace, layoutMode } = useWorkspace();
  const [isMobile, setIsMobile] = useState(false);

  // Check responsiveness on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const wallpaperStyle = {
    radial: {
      backgroundImage: `radial-gradient(circle at center, ${theme.colors.accent}22 0%, ${theme.colors.background} 80%)`,
    },
    dots: {
      backgroundImage: `radial-gradient(${theme.colors.accent}1f 1.5px, transparent 1.5px)`,
      backgroundSize: "16px 16px",
      backgroundColor: theme.colors.background,
    },
    stripes: {
      backgroundColor: theme.colors.background,
      backgroundImage: `linear-gradient(45deg, ${theme.colors.surface} 12%, transparent 12%, transparent 88%, ${theme.colors.surface} 88%), 
                        linear-gradient(135deg, ${theme.colors.surface} 12%, transparent 12%, transparent 88%, ${theme.colors.surface} 88%)`,
      backgroundSize: "30px 30px",
    },
    solid: { backgroundColor: theme.colors.background },
  };

  // Get active window based on current activeWorkspace state
  const activeWindowId: WindowId =
    workspaces.find((w) => w.id === activeWorkspace)?.windowId || "terminal";

  // State-preserving layout styling values:
  // Instead of conditional rendering, we hide/show containers using CSS display parameters
  const isTiled = layoutMode === "tiled" && !isMobile;

  const isVisible = (id: WindowId) => {
    if (isTiled) return true;
    return activeWindowId === id;
  };

  const showLeftSplit = isTiled || activeWindowId === "terminal" || activeWindowId === "btop";
  const showRightSplit = isTiled || activeWindowId === "editor" || activeWindowId === "explorer" || activeWindowId === "rice";

  return (
    <main
      className="h-screen w-screen pt-8 flex p-3 overflow-hidden select-none transition-all duration-300 relative"
      style={{
        backgroundColor: theme.colors.background,
        ...wallpaperStyle[wallpaper],
        gap: isTiled ? `${gaps}px` : "0px",
      }}
    >
      {/* Left Split Stack */}
      <div
        className="h-full flex-col"
        style={{
          display: showLeftSplit ? "flex" : "none",
          width: isTiled ? `calc(60% - ${gaps / 2}px)` : "100%",
          gap: isTiled ? `${gaps}px` : "0px",
        }}
      >
        {/* Terminal Window Wrapper */}
        <div
          style={{
            display: isVisible("terminal") ? "block" : "none",
            height: isTiled ? `calc(62% - ${gaps / 2}px)` : "100%",
          }}
        >
          <Window id="terminal">
            <Terminal />
          </Window>
        </div>

        {/* Btop Hardware Monitor Wrapper */}
        <div
          style={{
            display: isVisible("btop") ? "block" : "none",
            height: isTiled ? `calc(38% - ${gaps / 2}px)` : "100%",
          }}
        >
          <Window id="btop">
            <BtopMonitor />
          </Window>
        </div>
      </div>

      {/* Right Split Stack */}
      <div
        className="h-full flex-col"
        style={{
          display: showRightSplit ? "flex" : "none",
          width: isTiled ? `calc(40% - ${gaps / 2}px)` : "100%",
          gap: isTiled ? `${gaps}px` : "0px",
        }}
      >
        {/* Neovim Editor Wrapper */}
        <div
          style={{
            display: isVisible("editor") ? "block" : "none",
            height: isTiled ? `calc(52% - ${gaps / 2}px)` : "100%",
          }}
        >
          <Window id="editor">
            <NeovimEditor />
          </Window>
        </div>

        {/* Bottom Row Wrapper (Ranger & Ricing) */}
        <div
          style={{
            display: (isVisible("explorer") || isVisible("rice")) ? "flex" : "none",
            height: isTiled ? `calc(48% - ${gaps / 2}px)` : "100%",
            gap: isTiled ? `${gaps}px` : "0px",
          }}
        >
          {/* Ranger File Explorer Wrapper */}
          <div
            style={{
              display: isVisible("explorer") ? "block" : "none",
              width: isTiled ? "50%" : "100%",
              height: "100%",
            }}
          >
            <Window id="explorer">
              <FileExplorer />
            </Window>
          </div>

          {/* Ricing Configurator Wrapper */}
          <div
            style={{
              display: isVisible("rice") ? "block" : "none",
              width: isTiled ? "50%" : "100%",
              height: "100%",
            }}
          >
            <Window id="rice">
              <RicingControls />
            </Window>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Desktop;
