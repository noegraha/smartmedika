import React from "react";

const ReadCurrentURL = () => {
  const currentURL = new URL(window.location.href);
  const host = currentURL.host;
  const path = currentURL.pathname;
  const queryParameters = currentURL.search;

  console.log("Host:", host);
  console.log("Path:", path);
  console.log("Query Parameters:", queryParameters);
  return (
    <div>
      "Host:", {host}
      "Path:", {path}
      "Parameters:", {queryParameters}
    </div>
  );
};

export default ReadCurrentURL;
