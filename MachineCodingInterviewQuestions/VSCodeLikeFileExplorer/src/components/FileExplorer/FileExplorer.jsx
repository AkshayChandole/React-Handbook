import { useState } from "react";
import "./FileExplorer.css";

const FileExplorer = ({
  node,
  onAdd,
  onRename,
  onDelete,
  searchQuery,
  searchFileExplorer,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [newItemName, setNewItemName] = useState("");
  const [addingType, setAddingType] = useState(null);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(node.name);

  const handleAdd = () => {
    if (newItemName.trim()) {
      onAdd(node.id, newItemName, addingType);
      setNewItemName("");
      setAddingType(null);
    }
  };

  const handleRename = () => {
    if (renameValue.trim()) {
      onRename(node.id, renameValue);
      setIsRenaming(false);
    }
  };

  const isMatch =
    searchQuery && node.name.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    <div className={`file-explorer-container ${isMatch ? "highlight" : ""}`}>
      {isRenaming ? (
        <input
          type="text"
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleRename()}
          onBlur={handleRename}
          autoFocus
        />
      ) : (
        <div className={`file-item ${node.type}`}>
          {node.type === "folder" && (
            <button
              className="expand-collapse-btn"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "➖" : "➕"}
            </button>
          )}
          {node.type === "folder" ? (isExpanded ? "📂" : "📁") : "📄"}{" "}
          {node.name}
          <button className="rename-btn" onClick={() => setIsRenaming(true)}>
            ✏️
          </button>
          <button className="delete-btn" onClick={() => onDelete(node.id)}>
            🗑️
          </button>
        </div>
      )}

      {isExpanded && node.children && searchFileExplorer(node, searchQuery) && (
        <div className="children-container">
          {node.children.map((child) => (
            <FileExplorer
              key={child.id}
              node={child}
              onAdd={onAdd}
              onRename={onRename}
              onDelete={onDelete}
              searchQuery={searchQuery}
              searchFileExplorer={searchFileExplorer}
            />
          ))}
        </div>
      )}

      {isExpanded && node.type === "folder" && (
        <div className="add-item-container">
          {addingType && (
            <input
              type="text"
              placeholder={`Enter ${addingType} name`}
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
          )}
          {!addingType && (
            <>
              <button onClick={() => setAddingType("file")}>+ File</button>
              <button onClick={() => setAddingType("folder")}>+ Folder</button>
            </>
          )}
          {addingType && (
            <>
              <button onClick={handleAdd}>Add</button>
              <button onClick={() => setAddingType(null)}>Cancel</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
