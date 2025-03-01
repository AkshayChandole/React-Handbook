import { useState } from "react";
import FileExplorer from "./components/FileExplorer/FileExplorer";
import fileData from "./data/fileData";
import "./styles.css";

const LOCAL_STORAGE_KEY = "fileStructure";

export default function App() {
  const [fileStructure, setFileStructure] = useState(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : fileData;
  });

  const [searchQuery, setSearchQuery] = useState("");

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

  const deleteItem = (id) => {
    const deleteRecursive = (node) => {
      if (!node.children) return node;
      node.children = node.children.filter((child) => child.id !== id);
      node.children.forEach(deleteRecursive);
      return node;
    };

    if (fileStructure.id === id) return; // Prevent deleting root node

    const newStructure = deleteRecursive({ ...fileStructure });
    setFileStructure(newStructure);
  };

  const searchFileExplorer = (node, query) => {
    if (!query) return true; // If no search query, show everything
    return (
      node.name.toLowerCase().includes(query.toLowerCase()) ||
      (node.children &&
        node.children.some((child) => searchFileExplorer(child, query)))
    );
  };

  return (
    <div className="App">
      <h1>VSCode File Explorer</h1>

      <div className="file-explorer-component">
        <input
          type="text"
          placeholder="Search files or folders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <FileExplorer
          node={fileStructure}
          onAdd={addItem}
          onRename={renameItem}
          onDelete={deleteItem}
          isRoot={true}
          searchQuery={searchQuery}
          searchFileExplorer={searchFileExplorer}
        />
      </div>
    </div>
  );
}
