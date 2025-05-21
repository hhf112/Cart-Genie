import { useContext, useEffect } from "react";
import { promptContext } from "./Contexts";

export function ImagePreview() {
  const {removeImageFromState, addImagesToState, images} = useContext(promptContext);


  function handleImageDrop(fileArray) {
    addImagesToState(fileArray);
    //API call.
  }

  return (
    <div className="w-full p-1  flex h-23 text-sm items-end overflow-auto" onDrop = {(e)=> {
      e.preventDefault();
      handleImageDrop(e.dataTransfer.files);
    }} onDragOver = {(e)=> e.preventDefault()}>

      { images.map((image) => {
          return (
            <div  key = {image.key} className="w-20 h-20 relative mx-1">
              <img src={image.url} className=" rounded-xl w-20 h-20" />
              <button className="absolute top-3 right-3 cursor-pointer" type="button"
                onClick={() => removeImageFromState(image.key)} >
                <img src="icons/remove.png" className="w-3  h-3" /></button>
            </div>
        )})}

      { images.length < 1 && <h1 className="my-1"> Upload or drag and drop images here. </h1> }
    </div>
  )
}
