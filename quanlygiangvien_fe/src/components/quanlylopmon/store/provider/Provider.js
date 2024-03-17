import {LopMonContext} from "../context/Context";
import {useReducer} from "react";
import {INITIAL_STATE, LopMonReducer} from "../reducer/Reducer";

export const LopMonProvider = ({children}) => {

    const [state,dispatch] = useReducer(LopMonReducer,INITIAL_STATE);

    return(
        <LopMonContext.Provider value={[state,dispatch]}>
            {children}
        </LopMonContext.Provider>
    )
}
