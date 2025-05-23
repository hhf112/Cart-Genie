import { useState, useEffect } from "react";

import { Banner } from "./Banner"
import { Content } from "./Content";
import { Form } from "./Form"
import { ImagePreview } from './ImagePreview';

import { promptContext } from "./Contexts";
import { authContext } from "./Contexts";
import { AuthCatalogue } from "./AuthCatalogue";

const serverAddress = `http://localhost:${import.meta.env.VITE_PORT}`;

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
  const [prompt, setPrompt] = useState("");
  const [user, setLoggedIn] = useState({
    status: null,
  }); //userAuth will be added soon.

  console.log(images);

  function resetImages() { setImages([]) }
  function resetQuery() {
    setImages([]);
    setPrompt("");
  }

  function addImagesToState(fileArray) {
    const tempImages = Array.from(fileArray).map((img) => ({
      file: img,
      url: URL.createObjectURL(img),
      uploaded: false,
      key: null,
    }));
    setImages((prev) => [...prev, ...tempImages]);
    return tempImages;

  }

  function removeImageFromState(removeKey) {
    setImages((images) => {
      return images.filter(image => {
        if (image.key === removeKey) URL.revokeObjectURL(image.url);
        return image.key !== removeKey;
      })
    })
  }

  async function imagesPreUpload(fileArray) {
    const updated = addImagesToState(fileArray);
    for (let image of updated) {
      const imageWrapper = new FormData();
      imageWrapper.append("ImagePrompt", image.file);
      let response;
      try {
        response = await fetch(`${serverAddress}/upload`, {
          method: "POST",
          body: imageWrapper,
        })
      } catch (err) {
        console.log(err);
      }

      const { key } = await response.json();


      setImages((prev) => {
        return prev.map((img) => {
          return (img.url == image.url ? { ...img, key: key, uploaded: true } : img);
        })
      })

    }
  }

  return (
    <div className="flex flex-col h-screen items-center justify-end">
      <Banner />
      <div className="flex flex-col h-screen w-3/5 items-center justify-end">
        <Content />
        <authContext.Provider value={{ user, setLoggedIn }}>
          <promptContext.Provider value={{ addImagesToState, removeImageFromState, images, resetQuery, prompt, setPrompt, imagesPreUpload, serverAddress }}>
            <QueryBox />
            {/* <AuthCatalogue/>*/}
          </promptContext.Provider>
        </authContext.Provider>
      </div>
    </div >
  );
}

export default App
