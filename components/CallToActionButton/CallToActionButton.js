import { ButtonLink } from "components/ButtonLink";

export const CallToActionButton = ({align="left",buttonlabel,destination}) => {
const allignMap ={
    left:"text-align",
    center: "text-center",
    right:"text-right"
}
return(
<div className={allignMap[align]}>
    <ButtonLink destination={destination} label={buttonlabel}/>
</div>
);

}