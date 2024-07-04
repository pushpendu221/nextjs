"use client"
import { useEffect, useState } from "react";
import { Results } from "./Results";
import { Pagination } from "./Results/Pagination";
import { useRouter,usePathname } from "next/navigation";
//Basically..it converts query string into objects
import queryString from "query-string";
import { Filters } from "./Filters";

export const PropertySearch = () => {
  const [properties, setProperties] = useState([]);
  const [totalPages, settotalPages] = useState(0);
  const PageSize = 3;
  //nextJS router
  const router = useRouter();
  const pathname = usePathname();
  // Would need function search function outside
  const search = async () => {
    //We are using search function later in handlepageClick so that we can get the query parameters.
    const {page,petFriendly,hasParking,minPrice,maxPrice} = queryString.parse(window.location.search);
    const filters = {};
    if(minPrice){
        filters.minPrice = parseInt(minPrice);
    }
    if(maxPrice){
        filters.maxPrice = parseInt(maxPrice);
    }
    if(petFriendly === "true"){
        filters.petFriendly = true;
    }
    if(hasParking === "true"){
        filters.hasParking = true;
    }
    const response = await fetch(`api/search`,{
      method: "POST",
      body: JSON.stringify({
        //if no page as part of our query String then we sent 1.
        page: parseInt(page || "1"),
        ...filters,
      }),
    });
    const data = await response.json();
    console.log("SEARCH DATA:", data);
    setProperties(data.properties);
    settotalPages(data.total);
  };
  useEffect(() => {
    search();
  }, []);

  const handleSearch= async ({petFriendly,hasParking,minPrice,maxPrice}) => {
    //update our browser Url
    //search
    console.log("Filters:",petFriendly,hasParking,minPrice,maxPrice);
     router.push(`${pathname}?page=1&petFriendly=${petFriendly}&hasParking=${hasParking}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
     
  }

  const handlePageClick = async (pageNumber) => {
    const {
      petFriendly,
      hasParking,
      minPrice,
      maxPrice
    } = queryString.parse(window.location.search);
    router.push(`${pathname}?page=${pageNumber}&petFriendly=${petFriendly ==='true'}&hasParking=${hasParking ==='true'}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
    //Async and Await because after router.push finishes then search() function is used.

  };
  return (
    <div>
        <Filters onSearch={handleSearch}/>
      <Results properties={properties} />
      <Pagination
        onPageClick={handlePageClick}
        totalPages={Math.ceil(totalPages / PageSize)}
      />
    </div>
  );
};
