// src/lib/commands/neofetch.ts
export const neofetch = (theme: any) => {
    const logo = `<pre style="color: ${theme.colors.accent}; margin: 0; font-family: monospace; line-height: 1.15;">
      /\\
     /  \\
    /\\   \\
   /  ..  \\
  /  '  '  \\
 /   ..    \\
/__________\\</pre>`;

    return `<div class="flex gap-5 items-start">
${logo}
<div style="font-family: monospace; line-height: 1.4;">
<p><span style="color: ${theme.colors.accent}; font-weight: bold;">leela@portfolio</span></p>
<p style="margin: 0; opacity: 0.5;">------------------</p>
<p><strong>OS:</strong> Arch Linux x86_64</p>
<p><strong>Host:</strong> Amrita CSE Workstation</p>
<p><strong>Kernel:</strong> 6.12.1-arch1-1</p>
<p><strong>Uptime:</strong> 1 hour, 45 mins</p>
<p><strong>Shell:</strong> zsh 5.9</p>
<p><strong>DE:</strong> Hyprland (Wayland)</p>
<p><strong>WM:</strong> i3wm (Tiled)</p>
<p><strong>Terminal:</strong> Kitty</p>
<p><strong>CPU:</strong> AMD Ryzen 7 7840HS @ 3.8GHz</p>
<p><strong>Memory:</strong> 16GiB DDR5</p>
</div>
</div>`;
};
