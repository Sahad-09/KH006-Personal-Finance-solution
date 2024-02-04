import React from "react";

const AIresponse = ({ response }) => {
  const res = response.data;
  console.log(res);
  return <div className="response">{res}</div>;
};

export default AIresponse;
