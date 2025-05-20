import { useEffect, useRef, useState } from "react"

export function ButtonBar({ prompt, images, modifyImages }) {
  const ImageInputRef = useRef();


  function handleImageChange(e) {
    const toAdd = Array.from(e.target.files);
    modifyImages((prevImages) => {
      return [...prevImages, ...toAdd];
    });
  }

  // useEffect(()=> {
  //   console.log(images)
  // }, [images]);
  //
  function submitResponse() {
    console.log(prompt);
    console.log(images);

  }


  return (
    <div className="flex justify-end">

      <button type="button" className="w-8 cursor-pointer h-8 mx-2" onClick={
        () => {
          ImageInputRef.current.click();
        }
      }>
        <img src="/icons/image-.png" alt="upload images" className="w-8 h-8" />
      </button>

      <button type="button" method="POST" className="w-9 h-9 mx-1">
        <img src="icons/up-arrow.png" alt="submit"
          className="w-9 cursor-pointer h-9"
          onClick={submitResponse}  />

      </button>


      <input multiple type="file" accept="image/*" className="hidden" ref={ImageInputRef}
        onChange={handleImageChange} />

    </div>
  )
}
