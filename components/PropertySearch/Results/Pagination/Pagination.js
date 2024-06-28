export const Pagination = ({totalPages}) => {
    return (
        <div className="max-w-5xl mx-auto mb-10 flex justify-center gap-2">
            {/*     //The JavaScript Array.from method can be used to create an array of a specified length.
                    //console.log(Array.from({ length: 10 }, (_, index) => index + 1);
                     // Expected output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] */
                    //_ is a placeholder for the current element,Since it's not used, it is common to name it _. 
               Array.from({length:totalPages}).map((_,i) =>(
                <div key={i} className="btn">
                    {i+1}
                </div>
               ))}

        </div>
    )
}