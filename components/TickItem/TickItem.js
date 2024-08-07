import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const TickItem = ({children}) => {
    return(
        <div className="grid grid-cols-[50px_1fr] gap-3 p-3">
            <div className="text-3xl text-blue-700 flex justify-center items-center">
                 <FontAwesomeIcon icon={faCircleCheck}/>
            </div>
            <div>
            {children}
            </div>
        </div>
    )
}