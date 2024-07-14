import React, { createContext, useContext, useState } from "react";

// Create the context
export const EditorContext = createContext();

// Create a provider component
export const EditorProvider = ({ children }) => {
  const [data, setData] = useState("Some initial data");
 const [editorData,setEditorData]=useState({
    Heading:"",
    Description:"",
    Footer:"",
    FormName:"",
 })

  return (
    <EditorContext.Provider value={{ data, setData,editorData,setEditorData }}>
      {children}
    </EditorContext.Provider>
  );
};

const useEditorContext = () => useContext(EditorContext);

export default useEditorContext;
