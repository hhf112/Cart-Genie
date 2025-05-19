import { Uploaded } from "./Uploaded";
import { QueryBox } from "./QueryBox";
import { useState } from "react";
import { Banner } from "./Banner"
import { Content } from "./Content";

function App() {
  const [images, modifyImages] = useState([]);
  const [prompt, setPrompt] = useState("");

  return (
    <div className="flex flex-col h-screen items-center justify-end">
      <Banner />
      <div className="flex flex-col h-screen w-3/5 items-center justify-end">

        <Content/>
        <Uploaded images={images} modifyImages={modifyImages} />
        <QueryBox images={images} modifyImages={modifyImages} prompt={prompt} setPrompt={setPrompt} />
      </div>
    </div>
  );
}

export default App
