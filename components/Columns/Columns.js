export const Columns = ({isStackedOnMobile, children, backGroundColor, textColor}) => {
    const textColorStyle = textColor ? {color:textColor} :{};
    const backGroundColorStyle = backGroundColor ? {backgroundColor:backGroundColor} :{};
    console.log("backGroundColorStyle",backGroundColorStyle);
    return (
        <div className="my-10" style={{...textColorStyle, ...backGroundColorStyle}}>
            <div className={`max-w-5xl mx-auto ${isStackedOnMobile ? "block md:flex" : "flex"}`}>{children}</div>
            </div>
    );
};