const Component = ({ node }) => {
  return (
    <div style={{ border: "5px solid darkblue" }}>
      <p>I'm a Component exposed from container B!</p>
    </div>
  );
};

const renderers = {
  div: {
    "div[class=custom]": Component,
  },
};

export default renderers;
