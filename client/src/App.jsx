import { useState } from "react";
import { useEffect } from "react";

import { QueryBox } from "./QueryBox";
import { Banner } from "./Banner"
import { Content } from "./Content";

function App() {
  const [images, modifyImages] = useState([]);

  const [prompt, setPrompt] = useState(() => {
    const checkCache = JSON.parse(localStorage.getItem("PROMPT"));
    return checkCache || "";
  });

  useEffect(() => {
    localStorage.setItem("PROMPT", JSON.stringify(prompt));
  }, [prompt])



  return (
    <div className="flex flex-col h-screen items-center justify-end">
      <Banner />
      <div className="flex flex-col h-screen w-3/5 items-center justify-end">
        <Content />
        <QueryBox images={images} modifyImages={modifyImages} prompt={prompt} setPrompt={setPrompt} />
      </div>
    </div>
  );
}

export default App
