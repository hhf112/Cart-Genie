import React from 'react'
import { ButtonBar } from './ButtonBar'
import { InputArea } from './InputArea'

export function Form({ prompt, setPrompt, images, modifyImages }) {
  return (
    <form
      action="/query"
      className="
    w-full
    border-b-gray-200 
    p-2 rounded-3xl shadow-xl overflow-auto
     ">
      <InputArea prompt={prompt} setPrompt={setPrompt} />

      <ButtonBar prompt={prompt} setPrompt={setPrompt} images={images} modifyImages={modifyImages} />

    </form>
  )
}

