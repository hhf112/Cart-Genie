import { ItemCard } from "./ItemCard";

export function Content() {
  return (
    <div className="w-full flex grow flex-col justify-center items-center">
      <div className=" flex grow flex-col justify-center items-center overflow-auto">
        {/*list of item cards*/}
      </div>


      <div className=" flex grow-1/5 flex-col justify-center items-center overflow-auto">
        {/*text response from server*/}
      </div>
    </div>
  )
}
