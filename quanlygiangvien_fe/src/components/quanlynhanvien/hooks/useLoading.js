import {useState} from "react";


export const useLoading = () => {

    const [loading,setLoading] = useState(false);

    const handleSetLoading = (value) => {
        setLoading(value);
    }

    return {loading,handleSetLoading};

}