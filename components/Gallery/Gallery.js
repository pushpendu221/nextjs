import Image from "next/image";

export const Gallery = ({column, cropImages, items}) => {
    let maxHeight = 0;
    let maxWidth = 0;

    if(cropImages){
        items.forEach(item => {
            if(item.attributes.height > maxHeight){
                maxHeight = item.attributes.height;
               // console.log("max-height",maxHeight);
            }
            if(item.attributes.width > maxWidth){
                maxWidth = item.attributes.width;
               // console.log("max-w",maxWidth);
            }
        } )
    }

    const columnWidth = 100 / column;
    return (<div className="flex flex-wrap max-w-5xl mx-auto">
        {items.map( item =>(
            <div key={item.id} 
            style={{width: `${columnWidth}%`}} 
            className="p-5 flex-grow object-cover">
                <Image src={item.attributes.url} 
                height={ maxHeight || item.attributes.height} // Remember if the first one is true, second condition doesn't follow for ||.
                width={maxWidth || item.attributes.width}
                alt={item.attributes.alt || ""}
                priority
                />
           </div>
        ))}
    </div>)
}