
import { Banner } from "./Banner"
import { Content } from "./Content";
import { Form } from "./Form"
import { ImagePreview } from './ImagePreview';
import { AuthCatalogue } from "./AuthCatalog/AuthCatalogue";

import { PromptContextProvider } from "./contexts/PromptContextProvider";
import { AuthContextProvider } from "./contexts/AuthContextProvider";



function QueryBox() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <ImagePreview />
      <Form />
      <p className=" mt-1 mb-2 text-xs ">Upload images for better recommendations.</p>
    </div>
  );
}

function App() {


  return (
    <div className="flex flex-col h-screen items-center justify-end">
      <Banner />
      <div className="flex flex-col h-screen w-3/5 items-center justify-end">
        <Content />
        <AuthContextProvider>
          <PromptContextProvider>
            <QueryBox />
            <AuthCatalogue />
          </PromptContextProvider>
        </AuthContextProvider>
      </div>
    </div >
  );
}

export default App
