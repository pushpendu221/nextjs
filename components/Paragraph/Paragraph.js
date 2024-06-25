import { getTextAlign } from "utils/fonts";
import { relativeToAbsoluteurl } from "utils/relativeToAbsoluteUrl";

export const Paragraph = ({textAlign ="left",backGroundColor,textColor,content}) =>{
    return(
    <p className={`max-w-5xl mx-auto ${getTextAlign(textAlign)}`} 
    dangerouslySetInnerHTML={{__html:relativeToAbsoluteurl(content)}} 
    style={{color:textColor,backgroundColor:backGroundColor}}
    />
    );
}