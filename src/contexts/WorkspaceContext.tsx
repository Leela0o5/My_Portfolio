// src/contexts/WorkspaceContext.tsx
"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { sampleCode } from "@/lib/sampleCode";

export type WindowId = "terminal" | "explorer" | "editor" | "btop" | "rice";
export type LayoutMode = "tiled" | "maximized";

interface Workspace {
  id: number;
  name: string;
  windowId: WindowId;
  process: string;
}

export const workspaces: Workspace[] = [
  { id: 1, name: "term", windowId: "terminal", process: "kitty -> zsh" },
  { id: 2, name: "files", windowId: "explorer", process: "kitty -> ranger" },
  { id: 3, name: "nvim", windowId: "editor", process: "kitty -> nvim" },
  { id: 4, name: "btop", windowId: "btop", process: "btop" },
  { id: 5, name: "rice", windowId: "rice", process: "hyprland -> active-rice" },
];

interface WorkspaceContextType {
  activeWorkspace: number;
  setActiveWorkspace: (id: number) => void;
  focusedWindow: WindowId;
  setFocusedWindow: (id: WindowId) => void;
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  getProcessString: () => string;
  
  // File sharing between Explorer and Neovim
  activeFileName: string;
  activeFileContent: string;
  setActiveFile: (name: string, content: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider = ({ children }: { children: ReactNode }) => {
  const [activeWorkspace, setActiveWorkspaceState] = useState<number>(1);
  const [focusedWindow, setFocusedWindow] = useState<WindowId>("terminal");
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("tiled");
  
  const [activeFileName, setActiveFileName] = useState<string>("portfolio.tsx");
  const [activeFileContent, setActiveFileContent] = useState<string>(sampleCode);

  // Sync workspace change to focus the corresponding window
  const setActiveWorkspace = (id: number) => {
    setActiveWorkspaceState(id);
    const ws = workspaces.find((w) => w.id === id);
    if (ws) {
      setFocusedWindow(ws.windowId);
    }
  };

  const getProcessString = () => {
    const ws = workspaces.find((w) => w.windowId === focusedWindow);
    return ws ? ws.process : "hyprland";
  };

  const setActiveFile = (name: string, content: string) => {
    setActiveFileName(name);
    setActiveFileContent(content);
  };

  return (
    <WorkspaceContext.Provider
      value={{
        activeWorkspace,
        setActiveWorkspace,
        focusedWindow,
        setFocusedWindow,
        layoutMode,
        setLayoutMode,
        getProcessString,
        activeFileName,
        activeFileContent,
        setActiveFile,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
};
