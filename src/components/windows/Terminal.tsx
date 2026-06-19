// src/components/windows/Terminal.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { useTheme, themes } from "@/contexts/ThemeContext";
import { help } from "@/lib/commands/help";
import { neofetch } from "@/lib/commands/neofetch";
import { skills } from "@/lib/commands/skills";
import { projects } from "@/lib/commands/projects";
import { cowsay } from "@/lib/commands/cowsay";

interface TerminalLine {
  text: string;
  isHtml?: boolean;
}

const Terminal = () => {
  const { theme, themeName, setTheme } = useTheme();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "Welcome to Leela's Portfolio!" },
    { text: "Type <span class='text-purple-400' style='color: " + theme.colors.accent + "'>help</span> to see available commands.", isHtml: true },
    { text: " " },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isQuerying, setIsQuerying] = useState(false);
  const [spinnerIndex, setSpinnerIndex] = useState(0);

  const endOfHistoryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Spinner animation frames
  const spinnerFrames = ["▖", "▘", "▝", "▗"];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isQuerying) {
      timer = setInterval(() => {
        setSpinnerIndex((prev) => (prev + 1) % spinnerFrames.length);
      }, 150);
    }
    return () => clearInterval(timer);
  }, [isQuerying]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCommand = async (commandLine: string) => {
    const trimmed = commandLine.trim();
    if (!trimmed) {
      setHistory((prev) => [...prev, { text: `$ ${commandLine}` }]);
      return;
    }

    setCommandHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const [cmd, ...args] = trimmed.split(/\s+/);
    const lowercaseCmd = cmd.toLowerCase();

    // Echo the command typed
    const promptLine = `<span style="color: ${theme.colors.accent}">user@portfolio</span>:<span style="color: ${theme.colors.green}">~</span>$ ${commandLine}`;
    setHistory((prev) => [...prev, { text: promptLine, isHtml: true }]);

    let output = "";
    let isHtml = true;

    switch (lowercaseCmd) {
      case "help":
        output = help();
        break;
      case "neofetch":
        output = neofetch(theme);
        break;
      case "skills":
        output = skills(theme);
        break;
      case "projects":
        // Injects theme accent colors into projects formatting
        const rawProj = projects();
        output = rawProj.replaceAll('class="text-blue-400', `style="color: ${theme.colors.accent}" class="hover:underline`);
        break;
      case "about":
        output = `<div style="color: ${theme.colors.text}"><p style="color: ${theme.colors.accent}; font-weight: bold; border-bottom: 1px dashed ${theme.colors.border}; padding-bottom: 4px; margin: 0;">USER PROFILE: LML👀</p><p style="margin: 6px 0 0 0;"><strong>Bio:</strong> Engineer • Software dev • Open Source<br/>I like building things from scratch — shipping small, fast, understandable code.</p><p style="margin: 4px 0 0 0;"><strong>Education:</strong> Amrita Vishwa Vidyapeetham | Aug 2023 - Present</p><p style="margin: 4px 0 0 0;"><strong>Location:</strong> Coimbatore, Tamil Nadu, India</p><p style="color: ${theme.colors.accent}; font-weight: bold; margin-top: 8px; border-bottom: 1px dashed ${theme.colors.border}; padding-bottom: 2px;">SOCIALS & PROFILES:</p><p style="margin: 4px 0 0 0;">- Email: <a href="mailto:leela592023@gmail.com" class="hover:underline" style="color: ${theme.colors.accent}">leela592023@gmail.com</a></p><p style="margin: 2px 0 0 0;">- GitHub: <a href="https://github.com/Leela0o5" target="_blank" class="hover:underline" style="color: ${theme.colors.accent}">github.com/Leela0o5</a></p><p style="margin: 2px 0 0 0;">- LinkedIn: <a href="http://www.linkedin.com/in/leela-m-336334301" target="_blank" class="hover:underline" style="color: ${theme.colors.accent}">linkedin.com/in/leela-m-336334301</a></p><p style="margin: 2px 0 0 0;">- LeetCode: <a href="https://leetcode.com/u/leela592023" target="_blank" class="hover:underline" style="color: ${theme.colors.accent}">leetcode.com/u/leela592023</a></p><p style="margin: 2px 0 0 0;">- Codeforces: <a href="https://codeforces.com/profile/leela592023" target="_blank" class="hover:underline" style="color: ${theme.colors.accent}">codeforces.com/profile/leela592023</a></p><p style="margin: 2px 0 0 0;">- CodeChef: <a href="https://www.codechef.com/users/leela592023" target="_blank" class="hover:underline" style="color: ${theme.colors.accent}">codechef.com/users/leela592023</a></p><p style="margin: 2px 0 0 0;">- X (Twitter): <a href="https://x.com/@Leela679698" target="_blank" class="hover:underline" style="color: ${theme.colors.accent}">x.com/@Leela679698</a></p></div>`;
        break;
      case "experience":
        output = `<div style="color: ${theme.colors.text}"><p style="color: ${theme.colors.accent}; font-weight: bold; border-bottom: 1px dashed ${theme.colors.border}; padding-bottom: 4px; margin: 0;">WORK EXPERIENCE TIMELINE</p><div style="margin-top: 6px;"><p style="color: ${theme.colors.green}; font-weight: bold; margin: 0;">Vice Chair & Frontend Developer | ACM Student Chapter (Feb 2025 - Mar 2026)</p><p style="margin: 2px 0 0 12px; opacity: 0.85;">- Contributed frontend features to the <a href="https://github.com/Infinite-Sum-Games/platform.soc" target="_blank" class="hover:underline" style="color: ${theme.colors.accent}; font-weight: bold;">Amrita Season of Code platform</a> using Next.js, TypeScript, and Tailwind CSS (7+ merged commits).</p><p style="margin: 2px 0 0 12px; opacity: 0.85;">- Organized workshops, hackathons, and technical events for 100+ students.</p></div><div style="margin-top: 6px;"><p style="color: ${theme.colors.green}; font-weight: bold; margin: 0;">Open Source Contributor | Amrita Winter of Code (Dec 2024 - Jan 2025)</p><p style="margin: 2px 0 0 12px; opacity: 0.85;">- Contributed to community repositories using Git workflows, issue tracking, and PR reviews.</p></div></div>`;
        break;
      case "achievements":
        output = `<div style="color: ${theme.colors.text}"><p style="color: ${theme.colors.accent}; font-weight: bold; border-bottom: 1px dashed ${theme.colors.border}; padding-bottom: 4px; margin: 0;">ACADEMIC & CODING ACHIEVEMENTS</p><p style="margin: 6px 0 0 0;">- <strong>Hackathon Finalist (Top 50)</strong>: Developed ArbiChain, an MCP BNB Chain arbitrage agent using LangGraph. Repo: <a href="https://github.com/Leela0o5/ArbiChain" target="_blank" class="hover:underline" style="color: ${theme.colors.accent}">github.com/Leela0o5/ArbiChain</a></p><p style="margin: 3px 0 0 0;">- <strong>NPTEL Course Topper</strong>: Top rank in "Introduction to Machine Learning" from IIT Kharagpur.</p><p style="margin: 3px 0 0 0;">- <strong>HackerRank 5-Star coder</strong>: Certified 5-Star programmer in Java.</p><p style="margin: 3px 0 0 0;">- <strong>NSS Volunteer</strong>: Active member of Amrita School of Computing NSS chapter.</p></div>`;
        break;
      case "cowsay":
        output = cowsay(args.join(" ") || "Moo!");
        break;
      case "clear":
        setHistory([
          { text: "Welcome to Leela's Portfolio!" },
          { text: "Type <span class='text-purple-400' style='color: " + theme.colors.accent + "'>help</span> to see available commands.", isHtml: true },
          { text: " " },
        ]);
        return;
      default:
        output = `zsh: command not found: ${cmd}. Type <span style="color: ${theme.colors.accent}">help</span> to see available diagnostics.`;
    }

    setHistory((prev) => [...prev, { text: output, isHtml }]);
  };

  // Live updates the spinner in terminal history if querying
  useEffect(() => {
    if (isQuerying && history.length > 0) {
      setHistory((prev) => {
        const copy = [...prev];
        const lastIndex = copy.length - 1;
        if (copy[lastIndex].text.includes("Querying rice-daemon")) {
          copy[lastIndex] = {
            text: `<span style="color: ${theme.colors.accent}">[${spinnerFrames[spinnerIndex]}]</span> Querying rice-daemon AI...`,
            isHtml: true
          };
        }
        return copy;
      });
    }
  }, [spinnerIndex, isQuerying]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full p-4 font-mono text-[13px] flex flex-col overflow-hidden bg-opacity-95"
      style={{
        backgroundColor: theme.colors.surface,
        color: theme.colors.text,
      }}
      onClick={() => document.getElementById("terminal-input")?.focus()}
    >
      {/* Kitty Window Header */}
      <div className="flex-grow overflow-y-auto pr-1 select-text scrollbar-thin">
        {history.map((line, index) => (
          <div key={index} className="mb-1 leading-relaxed whitespace-pre-wrap">
            {line.isHtml ? (
              <span dangerouslySetInnerHTML={{ __html: line.text }} />
            ) : (
              <span>{line.text}</span>
            )}
          </div>
        ))}
        <div ref={endOfHistoryRef} />
      </div>

      <div className="flex items-center mt-2 border-t pt-2" style={{ borderColor: `${theme.colors.border}44` }}>
        <span style={{ color: theme.colors.accent }} className="font-bold">user@portfolio</span>
        <span className="mx-1 text-gray-500">:</span>
        <span style={{ color: theme.colors.green }}>~</span>
        <span className="mr-2 text-gray-400 font-bold">$</span>
        <input
          id="terminal-input"
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          disabled={isQuerying}
          className="bg-transparent border-none focus:outline-none w-full text-white font-mono"
          style={{ color: theme.colors.text }}
          autoComplete="off"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Terminal;
