import { useContext, useEffect } from "react";
import { promptContext } from "./contexts/PromptContextProvider";

export function ImagePreview() {

  const { removeImageFromState, addImagesToState, images, imagesPreUpload, serverAddress } = useContext(promptContext);
  function serverDeleteImage(imageKey) {
    removeImageFromState(imageKey);
    fetch(`${serverAddress}/deleteImage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: imageKey })
    })
  }


  return (
    <div className="w-full p-1  flex text-sm items-end overflow-auto" onDrop={(e) => {
      e.preventDefault();
      imagesPreUpload(e.dataTransfer.files);
    }} onDragOver={(e) => e.preventDefault()}>

      {images.map((image, index) => (
        <div key={index} className="w-20 h-20 relative mx-1">
          {!image.uploaded ? <img src="icons/uploading.gif" className="w-20 h-20" /> : <img src={image.url} className=" rounded-xl w-20 h-20" />}
          <button className="absolute top-3 right-3 cursor-pointer" type="button"
            onClick={() => serverDeleteImage(image.key)} > <img src="icons/remove.png" className="w-3  h-3" /></button>
        </div>
      ))}
      {images.length < 1 && <h1 className="my-1"> Upload or drag and drop images here. </h1>}
    </div>
  )
}
