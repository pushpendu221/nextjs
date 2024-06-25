import { gql } from "@apollo/client";
import client from "client";
import { BlockRenderer } from "components/BlockRenderer";
import { cleanAndTransform } from "utils/cleanAndTransform";

export default function Home(props) {
  console.log("props:", props);
  return (
  <div>
    <BlockRenderer blocks={props.blocks}/>
  </div>
  );
}

export const getStaticProps = async () => {
  const {data} = await client.query({
    query:gql`
    query NewQuery {
  nodeByUri(uri: "/") {
    ... on Page {
      id
      blocks(postTemplate: false)
    }
  }
}
    `
  })
return {
  props:{
    blocks:cleanAndTransform(data.nodeByUri.blocks),
  }
}
};