import { useState, useEffect } from "react";

import { Banner } from "./Banner"
import { Content } from "./Content";
import { Form } from "./Form"
import { ImagePreview } from './ImagePreview';


import { promptContext } from "./Contexts";

function QueryBox() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <ImagePreview />
      <Form />
      <p className=" mt-1 mb-2 text-xs ">Upload images for better recommendations.</p>
    </div>
  );
}



function App() {
  const [images, setImages] = useState([]);
  const [prompt, setPrompt] = useState("")

  function addImagesToState(fileArray) {
    setImages(prevImages => {
      return [...prevImages, ...Array.from(fileArray).map((file, index) => {
        return {
          key: crypto.randomUUID(),
          size: file.size,
          url: URL.createObjectURL(file)
        }
      })]
    })
  }

  function removeImageFromState(removeKey) {
    setImages((images) => {
      return images.filter(image => {
        if (image.key == removeKey) URL.revokeObjectURL(image.url);
        return image.key != removeKey;
      })
    })
  }

  return (
    <div className="flex flex-col h-screen items-center justify-end">
      <Banner />
      <div className="flex flex-col h-screen w-3/5 items-center justify-end">
        <Content />
        <promptContext.Provider value={{ addImagesToState, removeImageFromState, images, setImages, prompt, setPrompt }}>
          <QueryBox />
        </promptContext.Provider>
      </div>
    </div >
  );
}

export default App
