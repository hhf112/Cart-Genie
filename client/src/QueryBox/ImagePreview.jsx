import { useEffect } from "react";

export function ImagePreview({ images, modifyImages }) {
  function removeImage(id) {
    modifyImages
      (images.filter((_, index) => { return index != id }));
  }

  function addImage(e) {
    const toAdd = e.dataTransfer.files[0];
    modifyImages((prevImages) => {
      return [...prevImages, toAdd];
    });


  useEffect(()=> {
    console.log(images)
  }, [images]);


  }

  return (
    <div className="w-full p-1  flex h-20 text-sm items-end overflow-auto" onDrop = {(e)=> {
      e.preventDefault();
      addImage(e);
    }} onDragOver = {(e)=> e.preventDefault()}>
      {
        images.map((image, key) => {
          return (
            <div key={key} className="w-20 h-20 relative mx-1">
              <img src={URL.createObjectURL(image)} className=" rounded-xl min-w-20 min-h-20" />
              <button className="absolute top-3 right-3 cursor-pointer" type="button"
                onClick={() => removeImage(key)} >
                <img src="icons/remove.png" className="w-3  h-3" /></button>
            </div>
          )
        }
        )
      }
      {
        images.length < 1 && <h1 className="my-1"> Upload or drag and drop images here. </h1>

      }
    </div>
  )
}
