import React, { useEffect, useState } from "react";
import { FolderTree, GitBranch, Network, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import Nav from "../landing_page/nav";
import FileTree from "../file_tree/File_tree";
import { GraphView, RootedTree } from "../file_tree/Visualizations";

function Results() {
  const [data, setData] = useState(null);
  const [view, setView] = useState("explorer");

  useEffect(() => {
    const saved = sessionStorage.getItem(
      "repositoryAnalysis"
    );

    if (!saved) {
      return;
    }

    try {
      setData(JSON.parse(saved));
    } catch {
      sessionStorage.removeItem("repositoryAnalysis");
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Nav />
        <main className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h1 className="text-2xl font-bold">No repository analysis found</h1>
          <p className="mt-2 text-slate-500">
            Analyze a repository first to view its file tree.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-10 md:px-8">
        <div className="mb-8 flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
          <Link
            to="/repository/results"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm"
          >
            <FolderTree className="h-4 w-4" />
            Repository Explorer
          </Link>
          <Link
            to="/repository/browser"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
          >
            <Code2 className="h-4 w-4" />
            File Explorer
          </Link>
        </div>

        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <span className="rounded-lg bg-blue-100 p-2 text-blue-600">
              <FolderTree className="h-5 w-5" />
            </span>
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
              Repository explorer
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            {data.repository || "Repository"}
          </h1>
          <p className="mt-2 text-slate-500">
            Explore the structure using different visualizations.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
          {[
            ["explorer", FolderTree, "File explorer"],
            ["tree", GitBranch, "Top-down tree"],
            ["graph", Network, "Graph view"],
          ].map(([value, Icon, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setView(value)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                view === value
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {React.createElement(Icon, { className: "h-4 w-4" })}
              {label}
            </button>
          ))}
        </div>

        {view === "explorer" && <FileTree tree={data.tree} />}
        {view === "tree" && <RootedTree tree={data.tree} />}
        {view === "graph" && <GraphView tree={data.tree} />}
      </main>
    </div>
  );
}

export default Results;