import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { saveAs } from "file-saver";
import "./MarkdownEditor.css";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("# Welcome to the Markdown Editor");
  const [theme, setTheme] = useState("light");

  // Handle theme switch
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Save as README.md
  const saveAsFile = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    saveAs(blob, "README.md");
  };

  return (
    <div className={`markdown-editor ${theme}`}>
      <div className="editor-header">
        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </button>
        <button onClick={saveAsFile}>Download as README.md</button>
      </div>
      <div className="editor-container">
        <textarea
          className="editor-textarea"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Write your Markdown here..."
        />
        <div className="editor-preview">
          <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
