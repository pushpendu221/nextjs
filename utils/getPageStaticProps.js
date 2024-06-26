import { gql } from "@apollo/client";
import client from "client";
import { mapMainMenuItems } from "./mapMainMenuItems";
import { cleanAndTransform } from "./cleanAndTransform";

export const getPageStaticProps = async (context) => {
    console.log("context", context);
    const uri = context.params?.slug ?`/${context.params.slug.join("/")}/`:"/";
    const {data} = await client.query({
      query:gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            blocks(postTemplate: false)
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
       uri:uri,
      }
    })
  return {
    props:{
      mainMenuItems:mapMainMenuItems(data.acfOptionsMainMenu.mainMenu.menuItems),
      blocks:cleanAndTransform(data.nodeByUri.blocks),
      callToActionLabel: data.acfOptionsMainMenu.mainMenu.callToActionButton.label,
      callToActionDestination:data.acfOptionsMainMenu.mainMenu.callToActionButton.destination?.uri,
    }
  }
};