// src/lib/commands/cowsay.ts
export const cowsay = (message: string = "Moo!") => {
    const cow = `
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
    `;
    return `<pre>${message}\n${cow}</pre>`;
};
