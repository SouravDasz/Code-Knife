import Editor from "@monaco-editor/react";
import { LoaderCircle } from "lucide-react";

const languages = {
  js: "javascript", jsx: "javascript", ts: "typescript", tsx: "typescript",
  py: "python", html: "html", css: "css", json: "json", md: "markdown",
  yml: "yaml", yaml: "yaml", java: "java", go: "go", rs: "rust",
};

const getLanguage = (name) =>
  languages[name.split(".").pop()?.toLowerCase()] || "plaintext";

const CodeEditor = ({ file, content, loading, error }) => {
  if (!file) {
    return (
      <section className="flex min-h-0 flex-1 items-center justify-center bg-[#1e1e1e] text-sm text-slate-500">
        Select a file to view its content
      </section>
    );
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col bg-[#1e1e1e]">
      <header className="border-b border-slate-700 bg-[#252526] px-4 py-3">
        <p className="text-sm font-medium text-slate-200">{file.name}</p>
        <p className="mt-1 truncate text-xs text-slate-500">{file.path}</p>
      </header>
      {loading ? (
        <div className="flex flex-1 items-center justify-center gap-2 text-sm text-slate-400">
          <LoaderCircle className="h-4 w-4 animate-spin" />
          Loading file...
        </div>
      ) : error ? (
        <div className="m-6 rounded-lg border border-red-900/60 bg-red-950/30 p-4 text-sm text-red-300">
          {error}
        </div>
      ) : (
        <Editor
          height="100%"
          language={getLanguage(file.name)}
          value={content}
          theme="vs-dark"
          options={{ readOnly: true, minimap: { enabled: false }, wordWrap: "on", scrollBeyondLastLine: false }}
        />
      )}
    </section>
  );
};

export default CodeEditor;
