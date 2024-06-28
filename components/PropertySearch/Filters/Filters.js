import { Input } from "components/Input";

export const Filters = () => {
  return (
    <div className="mx-w-5xl mx-4 my-5 flex gap-5 border-solid border-slate-400 border-2 p-5 rounded-md">
      <div className="flex-1">
        <div>
            <label className="cursor-pointer">
                <input type="checkbox" />
                <span className="pl-2">has parking</span>
            </label>
        </div>
        <div>   
            <label className="cursor-pointer">
                <input type="checkbox" />
                <span className="pl-2">pet Friendly</span>
            </label>
        </div>
        
      </div>
      <div className="flex-1">
        <span>Min Price</span>
        <Input type="number"/>
      </div>
      <div className="flex-1">
        <span>Max Price</span>
        <Input type="number"/>
      </div>
      <div className="btn">
        search
      </div>
    </div>
  );
};
