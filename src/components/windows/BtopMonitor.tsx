// src/components/windows/BtopMonitor.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useWorkspace } from "@/contexts/WorkspaceContext";

interface Process {
  pid: number;
  name: string;
  cpu: number;
  mem: number;
}

const BtopMonitor = () => {
  const { theme } = useTheme();
  const { setFocusedWindow } = useWorkspace();
  const [cpuUsage, setCpuUsage] = useState(35);
  const [cpuHistory, setCpuHistory] = useState<number[]>([25, 30, 45, 40, 35, 50, 55, 30, 35, 40, 50, 45, 35, 38]);
  const [memUsage, setMemUsage] = useState(48); // % of 16.0 GB
  const [processes, setProcesses] = useState<Process[]>([
    { pid: 1421, name: "hyprland", cpu: 14.5, mem: 4.8 },
    { pid: 2843, name: "kitty", cpu: 8.2, mem: 2.1 },
    { pid: 3105, name: "nvim", cpu: 12.3, mem: 3.5 },
    { pid: 4890, name: "ranger", cpu: 1.1, mem: 0.9 },
    { pid: 5612, name: "node", cpu: 6.4, mem: 5.2 },
    { pid: 6184, name: "waybar", cpu: 2.5, mem: 0.8 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate CPU
      const newCpu = Math.max(10, Math.min(95, Math.round(35 + (Math.random() - 0.5) * 35)));
      setCpuUsage(newCpu);
      setCpuHistory((prev) => {
        const nextHist = [...prev.slice(1), newCpu];
        return nextHist;
      });

      // Simulate Memory
      setMemUsage((prev) => Math.max(30, Math.min(85, Math.round(prev + (Math.random() - 0.5) * 4))));

      // Simulate Processes
      setProcesses((prev) =>
        prev.map((proc) => {
          let cpuDelta = (Math.random() - 0.5) * 6;
          // nvim or hyprland have spikes
          if (proc.name === "nvim" && Math.random() > 0.7) cpuDelta = (Math.random() - 0.3) * 12;
          return {
            ...proc,
            cpu: Math.max(0.1, Math.min(60, parseFloat((proc.cpu + cpuDelta).toFixed(1)))),
            mem: Math.max(0.1, Math.min(15, parseFloat((proc.mem + (Math.random() - 0.5) * 0.4).toFixed(1)))),
          };
        })
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Map values 0-100 to Unicode block character levels
  const getAsciiBar = (value: number) => {
    const blocks = [" ", " ", "▂", "▃", "▄", "▅", "▆", "▇", "█"];
    const index = Math.min(8, Math.max(0, Math.floor(value / 12)));
    return blocks[index];
  };

  const renderSparkline = () => {
    return cpuHistory.map((val, idx) => (
      <span 
        key={idx} 
        style={{ 
          color: val > 75 ? "#f38ba8" : val > 50 ? theme.colors.accent : theme.colors.green 
        }}
      >
        {getAsciiBar(val)}
      </span>
    ));
  };

  const renderProgressBar = (percentage: number) => {
    const width = 20;
    const filled = Math.round((percentage / 100) * width);
    const empty = width - filled;
    return (
      <span className="font-mono text-sm leading-none flex items-center">
        [
        <span style={{ color: theme.colors.green }}>
          {"█".repeat(filled)}
        </span>
        <span className="opacity-20" style={{ color: theme.colors.subtext }}>
          {"░".repeat(empty)}
        </span>
        ]
      </span>
    );
  };

  return (
    <div
      className="h-full w-full flex flex-col font-mono text-[11px] p-3 overflow-hidden select-none bg-opacity-95"
      style={{ color: theme.colors.text }}
      onClick={() => setFocusedWindow("btop")}
    >
      {/* Header telemetry row */}
      <div 
        className="flex items-center justify-between pb-1.5 mb-2 border-b text-[10px]"
        style={{ borderColor: `${theme.colors.border}44` }}
      >
        <span className="font-bold uppercase tracking-wider" style={{ color: theme.colors.accent }}>
          Btop++ Telemetry Monitor
        </span>
        <span className="opacity-60">Uptime: 42m | Tasks: 62 active</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* CPU Box widget */}
        <div 
          className="border p-2 rounded flex flex-col gap-1.5"
          style={{ borderColor: `${theme.colors.border}44`, backgroundColor: `${theme.colors.surface}44` }}
        >
          <div className="flex justify-between font-bold">
            <span style={{ color: theme.colors.accent }}>CPU LOAD</span>
            <span style={{ color: cpuUsage > 70 ? "#f38ba8" : theme.colors.text }}>{cpuUsage}%</span>
          </div>
          <div className="flex items-center gap-1">
            {renderProgressBar(cpuUsage)}
          </div>
          <div className="text-[12px] tracking-wide flex items-center justify-between mt-1 pt-1 border-t border-dashed border-gray-700">
            <span className="text-[9px] opacity-50 uppercase">History:</span>
            <div className="font-mono text-[14px] flex h-5 items-end leading-none gap-[1px]">
              {renderSparkline()}
            </div>
          </div>
        </div>

        {/* RAM Box widget */}
        <div 
          className="border p-2 rounded flex flex-col gap-1.5"
          style={{ borderColor: `${theme.colors.border}44`, backgroundColor: `${theme.colors.surface}44` }}
        >
          <div className="flex justify-between font-bold">
            <span style={{ color: theme.colors.accent }}>RAM USAGE</span>
            <span>{((memUsage / 100) * 16.0).toFixed(2)} / 16.0 GB</span>
          </div>
          <div className="flex items-center gap-1">
            {renderProgressBar(memUsage)}
          </div>
          <div className="flex justify-between text-[9px] opacity-50 uppercase mt-1 pt-1 border-t border-dashed border-gray-700">
            <span>Buffer: 1.4 GB</span>
            <span>Free: {((1 - memUsage / 100) * 16.0).toFixed(1)} GB</span>
          </div>
        </div>
      </div>

      {/* Processes log list table */}
      <div className="flex-grow flex flex-col overflow-hidden">
        <div 
          className="grid grid-cols-4 font-bold border-b pb-1 mb-1 text-[10px]"
          style={{ borderColor: `${theme.colors.border}44`, color: theme.colors.accent }}
        >
          <span>PID</span>
          <span>NAME</span>
          <span className="text-right">CPU%</span>
          <span className="text-right">MEM%</span>
        </div>
        
        <div className="flex-grow overflow-y-auto pr-1 scrollbar-thin">
          {processes
            .sort((a, b) => b.cpu - a.cpu)
            .map((proc) => (
              <div 
                key={proc.pid} 
                className="grid grid-cols-4 py-0.5 text-gray-300 hover:bg-white hover:bg-opacity-5 rounded"
                style={{ color: theme.colors.text }}
              >
                <span className="opacity-60">{proc.pid}</span>
                <span className="font-semibold truncate">{proc.name}</span>
                <span className="text-right font-mono" style={{ color: proc.cpu > 20 ? theme.colors.accent : "inherit" }}>
                  {proc.cpu.toFixed(1)}%
                </span>
                <span className="text-right opacity-80">{proc.mem.toFixed(1)}%</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BtopMonitor;
