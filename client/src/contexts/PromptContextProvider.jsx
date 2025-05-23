import { createContext, useContext } from "react";
import { useState } from "react";

const serverAddress = `http://localhost:${import.meta.env.VITE_PORT}`;

export const promptContext = createContext();

export function PromptContextProvider({ children }) {
  const [images, setImages] = useState([]);
  const [prompt, setPrompt] = useState("");


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
    <promptContext.Provider
      value={{
        addImagesToState,
        removeImageFromState,
        images,
        resetQuery,
        prompt,
        setPrompt,
        imagesPreUpload,
        serverAddress
      }}
    >
      {children}
    </promptContext.Provider>
  )
}

