const fileData = {
  id: "root",
  name: "ReactMachineCodingProject",
  type: "folder",
  children: [
    {
      id: "1",
      name: "public",
      type: "folder",
      children: [{ id: "2", name: "index.html", type: "file" }],
    },
    {
      id: "3",
      name: "src",
      type: "folder",
      children: [
        {
          id: "4",
          name: "data",
          type: "folder",
          children: [{ id: "5", name: "fileData.js", type: "file" }],
        },
        { id: "6", name: "App.js", type: "file" },
        { id: "7", name: "index.js", type: "file" },
        { id: "8", name: "styles.css", type: "file" },
      ],
    },
    { id: "9", name: "package.json", type: "file" },
  ],
};

export default fileData;
