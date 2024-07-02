import { BlockRenderer } from "components/BlockRenderer";
import { getPage } from "utils/getPage";
import {notFound} from "next/navigation";
import { getSeo } from "utils/getSeo";

export default async function Home(){
    const data = await getPage("/");
    if(!data){
        notFound();
    }
    console.log({data});
    return <BlockRenderer blocks={data} />
}
// special function by nextjs for metadata
export async function generateMetadata(){
const seo = await getSeo("/");
return {
    title: seo.title || "",
    description : seo.metaDesc || "",
};
}