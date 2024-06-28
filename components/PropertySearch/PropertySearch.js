import { useEffect, useState } from "react";
import { Results } from "./Results";
import { Pagination } from "./Results/Pagination";

export const PropertySearch = () => {
    const [properties, setProperties] =useState([]);
    const [totalPages, settotalPages] =useState(0);
    const PageSize = 3;
    useEffect(() => {
    const search =async () => {
        const response = await fetch(`api/search`);
        const data = await response.json();
        console.log("SEARCH DATA:", data);
        setProperties(data.properties);
        settotalPages(data.total);
    }
    search();
    },[]);
    return(<div>
        <Results properties={properties}/>
        <Pagination totalPages={Math.ceil(totalPages/PageSize)}/>
        </div>);
}