import { CallToActionButton } from "components/CallToActionButton";
import { Column } from "components/Column";
import { Columns } from "components/Columns";
import { Cover } from "components/Cover";
import { FormspreeForm } from "components/FormspreeForm";
import { Gallery } from "components/Gallery";
import { Heading } from "components/Heading";
import { Imagedata } from "components/Image";
import { Paragraph } from "components/Paragraph";
import { PropertyFeatures } from "components/PropertyFeatures";
import { PropertySearch } from "components/PropertySearch";
import { theme } from "theme";
export const BlockRenderer = ({blocks}) => {
    return blocks.map(block => {
        switch(block.name){

            case 'core/column':{
                return(
                    <Column key={block.id} width={block.attributes?.width}>
                         <BlockRenderer blocks={block.innerBlocks}/>
                    </Column>
                )
            }
            case 'core/columns':{
               // console.log("COLUmns", block.attributes)
                return(
                    <Columns
                    key={block.id}
                    isStackedOnMobile ={block.attributes.isStackedOnMobile}
                    backGroundColor={theme[block.attributes.backgroundColor]}
                    textColor ={theme[block.attributes.textColor]}
                    >
                        <BlockRenderer blocks={block.innerBlocks}/>
                    </Columns>
                );
            }
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
            case 'core/post-title':
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
            case 'core/image':{
                return(<Imagedata key={block.id} 
                width={block.attributes.width} 
                height = {block.attributes.height}
                image_url = {block.attributes.url}
                alt={block.attributes.alt || ''}
                />);
            }

            case 'core/cover':{
                // console.log("blocks",block);
                return <Cover key={block.id} background={block.attributes.url}>
                    <BlockRenderer blocks={block.innerBlocks} />
                </Cover>;
            }
            case 'core/group':
            case 'core/block':{
                return(
                <BlockRenderer key={block.id} blocks={block.innerBlocks}/>

                );
            }
            case 'acf/propertysearch':{
                return(
                    <PropertySearch key={block.id}/>
                );
            }  
            case 'acf/formspreeform':{
                return(
                    <FormspreeForm key={block.id} formId={block.attributes.data.form_id}/>
                );
            }    
            case 'acf/propertyfeatures':{
                return(
                    <PropertyFeatures key={block.id} bathroom={block.attributes.bathroom} bedroom={block.attributes.bedroom} price={block.attributes.price} has_parking={block.attributes.has_parking} pet_friendly={block.attributes.pet_friendly}/>
                );
            }
            case 'core/gallery':{
                return(
                    <Gallery key={block.id} 
                    column={block.attributes.width || 3} 
                    cropImages={block.attributes.imageCrop} 
                    items={block.innerBlocks}/>
                );
            }      
            default:
                console.log("unknown", block);
                return null;
        }
    })
}