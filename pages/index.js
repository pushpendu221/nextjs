import { gql } from "@apollo/client";
import client from "client";
import { BlockRenderer } from "components/BlockRenderer";
import { MainMenu } from "components/MainMenu";
import { cleanAndTransform } from "utils/cleanAndTransform";
import { mapMainMenuItems } from "utils/mapMainMenuItems";

export default function Home(props) {
  console.log("Props:", props);
  return (
  <div>
    <MainMenu items={props.mainMenuItems} callToActionLabel={props.callToActionLabel
 } callToActionDestination={props.callToActionDestination} />
    <BlockRenderer blocks={props.blocks}/>
  </div>
  );
}

export const getStaticProps = async () => {
  const {data} = await client.query({
    query:gql`
    query PageQuery {
      nodeByUri(uri: "/") {
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
    `
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