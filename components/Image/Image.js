import Image from "next/image"

export const Imagedata = ({width,height,image_url,alt}) => {
    return(
        <Image src={image_url} width={width} height={height} alt={alt}/>
    )
}