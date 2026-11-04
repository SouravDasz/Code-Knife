import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import Nav from "../landing_page/nav";
import FileExplorer from "./FileExplorer";
import CodeEditor from "./CodeEditor";
import { fetchFileContent } from "../../services/file_content";

const readRepository = () => {
  const saved = sessionStorage.getItem("repositoryAnalysis");
  const savedContext = sessionStorage.getItem("repositoryAnalysisContext");
  if (!saved) return null;
  try {
    const data = JSON.parse(saved);
    const context = savedContext ? JSON.parse(savedContext) : {};
    return {
      ...data,
      owner: data.owner || context.owner,
      repo: data.repo || data.repository || context.repo,
      branch: data.branch || data.default_branch || context.branch,
    };
  } catch {
    return null;
  }
};

const CodeBrowser = () => {
  const [repository, setRepository] = useState(null);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const requestRef = useRef(null);

  useEffect(() => {
    setRepository(readRepository());
  }, []);

  const selectFile = async ({ node, path }) => {
    if (!repository?.owner || !repository.repo || !repository.branch) {
      setFile({ name: node.name, path });
      setError("Repository owner, name, or branch is missing from the analysis data.");
      return;
    }

    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setFile({ name: node.name, path });
    setContent("");
    setError("");
    setLoading(true);

    try {
      const result = await fetchFileContent(
        { owner: repository.owner, repo: repository.repo, branch: repository.branch, path },
        { signal: controller.signal }
      );
      if (!controller.signal.aborted) setContent(result.content || "");
    } catch (requestError) {
      if (requestError.name !== "AbortError" && !controller.signal.aborted) {
        setError(requestError.message || "Unable to load this file.");
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  };

  if (!repository) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Nav />
        <main className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h1 className="text-2xl font-bold">No repository analysis found</h1>
          <p className="mt-2 text-slate-500">Analyze a repository before opening File Explorer.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e]">
      <Nav />
      <header className="flex items-center gap-4 border-b border-slate-700 bg-[#252526] px-4 py-3 text-slate-100">
        <Link to="/repository/results" className="rounded p-1 hover:bg-slate-700" aria-label="Back to repository explorer">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <Code2 className="h-5 w-5 text-sky-400" />
        <div>
          <h1 className="font-semibold">{repository.repo}</h1>
          <p className="text-xs text-slate-400">{repository.branch || "Branch unavailable"}</p>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh-145px)] flex-col md:flex-row">
        <FileExplorer tree={repository.tree} selectedPath={file?.path} onFileSelect={selectFile} />
        <CodeEditor file={file} content={content} loading={loading} error={error} />
      </main>
    </div>
  );
};

export default CodeBrowser;
