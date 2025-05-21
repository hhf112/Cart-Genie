import { useState, useEffect } from "react";

import { Banner } from "./Banner"
import { Content } from "./Content";
import { Form } from "./Form"
import { ImagePreview } from './ImagePreview';


import { promptContext } from "./Contexts";
import { flushSync } from "react-dom";

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

  useEffect (()=> {
    console.log(images);

  }, [images])
  function addImagesToState(fileArray) {
    setImages(prevImages => {
      return [...prevImages, ...Array.from(fileArray).map((img) => {
        return {
          file: img, 
          url: URL.createObjectURL(img),
          key: crypto.randomUUID()
        }
      })]
    });

  }


  function removeImageFromState(removeKey) {
    setImages((images) => {
      return images.filter(image => {
        if (image.key == removeKey) URL.revokeObjectURL(image.url);
        return image.key != removeKey;
      })
    })
  }

  function flushImages() {
    setImages([]);
  }

  return (
    <div className="flex flex-col h-screen items-center justify-end">
      <Banner />
      <div className="flex flex-col h-screen w-3/5 items-center justify-end">
        <Content />
        <promptContext.Provider value={{ addImagesToState, removeImageFromState, images, flushImages }}>
          <QueryBox />
        </promptContext.Provider>
      </div>
    </div >
  );
}

export default App
