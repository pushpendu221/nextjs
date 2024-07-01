import { Input } from "components/Input";
import { useEffect, useState } from "react";
import queryString from "query-string";
export const Filters = ({onSearch}) => {
    const [petFriendly, setPetFriendly] = useState(false);
    const [hasParking, setHasParking] = useState(false);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleSearch = () => {
        onSearch({petFriendly,
            hasParking,
            minPrice,
            maxPrice,
        })
    }

    useEffect(() => {
      const {
        petFriendly:petFriendlyInitial,
        hasParking:hasParkingInitial,
        minPrice:minPriceInitial,
        maxPrice:maxPriceInitial
      } = queryString.parse(window.location.search);
      setPetFriendly(petFriendlyInitial === "true");
      setHasParking(hasParkingInitial === "true");
      setMinPrice(minPriceInitial || '');
      setMaxPrice(maxPriceInitial || '');

    },[]);

  return (
    <div className="mx-w-5xl mx-4 my-5 flex gap-5 border-solid border-slate-400 border-2 p-5 rounded-md">
      <div className="flex-1">
        <div>
            <label className="cursor-pointer">
                <input type="checkbox" checked={hasParking}  onChange={() => setHasParking(value => !value)} />
                <span className="pl-2">has parking</span>
            </label>
        </div>
        <div>   
            <label className="cursor-pointer">
                <input type="checkbox" checked={petFriendly} 
                onChange={() => setPetFriendly(value => !value)}/>
                <span className="pl-2">pet Friendly</span>
            </label>
        </div>
        
      </div>
      <div className="flex-1">
        <span>Min Price</span>
        <Input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}/>
      </div>
      <div className="flex-1">
        <span>Max Price</span>
        <Input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}/>
      </div>
      <div className="btn" onClick={handleSearch}>
        search
      </div>
    </div>
  );
};
