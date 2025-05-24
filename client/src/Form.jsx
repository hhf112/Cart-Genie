import React, { useContext } from 'react'
import { useRef } from 'react'
import { promptContext } from './contexts/PromptContextProvider'


export function Form() {
  const promptInfo = useRef(null);
  const ImageInputRef = useRef(null);
  const { resetQuery, images, setPrompt, prompt, imagesPreUpload, serverAddress } = useContext(promptContext);


  async function submitTextPrompt() {
    try {
      const finalPrompt = prompt;
      resetQuery();
      const req = await fetch(`${serverAddress}/query`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          "UserPrompt": {
          "textPrompt" : finalPrompt,
          "imagePrompt" : images.map(img => img.key),
          }
        }),
      })
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <form className=" w-full border-b-gray-200 p-2 rounded-3xl shadow-xl overflow-auto " onSubmit={(e) => {
      e.preventDefault();
      submitTextPrompt();
    }}>

      <textarea name="TextPrompt" value={prompt} className=" w-full resize-none focus:outline-none placeholder-gray-500 text-black h-10  overflow-auto p-2 dark:text-gray-400"
        placeholder="Try searching something..."
        onChange={(e) => {
          setPrompt(e.target.value);
        }} />


      <input multiple type="file" name="ImagePrompt" accept="image/*" className="hidden" ref={ImageInputRef}
        onChange={e => { imagesPreUpload(e.target.files) }} />



      <div className="flex justify-end">
        <button type="button" className="w-8 cursor-pointer h-8 mx-2" onClick={() => {
          ImageInputRef.current.click();
        }}>
          <img src="/icons/attach.png" alt="upload images" className="w-8 h-8" />
        </button>

        <button type="submit" className="w-9 h-9 mx-1"> <img src="icons/up-arrow.png" className="w-9 cursor-pointer h-9" /> </button>
      </div>
    </form >
  )
}

