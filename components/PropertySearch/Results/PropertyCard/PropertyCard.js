import { faBathtub, faBed, faCar, faDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import numeral from "numeral";

export const PropertyCard = ({
    title, 
    destination, 
    bathroom, 
    bedroom, 
    price, 
    parking, 
    petFriendly, 
    image
    }) => {
return <Link href={destination} className="border-2 border-slate-300 p-5 block bg-slate-100 hover:bg-slate-200">
    <div className="flex w-full">
        <Image 
        className="object-cover h-48"
        src={image} 
        width = {300}
        height = {300}
        alt=""/>
    </div>
    <div className="mt-3 text-lg font-bold">{title}</div>
    <div className="mt-3 text-lg">{numeral(price).format("0,0")}</div>
    <div className="flex justify-between text-sm mt-3">
        <div>
            <FontAwesomeIcon icon={faBathtub} />
            <span className="pl-2">{bathroom}</span>
        </div>
        <div>
            <FontAwesomeIcon icon={faBed} />
            <span className="pl-2">{bedroom}</span>
        </div>
    </div>     
        {(!!parking || !!petFriendly) && (
            <div className="flex justify-between text-sm mt-3"> 
                <div>
                    {!!parking&&
                    <>
                    <FontAwesomeIcon icon={faCar}/> parking Available
                    </>
                    }
                </div>
                <div>
                    {!!petFriendly&&
                    <>
                    <FontAwesomeIcon icon={faDog}/> Pet Friendly
                    </>
                    }
                </div>
            </div>
        )}
       
    </Link>;
}