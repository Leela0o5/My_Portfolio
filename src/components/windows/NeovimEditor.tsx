// src/components/windows/NeovimEditor.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useWorkspace } from "@/contexts/WorkspaceContext";

type VimMode = "NORMAL" | "INSERT" | "VISUAL";

const NeovimEditor = () => {
  const { theme } = useTheme();
  const { activeFileName, activeFileContent, focusedWindow } = useWorkspace();
  
  const [mode, setMode] = useState<VimMode>("NORMAL");
  const [cursorLine, setCursorLine] = useState(0);
  const [cursorCol, setCursorCol] = useState(0);
  const [editorLines, setEditorLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync with active file content from WorkspaceContext
  useEffect(() => {
    if (activeFileContent) {
      setEditorLines(activeFileContent.split("\n"));
      setCursorLine(0);
      setCursorCol(0);
    }
  }, [activeFileName, activeFileContent]);

  // Syntax highlighting engine based on file type
  const getHighlightedContent = (line: string, fileName: string) => {
    let escaped = line
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const isConf = fileName.endsWith(".conf");
    const isSh = fileName.endsWith(".sh");
    const isMd = fileName.endsWith(".md");

    if (isConf) {
      // Configuration file syntax rules
      // Comments
      escaped = escaped.replace(/(#.*)/g, `<span style="color: ${theme.colors.subtext}">$1</span>`);
      // Numbers
      escaped = escaped.replace(/\b(\d+)\b/g, `<span style="color: ${theme.colors.green}">$1</span>`);
      // Hex colors
      escaped = escaped.replace(/(0x[0-9a-fA-F]+)/g, `<span style="color: ${theme.colors.accent}">$1</span>`);
      // Keys
      escaped = escaped.replace(/\b(monitor|input|general|decoration|rounding|blur|gaps_in|gaps_out|border_size|col\.active_border|col\.inactive_border|follow_mouse|kb_layout)\b/g, 
        `<span style="color: ${theme.colors.accent}; font-weight: bold;">$1</span>`
      );
    } else if (isSh) {
      // Bash shell rules
      // Comments
      escaped = escaped.replace(/(#.*)/g, `<span style="color: ${theme.colors.subtext}">$1</span>`);
      // Keywords
      escaped = escaped.replace(/\b(echo|exit|if|then|else|fi|for|in|do|done)\b/g, 
        `<span style="color: ${theme.colors.accent}">$1</span>`
      );
      // Package commands
      escaped = escaped.replace(/\b(pnpm|npm|yarn|install|run|build|dev)\b/g, 
        `<span style="color: ${theme.colors.green}">$1</span>`
      );
    } else if (isMd) {
      // Markdown syntax rules
      // Headers
      if (escaped.startsWith("#")) {
        escaped = `<span style="color: ${theme.colors.accent}; font-weight: bold;">${escaped}</span>`;
      }
      // Bullet points
      escaped = escaped.replace(/^(\s*[-*+]\s+)/, `<span style="color: ${theme.colors.green}">$1</span>`);
      // Code blocks inside single backticks
      escaped = escaped.replace(/`([^`]+)`/g, `<code style="background-color: ${theme.colors.border}44; padding: 2px 4px; border-radius: 4px;">$1</code>`);
    } else {
      // Default standard JavaScript/TypeScript rules
      const keywords = [
        "import", "export", "const", "let", "var", "function", "return", 
        "if", "else", "for", "while", "default", "from", "interface", 
        "type", "class", "async", "await", "try", "catch"
      ];
      // Strings
      escaped = escaped.replace(/(['"`].*?['"`])/g, `<span style="color: ${theme.colors.green}">$1</span>`);
      // Keywords
      keywords.forEach((kw) => {
        escaped = escaped.replace(
          new RegExp(`\\b${kw}\\b`, "g"),
          `<span style="color: ${theme.colors.accent}">${kw}</span>`
        );
      });
      // Comments
      escaped = escaped.replace(/(\/\/.*)/g, `<span style="color: ${theme.colors.subtext}">$1</span>`);
    }

    return escaped || "&nbsp;";
  };

  // Vim keyboard handler simulation
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (focusedWindow !== "editor") return;

      const currentLineText = editorLines[cursorLine] || "";

      if (mode === "NORMAL") {
        switch (e.key) {
          case "i":
            e.preventDefault();
            setMode("INSERT");
            break;
          case "v":
            e.preventDefault();
            setMode("VISUAL");
            break;
          case "j":
            e.preventDefault();
            setCursorLine((prev) => Math.min(prev + 1, editorLines.length - 1));
            break;
          case "k":
            e.preventDefault();
            setCursorLine((prev) => Math.max(prev - 1, 0));
            break;
          case "h":
            e.preventDefault();
            setCursorCol((prev) => Math.max(prev - 1, 0));
            break;
          case "l":
            e.preventDefault();
            setCursorCol((prev) => Math.min(prev + 1, currentLineText.length));
            break;
          default:
            break;
        }
      } else if (mode === "INSERT") {
        if (e.key === "Escape") {
          e.preventDefault();
          setMode("NORMAL");
          // Snaps cursor back to line end if it exceeds
          setCursorCol((prev) => Math.min(prev, Math.max(0, currentLineText.length - 1)));
        } else if (e.key === "Backspace") {
          e.preventDefault();
          if (cursorCol > 0) {
            const updatedLine =
              currentLineText.slice(0, cursorCol - 1) + currentLineText.slice(cursorCol);
            const newLines = [...editorLines];
            newLines[cursorLine] = updatedLine;
            setEditorLines(newLines);
            setCursorCol(cursorCol - 1);
          } else if (cursorLine > 0) {
            // Merge with previous line
            const prevLineText = editorLines[cursorLine - 1];
            const updatedPrevLine = prevLineText + currentLineText;
            const newLines = [...editorLines];
            newLines[cursorLine - 1] = updatedPrevLine;
            newLines.splice(cursorLine, 1);
            setEditorLines(newLines);
            setCursorLine(cursorLine - 1);
            setCursorCol(prevLineText.length);
          }
        } else if (e.key === "Enter") {
          e.preventDefault();
          const firstPart = currentLineText.slice(0, cursorCol);
          const secondPart = currentLineText.slice(cursorCol);
          const newLines = [...editorLines];
          newLines[cursorLine] = firstPart;
          newLines.splice(cursorLine + 1, 0, secondPart);
          setEditorLines(newLines);
          setCursorLine(cursorLine + 1);
          setCursorCol(0);
        } else if (e.key === "Tab") {
          e.preventDefault();
          const updatedLine =
            currentLineText.slice(0, cursorCol) + "  " + currentLineText.slice(cursorCol);
          const newLines = [...editorLines];
          newLines[cursorLine] = updatedLine;
          setEditorLines(newLines);
          setCursorCol(cursorCol + 2);
        } else if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
          e.preventDefault();
          const updatedLine =
            currentLineText.slice(0, cursorCol) + e.key + currentLineText.slice(cursorCol);
          const newLines = [...editorLines];
          newLines[cursorLine] = updatedLine;
          setEditorLines(newLines);
          setCursorCol(cursorCol + 1);
        }
      } else if (mode === "VISUAL") {
        if (e.key === "Escape") {
          e.preventDefault();
          setMode("NORMAL");
        } else if (e.key === "j") {
          e.preventDefault();
          setCursorLine((prev) => Math.min(prev + 1, editorLines.length - 1));
        } else if (e.key === "k") {
          e.preventDefault();
          setCursorLine((prev) => Math.max(prev - 1, 0));
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [focusedWindow, mode, cursorLine, cursorCol, editorLines]);

  // Adjust cursorCol limit when line changes
  useEffect(() => {
    const currentLineText = editorLines[cursorLine] || "";
    if (cursorCol > currentLineText.length) {
      setCursorCol(currentLineText.length);
    }
  }, [cursorLine, editorLines]);

  // Calculate total characters in buffer
  const getTotalChars = () => {
    return editorLines.reduce((acc, curr) => acc + curr.length, 0);
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full flex flex-col font-mono text-[12px] bg-opacity-95 overflow-hidden select-none outline-none"
      style={{
        backgroundColor: theme.colors.surface,
        color: theme.colors.text,
      }}
    >
      {/* HUD Info Tooltip Bubble */}
      <div 
        className="absolute top-2 right-4 px-3 py-1.5 rounded shadow-lg text-[10px] z-10 border flex flex-col gap-0.5 pointer-events-none select-none backdrop-blur-md"
        style={{
          backgroundColor: `${theme.colors.surface}dd`,
          borderColor: theme.colors.accent,
          color: theme.colors.subtext,
          boxShadow: `0 4px 12px rgba(0,0,0,0.5)`,
        }}
      >
        <div className="font-bold text-center border-b pb-0.5 mb-1" style={{ color: theme.colors.accent }}>
          Vim Sandbox Active
        </div>
        <div><strong className="text-white">NORMAL Mode:</strong> <span style={{ color: theme.colors.accent }}>h, j, k, l</span> (Move), <span style={{ color: theme.colors.accent }}>i</span> (Insert), <span style={{ color: theme.colors.accent }}>v</span> (Visual)</div>
        <div><strong className="text-white">INSERT Mode:</strong> Type to edit, <span style={{ color: theme.colors.accent }}>Esc</span> for Normal</div>
        <div><strong className="text-white">VISUAL Mode:</strong> Highlight lines, <span style={{ color: theme.colors.accent }}>Esc</span> for Normal</div>
      </div>

      {/* Editor Main Content Area */}
      <div className="flex-grow overflow-y-auto p-3 scrollbar-thin">
        {editorLines.map((line, idx) => {
          const isCurrentLine = idx === cursorLine;
          const highlightedHtml = getHighlightedContent(line, activeFileName);

          // Custom cursor rendering for the active editing line
          const renderLineWithCursor = () => {
            if (!isCurrentLine || focusedWindow !== "editor") {
              return <span dangerouslySetInnerHTML={{ __html: highlightedHtml }} />;
            }

            const charBeforeCursor = line.slice(0, cursorCol);
            const cursorChar = line[cursorCol] || " ";
            const charAfterCursor = line.slice(cursorCol + 1);

            // Highlight cursor specifically
            const cursorClass =
              mode === "INSERT"
                ? "border-l-2 animate-pulse bg-opacity-30"
                : "bg-opacity-80 font-bold";

            return (
              <span>
                <span dangerouslySetInnerHTML={{ __html: getHighlightedContent(charBeforeCursor, activeFileName) }} />
                <span
                  className={cursorClass}
                  style={{
                    backgroundColor: mode === "INSERT" ? "transparent" : theme.colors.accent,
                    color: mode === "INSERT" ? theme.colors.text : theme.colors.background,
                    borderColor: theme.colors.accent,
                  }}
                >
                  {cursorChar === " " ? "\u00A0" : cursorChar}
                </span>
                <span dangerouslySetInnerHTML={{ __html: getHighlightedContent(charAfterCursor, activeFileName) }} />
              </span>
            );
          };

          return (
            <div
              key={idx}
              className="flex items-center min-h-[1.5rem] leading-relaxed transition-all duration-100"
              style={{
                backgroundColor:
                  isCurrentLine && focusedWindow === "editor"
                    ? `${theme.colors.accent}15`
                    : "transparent",
              }}
            >
              {/* Line Numbers */}
              <span
                className="w-8 text-right pr-3 select-none font-bold"
                style={{
                  color: isCurrentLine ? theme.colors.accent : `${theme.colors.subtext}66`,
                }}
              >
                {idx + 1}
              </span>
              {/* Highlight & Text */}
              <div 
                className="flex-grow font-mono pl-1 select-text"
                style={{
                  color: theme.colors.text,
                }}
              >
                {renderLineWithCursor()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Classic Bottom Status Line */}
      <div
        className="flex items-center justify-between px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-wider shadow-inner"
        style={{
          backgroundColor: theme.colors.green,
          color: theme.colors.background,
        }}
      >
        <div className="flex items-center gap-2">
          <span 
            className="px-2 py-0.5 rounded text-white font-bold"
            style={{
              backgroundColor: theme.colors.accent,
              color: theme.colors.background
            }}
          >
            {mode}
          </span>
          <span className="font-mono">{activeFileName}</span>
          <span className="opacity-70">|</span>
          <span className="opacity-90">LSP: tsserver</span>
        </div>
        
        <div className="flex items-center gap-3 font-mono">
          <span>utf-8</span>
          <span className="opacity-70">|</span>
          <span>ts</span>
          <span className="opacity-70">|</span>
          <span>Tab: 2</span>
          <span className="opacity-70">|</span>
          <span>{getTotalChars()} chars</span>
          <span className="opacity-70">|</span>
          <span>
            {cursorLine + 1}:{cursorCol}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NeovimEditor;
