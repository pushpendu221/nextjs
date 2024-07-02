import { BlockRenderer } from "components/BlockRenderer";
import { getPage } from "utils/getPage"
import {notFound} from "next/navigation";
import { getSeo } from "utils/getSeo";

export default async function Page({params}){
    
    const data = await getPage(params.slug.join("/")); // name is slug because folder name is ...slug
    if(!data){
        notFound();
    }
    console.log({data});
    return <BlockRenderer blocks={data} />
}

// special function by nextjs for metadata
export async function generateMetadata({params}){
    const seo = await getSeo(params.slug.join("/"));
    return {
        title: seo.title || "",
        description : seo.metaDesc || "",
    };
    }