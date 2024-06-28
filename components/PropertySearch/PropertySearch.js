import { useEffect, useState } from "react";
import { Results } from "./Results";
import { Pagination } from "./Results/Pagination";
import { useRouter } from "next/router";
//Basically..it converts query string into objects
import queryString from "query-string";
import { Filters } from "./Filters";

export const PropertySearch = () => {
  const [properties, setProperties] = useState([]);
  const [totalPages, settotalPages] = useState(0);
  const PageSize = 3;
  //nextJS router
  const router = useRouter();
  // Would need function search function outside
  const search = async () => {
    //We are using search function later in handlepageClick so that we can get the query parameters.
    const {page} = queryString.parse(window.location.search);
    const response = await fetch(`api/search`,{
      method: "POST",
      body: JSON.stringify({
        //if no page as part of our query String then we sent 1.
        page: parseInt(page || "1"),
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

  const handlePageClick = async (pageNumber) => {
   await router.push(`${router.query.slug.join("/")}?page=${pageNumber}`, null, {
      shallow: true, // it means this function wouldn't rerun when page updates
    });
    //Async and Await because after router.push finishes then search() function is used.
    search();
  };
  return (
    <div>
        <Filters/>
      <Results properties={properties} />
      <Pagination
        onPageClick={handlePageClick}
        totalPages={Math.ceil(totalPages / PageSize)}
      />
    </div>
  );
};
