import { gql } from "@apollo/client";
import client from "client";
const handler = async (req, res) => {
    try {
        const filters = JSON.parse(req.body);
        console.log("Filters", filters);
        let hasParkingFilter = ``;
        let petfriendlyFilter = ``;
        let minPriceFilter = ``;
        let maxPricefilter = ``;

        if(filters.hasParking){
            hasParkingFilter = `
              {key: "has_parking", compare: EQUAL_TO, value: "1"}
            `
        }
        if(filters.petFriendly){
            petfriendlyFilter = `
               {key: "pet_friendly", compare: EQUAL_TO, value: "1"}
            `
        }
        if(filters.minPrice){
            minPriceFilter = `
             {key: "price", compare: GREATER_THAN_OR_EQUAL_TO, value: "${filters.minPrice}",type:NUMERIC
                        }
            `
        }
        if(filters.maxPrice){
            maxPricefilter = `
             {key: "price", compare: LESS_THAN_OR_EQUAL_TO, value: "${filters.maxPrice}",type:NUMERIC
                 }
            `
        }
        const { data } = await client.query({
            query: gql`
            query AllPropertiesquery {
                properties(where: {
                offsetPagination: {size: 3, offset: ${((filters.page || 1) - 1) * 3
                }}
                metaQuery: { 
                relation: AND 
                metaArray: [
                ${petfriendlyFilter}
                 ${hasParkingFilter}
                  ${minPriceFilter}
                   ${maxPricefilter}
                ], 
                }

                }) {
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
            `,
        });
        return res.status(200).json({
            total: data.properties.pageInfo.offsetPagination.total,
            properties: data.properties.nodes,
        });
    } catch (e) {
        console.log("ERROR", e);
    }
};

export default handler;
