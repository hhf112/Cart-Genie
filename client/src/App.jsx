import { ContentWindow } from "./ContentWindow";
import { QueryBox } from "./QueryBox";
import { useState } from "react";

function App() {
  const [images, modifyImages] = useState([]);
  const [prompt, setPrompt] = useState("");

  return (
    <div className="flex flex-col h-screen items-center justify-end">
      <div className="flex flex-col h-screen w-3/5 items-center justify-end">
        <ContentWindow images={images} modifyImages={modifyImages} className="justify-stretch" />
        <QueryBox images={images} modifyImages={modifyImages} prompt={prompt} setPrompt={setPrompt} />
      </div>
    </div>
  );
}

export default App
