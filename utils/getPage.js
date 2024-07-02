import { cleanAndTransform } from "./cleanAndTransform";

export const getPage = async (uri) => {
    const params = {
        query:`
        query PageQuery($uri: String!) {
            nodeByUri(uri: $uri) {
            ... on Page {
                id
                title
                blocks(postTemplate: false)
                seo {
                title
                metaDesc
                }
            }
                
            ... on Property {
                id
                title
                blocks(postTemplate: false)
                seo {
                title
                metaDesc
                }
            }
            }
            acfOptionsMainMenu {
            mainMenu {
                callToActionButton {
                label
                destination{
                    ...on Page{
                    uri
                    }
                }
                }
                menuItems {
                items {
                    destination{
                    ... on Page{
                        uri
                    }
                    }
                    label
                }
                menuItem {
                    destination{
                    ... on Page{
                        uri
                    }
                    }
                    label
                }
                }
            }
            }
        }
        `,
        variables:{
          uri,  
        },
    };

    const response = await fetch(process.env.WP_GRAPHQL_URL,{
        method: "POST",
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify(params)
    });
    const {data} = await response.json();
    if(!data.nodeByUri){
        return null;
    }
    const blocks = cleanAndTransform(data.nodeByUri.blocks)
    return blocks;
}