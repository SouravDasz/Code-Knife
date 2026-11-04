import { useMemo, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import {
  File,
  FileCode2,
  FileText,
  Folder,
  FolderOpen,
  GitBranch,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const colors = {
  background: "#F8FAFC",
  panel: "#FFFFFF",
  folderCyan: "#0891B2",
  folderBlue: "#2196D2",
  folderRed: "#F45B64",
  folderGreen: "#4CAF50",
  folderYellow: "#D9A900",
  folderOrange: "#FF9D57",
  fileSky: "#65DDF5",
  fileWhite: "#F1F5F9",
  fileMuted: "#64748B",
  textGreen: "#008A4A",
  connector: "#CBD5E1",
  selected: "#0891B2",
};

const folderColors = [
  colors.folderCyan,
  colors.folderBlue,
  colors.folderRed,
  colors.folderGreen,
  colors.folderYellow,
  colors.folderOrange,
];

const rootColor = colors.folderBlue;
const fileColor = "#FFFFFF";
const graphFileColor = "#94A3B8";
const fileTextColor = "#0F172A";
const folderTextColor = "#172033";
const selectedColor = colors.selected;

const nodePath = (parentPath, name) =>
  parentPath ? `${parentPath}/${name}` : name;

const fileIcon = (name) => {
  const extension = name.split(".").pop()?.toLowerCase();

  if (
    ["js", "jsx", "ts", "tsx", "py", "java", "go", "rs"].includes(extension)
  ) {
    return FileCode2;
  }

  if (
    ["md", "txt", "json", "yml", "yaml", "xml", "css", "html"].includes(
      extension
    )
  ) {
    return FileText;
  }

  return File;
};

const getFolderColor = (path) => {
  let hash = 0;

  for (let index = 0; index < path.length; index += 1) {
    hash = (hash * 31 + path.charCodeAt(index)) | 0;
  }

  return folderColors[Math.abs(hash) % folderColors.length];
};

// --------------------------------------------------
// TREE VIEW
// --------------------------------------------------

const NodeCard = ({ node, path, level, selected, onClick }) => {
  const isFolder = node.type === "folder";
  const hasChildren = isFolder && node.children?.length > 0;

  const Icon = isFolder
    ? hasChildren
      ? Folder
      : FolderOpen
    : fileIcon(node.name);

  const sizes = [
    "px-5 py-3 text-base",
    "px-4 py-2.5 text-sm",
    "px-3 py-2 text-xs",
    "px-2.5 py-1.5 text-xs",
  ];

  const folderColor = getFolderColor(path || node.name);

  const folderStyle = {
    backgroundColor: folderColor,
    borderColor: folderColor,
    color: folderTextColor,
    boxShadow: `0 2px 8px ${folderColor}40`,
  };

  const fileStyle = {
    backgroundColor: fileColor,
    borderColor: "#38BDF8",
    color: fileTextColor,
    boxShadow: "0 0 12px rgba(101, 221, 245, 0.35)",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      title={node.name}
      style={isFolder ? folderStyle : fileStyle}
      className={`
        flex max-w-52 items-center justify-center gap-2
        rounded-xl border font-medium
        transition-all duration-200
        hover:-translate-y-1 hover:brightness-110
        focus:outline-none
        ${sizes[Math.min(level, 3)]}
        ${isFolder ? "" : "border-[#38BDF8] text-[#0F172A] hover:bg-sky-50"}
        ${selected ? "ring-2 ring-cyan-500 ring-offset-2" : ""}
      `}
    >
      <Icon
        className="h-4 w-4 shrink-0"
        style={{ color: isFolder ? folderTextColor : "#1E3A8A" }}
      />
      <span className="truncate">{node.name}</span>
    </button>
  );
};

const TreeBranch = ({ node, path, level, selected, onSelect }) => {
  const [expanded, setExpanded] = useState(level < 1);

  const hasChildren = node.type === "folder" && node.children?.length > 0;

  const handleClick = () => {
    onSelect(path);

    if (hasChildren) {
      setExpanded((value) => !value);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <NodeCard
          node={node}
          path={path}
          level={level}
          selected={selected === path}
          onClick={handleClick}
        />

        {hasChildren && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 shadow-sm">
            {expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </span>
        )}
      </div>

      {hasChildren && expanded && (
        <>
          <div className="h-6 w-px bg-slate-300" />

          <div className="flex items-start gap-5 border-t border-slate-300 pt-5">
            {node.children.map((child) => (
              <TreeBranch
                key={nodePath(path, child.name)}
                node={child}
                path={nodePath(path, child.name)}
                level={level + 1}
                selected={selected}
                onSelect={onSelect}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const EmptyVisualization = ({ message }) => (
  <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
    {message}
  </div>
);

const RootedTree = ({ tree = [] }) => {
  const [selected, setSelected] = useState(null);

  if (!tree.length) {
    return (
      <EmptyVisualization message="This repository has no files to display." />
    );
  }

  return (
    <div className="overflow-auto rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
      <div className="flex min-w-max flex-col items-center">
        <div
          className="flex items-center gap-3 rounded-xl border border-blue-300 px-7 py-4 font-semibold"
          style={{
            backgroundColor: rootColor,
            color: "#FFFFFF",
            boxShadow: "0 2px 8px rgba(33, 150, 210, 0.25)",
          }}
        >
          <GitBranch className="h-5 w-5 text-white" />
          Repository Root
        </div>

        <div className="h-7 w-px bg-slate-300" />

        <div className="flex items-start gap-6 border-t border-slate-300 pt-6">
          {tree.map((node) => (
            <TreeBranch
              key={node.name}
              node={node}
              path={node.name}
              level={1}
              selected={selected}
              onSelect={setSelected}
            />
          ))}
        </div>

        {selected && (
          <p className="mt-8 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs text-cyan-700">
            Selected: {selected}
          </p>
        )}
      </div>
    </div>
  );
};

// --------------------------------------------------
// FORCE-DIRECTED KNOWLEDGE GRAPH
// --------------------------------------------------

const createGraphData = (tree) => {
  const nodes = [];
  const links = [];

  nodes.push({
    id: "repository",
    name: "Repository",
    path: "repository",
    type: "root",
    color: rootColor,
    val: 20,
  });

  const walk = (items, parentId, depth, parentPath) => {
    items.forEach((item) => {
      const path = nodePath(parentPath, item.name);
      const id = path;
      const isFolder = item.type === "folder";

      nodes.push({
        id,
        name: item.name,
        path,
        type: isFolder ? "folder" : "file",
        depth,
        color: isFolder ? getFolderColor(path) : graphFileColor,
        val: isFolder ? Math.max(7, 16 - depth * 2) : 3.5,
      });

      links.push({
        source: parentId,
        target: id,
        relationship: "CONTAINS",
      });

      if (isFolder && item.children?.length) {
        walk(item.children, id, depth + 1, path);
      }
    });
  };

  walk(tree, "repository", 1, "");

  return { nodes, links };
};

const GraphView = ({ tree = [] }) => {
  const graphRef = useRef(null);
  const [selected, setSelected] = useState(null);

  const graphData = useMemo(() => createGraphData(tree), [tree]);

  if (!tree.length) {
    return (
      <EmptyVisualization message="This repository has no files to display." />
    );
  }

  const isConnectedToSelected = (link) => {
    if (!selected) return false;

    const source =
      typeof link.source === "object" ? link.source.id : link.source;
    const target =
      typeof link.target === "object" ? link.target.id : link.target;

    return source === selected || target === selected;
  };

  const handleNodeClick = (node) => {
    setSelected(node.id);

    // Move the camera smoothly without restarting the force simulation.
    graphRef.current?.centerAt(node.x, node.y, 300);
    graphRef.current?.zoom(1.5, 300);
  };

  const resetGraph = () => {
    setSelected(null);
    graphRef.current?.zoomToFit(350, 80);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-4">
        <div>
          <h3 className="font-semibold text-slate-800">
            Repository Knowledge Graph
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Interactive force-directed network visualization
          </p>
        </div>

        <button
          type="button"
          onClick={resetGraph}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs text-slate-700 transition hover:bg-slate-50"
        >
          Reset View
        </button>
      </div>

      <div className="relative h-[650px] w-full">
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          width={undefined}
          height={650}
          backgroundColor={colors.background}
          dagMode={null}

          // Use a restrained force animation with a small amount of spring stretch.
          warmupTicks={20}
          cooldownTicks={Infinity}
          cooldownTime={Infinity}
          d3AlphaDecay={0.02}
          d3AlphaMin={0.001}
          d3AlphaTarget={0.015}
          d3VelocityDecay={0.8}
          nodeRelSize={5}
          linkDistance={(link) => {
            const target =
              typeof link.target === "object"
                ? link.target
                : graphData.nodes.find((node) => node.id === link.target);

            return target?.type === "folder" ? 88 : 62;
          }}
          linkWidth={(link) => (isConnectedToSelected(link) ? 1.8 : 1)}
          linkColor={(link) =>
            isConnectedToSelected(link) ? selectedColor : colors.connector
          }
          nodeVal={(node) => node.val}
          nodeColor={(node) => node.color}
          nodeCanvasObjectMode={() => "replace"}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const radius =
              node.type === "root"
                ? 18
                : node.type === "folder"
                  ? Math.max(6, 14 - node.depth * 1.5)
                  : 4;

            const isSelected = selected === node.id;

            // A steady selection ring; no pulsing or continuous animation.
            if (isSelected) {
              ctx.beginPath();
              ctx.arc(node.x, node.y, radius + 4, 0, 2 * Math.PI);
              ctx.strokeStyle = selectedColor;
              ctx.lineWidth = 2;
              ctx.stroke();
            }

            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = node.color;
            ctx.fill();

            ctx.lineWidth = 1;
            ctx.strokeStyle = isSelected ? selectedColor : "#64748B";
            ctx.stroke();

            const fontSize = Math.max(
              3.5,
              node.type === "root" ? 5 : 4 / globalScale
            );

            ctx.font = `500 ${fontSize}px Inter, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillStyle =
              node.type === "file" ? fileTextColor : folderTextColor;

            const label =
              node.name.length > 24
                ? `${node.name.slice(0, 21)}...`
                : node.name;

            ctx.fillText(label, node.x, node.y + radius + 4);
          }}
          onNodeClick={handleNodeClick}
          enableNodeDrag
          enableZoomInteraction
          enablePanInteraction
          minZoom={0.3}
          maxZoom={8}
          autoPauseRedraw={false}
        />
      </div>

      <div className="flex flex-wrap items-center gap-6 border-t border-slate-200 bg-slate-50 px-5 py-4">
        {[
          { label: "Repository", color: rootColor },
          { label: "Folder", color: folderColors[0] },
          { label: "File", color: graphFileColor },
          { label: "Selected", color: selectedColor },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-slate-600">{item.label}</span>
          </div>
        ))}
      </div>

      {selected && (
        <div className="border-t border-slate-200 bg-slate-50 px-5 py-3">
          <p className="text-xs text-cyan-700">Selected node: {selected}</p>
        </div>
      )}
    </div>
  );
};

export { GraphView, RootedTree };
