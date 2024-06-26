import { CallToActionButton } from "components/CallToActionButton";
import { Cover } from "components/Cover";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { theme } from "theme";
export const BlockRenderer = ({blocks}) => {
    return blocks.map(block => {
        switch(block.name){
            case 'acf/ctabutton':{
                return(
                    <CallToActionButton 
                    key={block.id} 
                    align={block.attributes.data.allignment} 
                    buttonlabel={block.attributes.data.label} 
                    destination={block.attributes.data.destination || "/"}
                    />
                )
            }
            case 'core/heading':{
                return (
                <Heading 
                key={block.id} 
                textAlign={block.attributes.textAlign} 
                content={block.attributes.content} 
                level={block.attributes.level}/>
            )}
            case 'core/paragraph':{
                return(<Paragraph
                     key={block.id}
                     textAlign={block.attributes.textAlign}
                     backGroundColor={theme[block.attributes.backgroundColor]}
                     textColor ={theme[block.attributes.textColor]}
                     content={block.attributes.content}/>);
            }
            case 'core/cover':{
                // console.log("blocks",block);
                return <Cover key={block.id} background={block.attributes.url}>
                    <BlockRenderer blocks={block.innerBlocks} />
                </Cover>;
            }
            default:
                console.log("unknown", block);
                return null;
        }
    })
}