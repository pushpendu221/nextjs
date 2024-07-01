import { faBath, faBed, faCar, faDog } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import numeral from "numeral"

export const PropertyFeatures = ({bathroom, bedroom,price, has_parking, pet_friendly }) =>{
    return (
        <div className="max-w-lg mx-auto my-10 bg-white text-slate-900 p-5 text-center)">
            <div className="grid grid-cols-2 mb-4 gap-5">
                <div>
                    <FontAwesomeIcon icon={faBed} /> {bedroom} bedrooms
                </div>
                <div>
                    <FontAwesomeIcon icon={faBath} /> {bathroom} bathrooms
                </div>
                <div>
                    {!!pet_friendly  && // if has pet friendly set to true 
                    <>
                        <FontAwesomeIcon icon={faDog} /> pet Friendly
                    </>  
                    }
                </div>
                <div>
                    {!!has_parking  && // if has pet friendly set to true 
                    <>
                        <FontAwesomeIcon icon={faCar} /> Parking Available
                    </>  
                    }
                </div>
            </div>
            <h3 className="text-5xl font-bold">
                {numeral(price).format("0,0")}
            </h3>
        </div>
    )
}