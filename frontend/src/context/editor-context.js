import React, { createContext, useContext, useState } from "react";

// Create the context
export const EditorContext = createContext();

// Create a provider component
export const EditorProvider = ({ children }) => {
  const [data, setData] = useState("Some initial data");

  return (
    <EditorContext.Provider value={{ data, setData }}>
      {children}
    </EditorContext.Provider>
  );
};

const useEditorContext = () => useContext(EditorContext);

export default useEditorContext;
