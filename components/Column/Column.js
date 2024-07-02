export const Column = ({children,width, backGroundColor, textColor}) => {
    const textColorStyle = textColor ? {color:textColor} :{};
    const backGroundColorStyle = backGroundColor ? {backgroundColor:backGroundColor} :{};
    const widthStyle = width ? {minWidth: width, flexGrow:1} : {flexGrow:1, flexBasis:0}
    return(
        <div style={{...widthStyle, ...textColorStyle, ...backGroundColorStyle}} className="px-2 py-5">{children}</div>
    )
}