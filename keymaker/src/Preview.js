import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
}));

const Preview = ({ config, onChange }) => {
  const classes = useStyles();

  return (
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
        // toolbar: [["code-block"]],
        toolbar: false,
      }}
    />
  );
};

export default Preview;
