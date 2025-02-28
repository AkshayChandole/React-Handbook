import { useState } from "react";
import FileExplorer from "./components/FileExplorer/FileExplorer";
import fileData from "./data/fileData";
import "./styles.css";

export default function App() {
  const [fileStructure, setFileStructure] = useState(fileData);

  const addItem = (parentId, name, type) => {
    const addRecursive = (node) => {
      if (node.id === parentId && node.type === "folder") {
        node.children.push({
          id: Date.now().toString(),
          name,
          type,
          children: type === "folder" ? [] : undefined,
        });
      } else if (node.children) {
        node.children.forEach(addRecursive);
      }
    };

    const newStructure = { ...fileStructure };
    addRecursive(newStructure);
    setFileStructure(newStructure);
  };

  const renameItem = (id, newName) => {
    const renameRecursive = (node) => {
      if (node.id === id) {
        node.name = newName;
      } else if (node.children) {
        node.children.forEach(renameRecursive);
      }
    };

    const newStructure = { ...fileStructure };
    renameRecursive(newStructure);
    setFileStructure(newStructure);
  };

  return (
    <div className="App">
      <h1>VSCode File Explorer</h1>
      <div className="file-explorer-component">
        <FileExplorer
          node={fileStructure}
          onAdd={addItem}
          onRename={renameItem}
        />
      </div>
    </div>
  );
}
