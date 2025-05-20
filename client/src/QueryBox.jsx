import React from 'react'
import { Form } from "./QueryBox/Form"
import { ImagePreview } from './QueryBox/ImagePreview';

export function QueryBox({ images, modifyImages, prompt, setPrompt }) {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <ImagePreview images={images} modifyImages={modifyImages} />
      <Form prompt={prompt} setPrompt={setPrompt} images={images} modifyImages={modifyImages} />
      <p className=" mt-1 mb-2 text-xs ">Upload images for better recommendations.</p>
    </div>
  );
}
