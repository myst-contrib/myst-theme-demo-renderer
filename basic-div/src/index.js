import { MyST } from "myst-to-react";

const BlueBorderDiv = ({ node }) => {
  return (
    <div style={{ border: "5px solid darkblue" }}>
      <MyST ast={node.children} />
    </div>
  );
};

const renderers = {
  div: {
    "div[class=blue-border]": BlueBorderDiv,
  },
};

const extension = {
  renderers,
};

export default extension;
