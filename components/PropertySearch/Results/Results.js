import { PropertyCard } from "./PropertyCard";

export const Results = ({properties}) => {
    return(<div className="max-w-5xl mx-auto grid grid-cols-3 gap-5 mb-10">
        {properties.map((property)=>{
            return(
                <PropertyCard key={property.databaseId} 
                title={property.title} 
                destination={property.uri} 
                bathroom={property.propertyfeatures.bathroom} 
                bedroom={property.propertyfeatures.bedroom} 
                price={property.propertyfeatures.price} 
                parking={property.propertyfeatures.hasParking} 
                petFriendly={property.propertyfeatures.petFriendly}
                image = {property.featuredImage?.node?.sourceUrl}
                />
            )
        })}
        </div>);
}