import { useState } from "react";
import "./FileExplorer.css";

const FileExplorer = ({ node, onAdd, onRename }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [newItemName, setNewItemName] = useState("");
  const [addingType, setAddingType] = useState(null); // 'file' or 'folder'
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(node.name);

  const handleAdd = () => {
    if (newItemName.trim()) {
      onAdd(node.id, newItemName, addingType);
      setNewItemName("");
      setAddingType(null);
    }
  };

  const handleCancelAdd = () => {
    setNewItemName("");
    setAddingType(null);
  };

  const handleRename = () => {
    if (renameValue.trim()) {
      onRename(node.id, renameValue);
      setIsRenaming(false);
    }
  };

  return (
    <div className="file-explorer-container">
      {/* Folder Toggle / File Display */}
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
        <div
          className="file-item"
          onClick={() => node.type === "folder" && setIsExpanded(!isExpanded)}
        >
          {node.type === "folder" ? (
            <span className="folder-icon">{isExpanded ? "▼" : "▶"} 📂 </span>
          ) : (
            "📄"
          )}
          {node.name}
          <button
            className="rename-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsRenaming(true);
            }}
          >
            ✏️
          </button>
        </div>
      )}

      {/* Render children if expanded */}
      {isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <FileExplorer
              key={child.id}
              node={child}
              onAdd={onAdd}
              onRename={onRename}
            />
          ))}
        </div>
      )}

      {/* Add File/Folder Input */}
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
              <button onClick={handleCancelAdd}>Cancel</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
