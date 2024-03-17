import {Divider, Modal, Typography} from "antd";
import {useContext} from "react";
import {LopMonContext} from "../store/context/Context";


const ModalDetailLopMon = ({ openModal , setOpenModal }) => {

    const [state,dispatch] = useContext(LopMonContext);

    return(
        <>
            <Modal title={<Typography.Title level={3}>Chi Tiết Lớp Môn</Typography.Title>}
                   open={openModal}
                   onCancel={() => {
                       setOpenModal(false)
                   }}
                   footer={null}>
                <div className="border rounded-3">
                    <div style={{padding: "15px 10px 0 10px"}} className="d-flex justify-content-between">
                        <span style={{fontSize: "15px", fontWeight: 600}}>Môn Học</span>
                        <span>{state.lopMonDetail.tenMonHoc}</span>
                    </div>
                    <Divider style={{margin: "10px 0"}}></Divider>
                    {/**/}
                    <div style={{padding: "10px 10px 0 10px"}} className="d-flex justify-content-between">
                        <span style={{fontSize: "15px", fontWeight: 600}}>Mã Lớp</span>
                        <span>{state.lopMonDetail.maLop}</span>
                    </div>
                    <Divider style={{margin: "10px 0"}}></Divider>
                    {/**/}
                    <div style={{padding: "10px 10px 0 10px"}} className="d-flex justify-content-between">
                        <span style={{fontSize: "15px", fontWeight: 600}}>Phòng Học</span>
                        <span>{state.lopMonDetail.phongHoc}</span>
                    </div>
                    <Divider style={{margin: "10px 0"}}></Divider>
                    {/**/}
                    <div style={{padding: "10px 10px 0 10px"}} className="d-flex justify-content-between">
                        <span style={{fontSize: "15px", fontWeight: 600}}>Ca</span>
                        <span>{state.lopMonDetail.caHoc}</span>
                    </div>
                    <Divider style={{margin: "10px 0"}}></Divider>
                    {/**/}
                    <div style={{padding: "10px 10px 0 10px"}} className="d-flex justify-content-between">
                        <span style={{fontSize: "15px", fontWeight: 600}}>Ngày Bắt Đầu</span>
                        <span>{state.lopMonDetail.ngayBatDau}</span>
                    </div>
                    <Divider style={{margin: "10px 0"}}></Divider>
                    {/**/}
                    <div style={{padding: "10px 10px 0 10px"}} className="d-flex justify-content-between">
                        <span style={{fontSize: "15px", fontWeight: 600}}>Giảng Viên Dạy</span>
                        <span>{state.lopMonDetail.tenGiaoVien}</span>
                    </div>
                    <Divider style={{margin: "10px 0"}}></Divider>
                    {/**/}
                    <div style={{padding: "10px 10px 0 10px"}} className="d-flex justify-content-between">
                        <span style={{fontSize: "15px", fontWeight: 600}}>Block</span>
                        <span>{state.lopMonDetail.tenBlock}</span>
                    </div>
                    <Divider style={{margin: "10px 0"}}></Divider>
                    {/**/}
                    <div style={{padding: "10px 10px 0 10px"}} className="d-flex justify-content-between">
                        <span style={{fontSize: "15px", fontWeight: 600}}>Học Kỳ</span>
                        <span>{state.lopMonDetail.tenHocKy}</span>
                    </div>
                    <Divider style={{margin: "10px 0"}}></Divider>
                    {/**/}
                    <div style={{padding: "10px 10px 0 10px"}} className="d-flex justify-content-between">
                        <span style={{fontSize: "15px", fontWeight: 600}}>Cơ Sở</span>
                        <span>{state.lopMonDetail.tenCoSo}</span>
                    </div>
                    <Divider style={{margin: "10px 0"}}></Divider>
                    {/**/}
                    <div style={{padding: "10px 10px 15px 10px"}} className="d-flex justify-content-between">
                        <span style={{fontSize: "15px", fontWeight: 600}}>Trạng Thái</span>
                        <span>{state.lopMonDetail.trangThai}</span>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ModalDetailLopMon;