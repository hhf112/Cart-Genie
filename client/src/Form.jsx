import React, { useContext } from 'react'
import { useRef } from 'react'
import { promptContext } from './Contexts'


export function Form() {
  const ImageInputRef = useRef(null);
  const promptInfo = useRef(null);
  const { addImagesToState, setImages, prompt, setPrompt, images } = useContext(promptContext);

  function submitPrompt() {
    const promptContent = new FormData(promptInfo.current);
    promptContent.append("prompt", prompt);
    promptContent.append("images", images);

    //API call.

    for (img of images) {
      URL.revokeObjectURL(img.url);
    }
    setImages([]);
    setPrompt("");
  }

  function uploadImages(fileArray) {
    addImagesToState(fileArray);
    // API call.
  }




  return (
    <form ref={promptInfo} action="/query" method="POST" encType="multipart/form-data" className=" w-full border-b-gray-200 p-2 rounded-3xl shadow-xl overflow-auto "
      onSubmit={(e) => {
        e.preventDefault()
        submitPrompt();
      }}>

      <textarea className=" w-full resize-none focus:outline-none placeholder-gray-500 h-10  overflow-auto p-2 dark:text-gray-400"
        placeholder="Try searching something..." value={prompt} onChange={(e) => {
          setPrompt(e.target.value);
        }}>

      </textarea>

      <input multiple type="file" accept="image/*" className="hidden" ref={ImageInputRef}
        onChange={e => {uploadImages(e.target.files)}} />


  
      <div className="flex justify-end">
        <button type="button" className="w-8 cursor-pointer h-8 mx-2" onClick={() => {
          ImageInputRef.current.click();
        }}>
          <img src="/icons/image-.png" alt="upload images" className="w-8 h-8" />
        </button>

        <button type="submit" method="POST" className="w-9 h-9 mx-1"> <img src="icons/up-arrow.png" alt="submit" className="w-9 cursor-pointer h-9" /> </button>
      </div>
    </form>
  )
}

