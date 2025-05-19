export function Uploaded({ images, modifyImages }) {
  function removeImage(id) {
    modifyImages
      (images.filter((_, index) => { return index != id }));
  }
  return (
    <div className="w-full p-1  flex h-20 text-sm items-end overflow-auto">
      {
        images.map((image, key) => {
          return (
            <div key={key} className="w-20 h-20 relative mx-1">
              <img src={URL.createObjectURL(image)} className=" rounded-xl min-w-20 min-h-20" />
              <button className="absolute top-3 right-3 cursor-pointer" type="button"
                onClick={()=>removeImage(key)} >
                <img src="icons/remove.png" className="w-3  h-3" /></button>
            </div>
          )
        }
        )
      }
      {
        images.length < 1 && <h1 className="my-1"> No images attached. </h1>

      }
    </div>
  )
}
