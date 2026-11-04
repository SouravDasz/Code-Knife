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

const getFileIcon = (name) => {
  const extension = name.split(".").pop()?.toLowerCase();

  if (["js", "jsx", "ts", "tsx", "py", "java", "go", "rs", "css", "html"].includes(extension)) {
    return FileCode2;
  }

  if (["md", "txt", "json", "yml", "yaml", "xml"].includes(extension)) {
    return FileText;
  }

  return File;
};

const formatSize = (size) => {
  if (typeof size !== "number") {
    return null;
  }

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const TreeNode = ({ node, level = 0 }) => {
  const isFolder = node.type === "folder";
  const [expanded, setExpanded] = useState(level === 0);
  const size = formatSize(node.size);
  const FileIcon = isFolder
    ? expanded
      ? FolderOpen
      : Folder
    : getFileIcon(node.name);

  return (
    <li>
      <button
        type="button"
        className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
        style={{ paddingLeft: `${level * 1.25 + 0.75}rem` }}
        onClick={() => isFolder && setExpanded((isOpen) => !isOpen)}
        aria-expanded={isFolder ? expanded : undefined}
      >
        {isFolder ? (
          expanded ? (
            <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
          ) : (
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
          )
        ) : (
          <span className="h-4 w-4 shrink-0" />
        )}
        <FileIcon
          className={`h-4 w-4 shrink-0 ${
            isFolder ? "text-blue-500" : "text-slate-500"
          }`}
        />
        <span className="min-w-0 flex-1 truncate">{node.name}</span>
        {size && (
          <span className="text-xs text-slate-400">{size}</span>
        )}
      </button>

      {isFolder && expanded && node.children?.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <TreeNode
              key={`${node.name}/${child.name}`}
              node={child}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const FileTree = ({ tree = [] }) => {
  if (!Array.isArray(tree) || tree.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
        This repository does not contain any files to display.
      </div>
    );
  }

  return (
    <ul className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      {tree.map((node) => (
        <TreeNode key={node.name} node={node} />
      ))}
    </ul>
  );
};

export default FileTree;