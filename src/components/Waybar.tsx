// src/components/Waybar.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useWorkspace, workspaces } from "@/contexts/WorkspaceContext";
import {
  Monitor,
  FolderOpen,
  Terminal,
  Cpu,
  Sliders,
  Wifi,
  Volume2,
  Battery,
  LayoutGrid,
  Maximize,
} from "lucide-react";

const Waybar = () => {
  const { theme } = useTheme();
  const {
    activeWorkspace,
    setActiveWorkspace,
    layoutMode,
    setLayoutMode,
    getProcessString,
  } = useWorkspace();
  
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "UTC",
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const getWorkspaceIcon = (id: number) => {
    switch (id) {
      case 1:
        return <Terminal size={14} />;
      case 2:
        return <FolderOpen size={14} />;
      case 3:
        return <Monitor size={14} />;
      case 4:
        return <Cpu size={14} />;
      case 5:
        return <Sliders size={14} />;
      default:
        return <Monitor size={14} />;
    }
  };

  if (!mounted) {
    return (
      <div
        className="fixed top-0 left-0 right-0 h-8 px-4 flex items-center justify-between text-xs z-50 select-none"
        style={{
          backgroundColor: "#181825",
          color: "#cad3f5",
          borderBottom: "1px solid #313244",
        }}
      />
    );
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 h-8 px-4 flex items-center justify-between text-xs z-50 font-mono select-none"
      style={{
        backgroundColor: theme.colors.surface,
        color: theme.colors.text,
        borderBottom: `1px solid ${theme.colors.border}`,
        boxShadow: `0 2px 10px rgba(0,0,0,0.3)`,
      }}
    >
      {/* Left side: Workspaces */}
      <div className="flex items-center gap-1.5">
        {workspaces.map((ws) => {
          const isActive = activeWorkspace === ws.id;
          return (
            <button
              key={ws.id}
              onClick={() => setActiveWorkspace(ws.id)}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded cursor-pointer transition-all duration-150 active:scale-95 border border-transparent"
              style={{
                backgroundColor: isActive ? theme.colors.accent : "transparent",
                color: isActive ? theme.colors.background : theme.colors.subtext,
                borderColor: isActive ? "transparent" : `${theme.colors.border}44`,
                fontWeight: isActive ? "bold" : "normal",
              }}
            >
              {getWorkspaceIcon(ws.id)}
              <span>{`${ws.id}:${ws.name}`}</span>
            </button>
          );
        })}
      </div>

      {/* Middle: Active focused window process tree */}
      <div className="hidden md:flex items-center gap-2">
        <span 
          className="px-2 py-0.5 rounded border text-[11px]"
          style={{
            borderColor: `${theme.colors.accent}44`,
            backgroundColor: `${theme.colors.accent}11`,
            color: theme.colors.accent,
          }}
        >
          {getProcessString()}
        </span>
      </div>

      {/* Right side: Telemetry stats, Layout Toggle & Clock */}
      <div className="flex items-center gap-4 text-xs">
        {/* Layout Toggle */}
        <button
          onClick={() => setLayoutMode(layoutMode === "tiled" ? "maximized" : "tiled")}
          className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded cursor-pointer transition-all active:scale-95 border hover:opacity-80"
          style={{
            borderColor: theme.colors.border,
            color: theme.colors.accent,
            backgroundColor: `${theme.colors.surface}cc`,
          }}
          title={`Switch to ${layoutMode === "tiled" ? "Maximized" : "Tiled"} layout`}
        >
          {layoutMode === "tiled" ? <LayoutGrid size={13} /> : <Maximize size={13} />}
          <span className="capitalize">{layoutMode}</span>
        </button>

        {/* WiFi */}
        <div className="flex items-center gap-1.5" style={{ color: theme.colors.text }}>
          <Wifi size={13} className="opacity-80" />
          <span>100mbps</span>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-1.5" style={{ color: theme.colors.text }}>
          <Volume2 size={13} className="opacity-80" />
          <span>82%</span>
        </div>

        {/* Battery */}
        <div className="flex items-center gap-1.5 text-emerald-400" style={{ color: theme.colors.green }}>
          <Battery size={13} className="opacity-80" />
          <span>96%</span>
        </div>

        {/* Clock */}
        <div 
          className="font-semibold pl-2 border-l"
          style={{
            borderColor: theme.colors.border,
            color: theme.colors.accent
          }}
        >
          {time} <span className="opacity-60 text-[10px]">UTC</span>
        </div>
      </div>
    </div>
  );
};

export default Waybar;
