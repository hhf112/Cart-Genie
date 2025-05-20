import React from 'react'

export function InputArea({prompt, setPrompt}) {
  return (
    <textarea className=" w-full resize-none focus:outline-none placeholder-gray-500 h-10  overflow-auto p-2"
    placeholder="Try searching something..." value = {prompt} onChange = {(e)=> {
      setPrompt(e.target.value);
    }} onDrop = {()=> handleImageChange}>

    </textarea>
  )
}
