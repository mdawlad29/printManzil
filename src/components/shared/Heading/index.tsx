import React from "react";

const Heading = ({ title }: { title: string }) => {
  return <h1 className="mb-2 text-lg font-semibold text-cyan-600">{title}</h1>;
};

export default Heading;
