import {Input} from "antd";
import {Container} from "react-bootstrap";
import {useContext, useEffect, useRef, useState} from "react";
import {useLopMon} from "../hooks/useLopMon";
import {LopMonContext} from "../store/context/Context";
import {setValueSearchAction} from "../store/actions/Actions";

const SearchLopMon = () => {

    //custom Hooks
    const { handleGetSearchLopMon } = useLopMon();

    //useContext
    const [state,dispatch] = useContext(LopMonContext);

    const timeOutId = useRef(null);

    const [firstRerender,setFirstRerender] = useState(false);

    //Người dùng gõ xong!
    useEffect(() => {
        if(firstRerender){
            timeOutId.current = setTimeout(() => {
                //handle search
                handleGetSearchLopMon(state.searchValue,1);
            }, 500);
        }else{
            setFirstRerender(true);
        }
    }, [state.searchValue]);

    const handleChangeSearchValue = (e) => {
        clearTimeout(timeOutId.current);
        dispatch(setValueSearchAction(e.target.value));
    }

    return(
        <>
            <Container className="shadow mb-5 p-5 rounded-4">
                <h4 style={{marginBottom: "15px"}}>Tìm Kiếm Nhân Viên</h4>
                <Input
                    type="text"
                    style={{height: "40px"}}
                    placeholder="Tìm kiếm lớp môn theo Môn học, Mã lớp, Phòng học, Ca, Block, Giảng viên..."
                    value={state.searchValue}
                    onChange={handleChangeSearchValue}
                />
            </Container>
        </>
    )
}

export default SearchLopMon