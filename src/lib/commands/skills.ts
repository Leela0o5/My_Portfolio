// src/lib/commands/skills.ts
export const skills = (theme: any) => {
    const categories = [
        {
            title: "Programming Languages",
            skills: [
                { name: "Java", level: 90 },
                { name: "Python", level: 88 },
                { name: "TypeScript", level: 85 },
                { name: "Go", level: 78 },
                { name: "JavaScript", level: 88 }
            ]
        },
        {
            title: "Frameworks & AI Systems",
            skills: [
                { name: "React / Next.js", level: 85 },
                { name: "Node.js / Express", level: 85 },
                { name: "FastAPI / Python", level: 82 },
                { name: "LangChain / Graph", level: 90 },
                { name: "Agentic RAG / MCP", level: 88 }
            ]
        },
        {
            title: "Databases & DevOps Tools",
            skills: [
                { name: "Postgre / MongoDB", level: 80 },
                { name: "ChromaDB / Vector", level: 85 },
                { name: "Redis Caching", level: 75 },
                { name: "Docker / Swagger", level: 80 },
                { name: "Git / Actions CI", level: 82 }
            ]
        }
    ];

    const renderBar = (level: number) => {
        const filled = Math.round(level / 10);
        const empty = 10 - filled;
        return `[<span style="color: ${theme.colors.green};">${"=".repeat(filled)}</span>${"-".repeat(empty)}] ${level}%`;
    };

    return `<div style="font-family: monospace; line-height: 1.45;">${categories.map(cat => `<p style="color: ${theme.colors.accent}; font-weight: bold; margin-top: 6px; margin-bottom: 2px;">${cat.title}:</p>${cat.skills.map(s => `  ${s.name.padEnd(20)} ${renderBar(s.level)}`).join("<br/>")}`).join("")}</div>`;
};
