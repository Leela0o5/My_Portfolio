// src/components/windows/FileExplorer.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { fileSystem, FileNode } from "@/lib/fileSystem";
import { Folder, File, ChevronLeft, ChevronRight } from "lucide-react";

const FileExplorer = () => {
  const { theme } = useTheme();
  const { setActiveFile, setFocusedWindow } = useWorkspace();
  const [pathStack, setPathStack] = useState<FileNode[]>([fileSystem]);
  const [selectedItem, setSelectedItem] = useState<FileNode | null>(null);

  const currentDir = pathStack[pathStack.length - 1];
  const parentDir = pathStack.length > 1 ? pathStack[pathStack.length - 2] : null;

  // Sync initial file selection to Neovim on mount
  useEffect(() => {
    const initialFile = fileSystem.children?.find((child) => child.type === "file");
    if (initialFile) {
      setSelectedItem(initialFile);
      setActiveFile(initialFile.name, initialFile.content || "");
    }
  }, []);

  const handleSelect = (item: FileNode) => {
    setSelectedItem(item);
    if (item.type === "file") {
      setActiveFile(item.name, item.content || "");
    }
  };

  const handleNavigateIn = (folder: FileNode) => {
    if (folder.type === "folder") {
      setPathStack([...pathStack, folder]);
      // Highlight the first child of the entered directory
      if (folder.children && folder.children.length > 0) {
        setSelectedItem(folder.children[0]);
        if (folder.children[0].type === "file") {
          setActiveFile(folder.children[0].name, folder.children[0].content || "");
        }
      } else {
        setSelectedItem(null);
      }
    }
  };

  const handleNavigateOut = () => {
    if (pathStack.length > 1) {
      const popped = pathStack.slice(0, -1);
      const previousDir = pathStack[pathStack.length - 1];
      setPathStack(popped);
      setSelectedItem(previousDir);
    }
  };

  const calculateSize = (item: FileNode): string => {
    if (item.type === "file") {
      const bytes = new Blob([item.content || ""]).size;
      return `${bytes} B`;
    }
    const count = item.children?.length || 0;
    return `${count} items`;
  };

  return (
    <div
      className="h-full w-full flex flex-col font-mono text-[12px] p-3 overflow-hidden select-none"
      style={{ color: theme.colors.text }}
      onClick={() => setFocusedWindow("explorer")}
    >
      {/* Waybar styled path breadcrumbs & back navigation */}
      <div
        className="flex items-center justify-between pb-2 mb-2 border-b text-[11px]"
        style={{ borderColor: `${theme.colors.border}44` }}
      >
        <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap scrollbar-none">
          <span className="opacity-50">ranger:</span>
          {pathStack.map((node, idx) => (
            <span key={idx} className="flex items-center">
              {idx > 0 && <span className="mx-1 text-gray-500">/</span>}
              <button
                onClick={() => {
                  const sliced = pathStack.slice(0, idx + 1);
                  setPathStack(sliced);
                  setSelectedItem(null);
                }}
                className="hover:underline font-bold"
                style={{ color: theme.colors.accent }}
              >
                {node.name === "root" ? "~" : node.name}
              </button>
            </span>
          ))}
        </div>

        {parentDir && (
          <button
            onClick={handleNavigateOut}
            className="flex items-center gap-0.5 opacity-80 hover:opacity-100 hover:underline px-1 py-0.5 rounded border border-transparent hover:border-gray-700 active:scale-95"
            style={{ color: theme.colors.accent }}
          >
            <ChevronLeft size={12} />
            <span>back</span>
          </button>
        )}
      </div>

      {/* Ranger 3-Pane Layout Column Structure */}
      <div className="flex-grow flex h-full overflow-hidden gap-1.5">
        
        {/* Pane 1 (Left 25%): Parent directory items (or root link) */}
        <div 
          className="w-1/4 h-full overflow-y-auto border-r pr-1.5"
          style={{ borderColor: `${theme.colors.border}22` }}
        >
          {parentDir ? (
            parentDir.children?.map((node) => (
              <div
                key={node.name}
                className="flex items-center gap-1.5 p-1 rounded opacity-60 text-ellipsis overflow-hidden whitespace-nowrap"
                style={{
                  color: node.name === currentDir.name ? theme.colors.accent : theme.colors.subtext,
                  fontWeight: node.name === currentDir.name ? "bold" : "normal",
                }}
              >
                {node.type === "folder" ? (
                  <Folder size={12} style={{ color: theme.colors.accent }} />
                ) : (
                  <File size={12} style={{ color: theme.colors.green }} />
                )}
                <span className="truncate">{node.name}</span>
              </div>
            ))
          ) : (
            <div className="p-1 opacity-40 italic">No parent</div>
          )}
        </div>

        {/* Pane 2 (Middle 45%): Active folder list contents */}
        <div 
          className="w-[45%] h-full overflow-y-auto border-r px-1.5"
          style={{ borderColor: `${theme.colors.border}22` }}
        >
          {currentDir.children && currentDir.children.length > 0 ? (
            currentDir.children.map((node) => {
              const isSelected = selectedItem?.name === node.name;
              return (
                <div
                  key={node.name}
                  onClick={() => handleSelect(node)}
                  onDoubleClick={() => node.type === "folder" && handleNavigateIn(node)}
                  className="flex items-center justify-between p-1 rounded cursor-pointer transition-all duration-100 hover:bg-opacity-20"
                  style={{
                    backgroundColor: isSelected ? `${theme.colors.accent}20` : "transparent",
                    color: isSelected ? theme.colors.accent : theme.colors.text,
                    fontWeight: isSelected ? "bold" : "normal",
                  }}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    {node.type === "folder" ? (
                      <Folder size={12} style={{ color: theme.colors.accent }} />
                    ) : (
                      <File size={12} style={{ color: theme.colors.green }} />
                    )}
                    <span className="truncate">{node.name}</span>
                  </div>
                  <span className="text-[10px] opacity-40 ml-2 whitespace-nowrap">{calculateSize(node)}</span>
                </div>
              );
            })
          ) : (
            <div className="p-1 opacity-40 italic text-center">Empty directory</div>
          )}
        </div>

        {/* Pane 3 (Right 30%): Live contents/summary preview metadata */}
        <div className="w-[30%] h-full overflow-hidden pl-1.5 flex flex-col gap-2">
          {selectedItem ? (
            <div className="h-full flex flex-col overflow-hidden">
              <div className="border-b pb-1.5 mb-1.5 flex-shrink-0" style={{ borderColor: `${theme.colors.border}44` }}>
                <span className="font-bold block truncate" style={{ color: theme.colors.accent }}>
                  {selectedItem.name}
                </span>
                <span className="text-[10px] block opacity-55">
                  Type: {selectedItem.type}
                </span>
                <span className="text-[10px] block opacity-55">
                  Size: {calculateSize(selectedItem)}
                </span>
              </div>
              
              <div className="flex-grow overflow-y-auto pr-1">
                {selectedItem.type === "file" ? (
                  <pre 
                    className="text-[11px] leading-normal whitespace-pre-wrap select-text opacity-70 font-mono"
                    style={{ color: theme.colors.subtext }}
                  >
                    {selectedItem.content || "Empty file"}
                  </pre>
                ) : (
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] italic opacity-60">Directory contents:</span>
                    {selectedItem.children?.map((c) => (
                      <div key={c.name} className="flex items-center gap-1 text-[11px] opacity-75">
                        {c.type === "folder" ? <Folder size={10} /> : <File size={10} />}
                        <span className="truncate">{c.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {selectedItem.type === "folder" && (
                <button
                  onClick={() => handleNavigateIn(selectedItem)}
                  className="mt-auto w-full py-1 text-center rounded border transition-all duration-150 active:scale-95 text-[11px] hover:opacity-85"
                  style={{
                    backgroundColor: `${theme.colors.accent}15`,
                    borderColor: theme.colors.accent,
                    color: theme.colors.accent,
                  }}
                >
                  Enter Folder
                </button>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center opacity-30 italic">
              No selected node
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default FileExplorer;
