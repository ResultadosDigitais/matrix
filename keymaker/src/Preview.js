import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Preview = ({ config, onChange }) => (
  <ReactQuill
    theme="snow"
    value={config.value}
    onChange={(content, delta, source, editor) => {
      onChange({
        value: content,
        text: editor.getText(content),
      });
    }}
    modules={{
      syntax: true,
      toolbar: false,
    }}
  />
);

export default Preview;
