import { gql } from "@apollo/client";
import client from "client";
import { BlockRenderer } from "components/BlockRenderer";
import { cleanAndTransform } from "utils/cleanAndTransform";

export default function Page(props){
    console.log("Page Props 2",props)
    return (<div>
      <BlockRenderer blocks={props.blocks}/>
    </div>);
}

export const getStaticProps = async (context) => {
  console.log("CONTEXT here",context);
  const uri = `/index.php/${context.params.slug.join("/")}/`;
  console.log("URI",uri);
    const {data} = await client.query({
        query:gql`
        query pageQuery($uri: String!) {
      nodeByUri(uri: $uri) {
        ... on Page {
          id,
          title,
          blocks(postTemplate: false)
        }
      }
    } `,
     variables:{
      uri:uri,
     }
      })
    return {
      props:{
        title:data.nodeByUri.title,
        blocks:cleanAndTransform(data.nodeByUri.blocks),
      }
    }
}


export const getStaticPaths =async() => {
    const {data} = await client.query({
        query:gql`
        query AllPagesQuery {
            pages {
                nodes {
                uri
                }
            }
        }
 `
    });
    return{
        paths:data.pages.nodes.filter(page => page.uri !== '/').map(page => ({
            params:{
                slug:page.uri.substring(1,page.uri.length -1).split("/")
            }
        })),
        fallback:"blocking",
    }
};