import React, { useContext } from "react";
import { Navbar } from "../components/Navbar";
import { Section } from "../components/Section";
import useEditorContext, { EditorContext } from "../context/editor-context";

export default function Homepage() {
  const { data, setData } = useEditorContext();
  return (
    <div>
      <Navbar />
      <Section />
    </div>
  );
}
