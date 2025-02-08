"use client";
import React from "react";
import { marked } from "marked"; // Import the marked library to convert markdown to HTML

const RenderMarkdown = ({ markdownContent }: { markdownContent: string }) => {
    // Convert the markdown content to HTML
    const htmlContent = marked(markdownContent);

    return (
        <div
            className="prose-base w-[95%]"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
};

export default RenderMarkdown;
