import { gql } from "@apollo/client";
import client from "client";
const handler = async (req,res) => {
    try{
        const filters = JSON.parse(req.body);
        const {data} = await client.query({
            query: gql `
            query AllPropertiesquery {
                properties(where: {offsetPagination: {size: 3, offset: ${((filters.page || 1)-1) * 3}}}) {
                pageInfo {
                    offsetPagination {
                        total
                    }
                }    
                nodes {
                    title
                    uri
                    databaseId
                    featuredImage {
                        node {
                        uri
                        sourceUrl
                        }
                    }
                    propertyfeatures {
                        bathroom
                        bedroom
                        hasParking
                        petFriendly
                        price
                    }
                 }
                }
            }
            `
        });
        return res.status(200).json({
            total: data.properties.pageInfo.offsetPagination.total,
            properties: data.properties.nodes,
        })
        }catch(e){
        console.log("ERROR",e);
    }
}

export default handler;