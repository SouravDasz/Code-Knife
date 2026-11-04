import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  File,
  FileCode2,
  FileText,
  Folder,
  FolderOpen,
} from "lucide-react";

const getIcon = (name, folder, expanded) => {
  if (folder) return expanded ? FolderOpen : Folder;
  const extension = name.split(".").pop()?.toLowerCase();
  if (["js", "jsx", "ts", "tsx", "py", "java", "go", "rs", "css", "html"].includes(extension)) {
    return FileCode2;
  }
  if (["md", "txt", "json", "yml", "yaml", "xml"].includes(extension)) {
    return FileText;
  }
  return File;
};

const ExplorerNode = ({ node, path, level, selectedPath, onFileSelect }) => {
  const folder = node.type === "folder";
  const [expanded, setExpanded] = useState(level === 0);
  const Icon = getIcon(node.name, folder, expanded);

  return (
    <li>
      <button
        type="button"
        className={`flex w-full items-center gap-2 py-1.5 pr-3 text-left text-sm ${
          selectedPath === path
            ? "bg-blue-600/30 text-blue-100"
            : "text-slate-300 hover:bg-slate-800"
        }`}
        style={{ paddingLeft: `${level * 1.1 + 0.75}rem` }}
        onClick={() => {
          if (folder) setExpanded((value) => !value);
          else if (selectedPath !== path) onFileSelect({ node, path });
        }}
        aria-expanded={folder ? expanded : undefined}
      >
        {folder ? (
          expanded ? (
            <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
          ) : (
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
          )
        ) : (
          <span className="h-4 w-4 shrink-0" />
        )}
        <Icon className={`h-4 w-4 shrink-0 ${folder ? "text-sky-400" : "text-slate-400"}`} />
        <span className="min-w-0 truncate">{node.name}</span>
      </button>
      {folder && expanded && node.children?.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <ExplorerNode
              key={`${path}/${child.name}`}
              node={child}
              path={`${path}/${child.name}`}
              level={level + 1}
              selectedPath={selectedPath}
              onFileSelect={onFileSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const FileExplorer = ({ tree = [], selectedPath, onFileSelect }) => (
  <aside className="flex min-h-0 w-full flex-col border-b border-slate-700 bg-[#1e1e1e] md:w-72 md:border-b-0 md:border-r">
    <div className="border-b border-slate-700 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
      Files
    </div>
    <div className="min-h-0 flex-1 overflow-y-auto py-2">
      <ul>
        {tree.map((node) => (
          <ExplorerNode
            key={node.name}
            node={node}
            path={node.name}
            level={0}
            selectedPath={selectedPath}
            onFileSelect={onFileSelect}
          />
        ))}
      </ul>
    </div>
  </aside>
);

export default FileExplorer;
