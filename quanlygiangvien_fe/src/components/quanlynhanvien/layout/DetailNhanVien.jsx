import {Divider, Modal} from "antd";
import {useNhanVien} from "../hooks/useNhanVien";
import {useEffect} from "react";


const DetailNhanVien = ({open,setOpen,nhanVienId}) => {

    const {detailNhanVien,getDetailNhanVienChucVu} = useNhanVien();

    useEffect(   () => {
        getDetailNhanVienChucVu(nhanVienId);
    }, [nhanVienId]);

    return(
        <Modal title={<h4>Chi Tiết Nhân Viên</h4>} open={open} onOk={()=>{setOpen(false)}}  onCancel={()=>{setOpen(false)}}>
            <div className="border rounded-3">
                <div style={{padding: "15px 10px 0 10px"}} className="d-flex justify-content-between">
                    <span style={{fontSize: "15px", fontWeight: 600}}>Mã Nhân Viên</span>
                    <span>{detailNhanVien.maNhanVien}</span>
                </div>
                <Divider style={{margin: "10px 0"}}></Divider>
                {/**/}
                <div style={{padding: "10px 10px 0 10px"}} className="d-flex justify-content-between">
                    <span style={{fontSize: "15px", fontWeight: 600}}>Họ Tên</span>
                    <span>{detailNhanVien.tenNhanVien}</span>
                </div>
                <Divider style={{margin: "10px 0"}}></Divider>
                {/**/}
                <div style={{padding: "10px 10px 0 10px"}} className="d-flex justify-content-between">
                    <span style={{fontSize: "15px", fontWeight: 600}}>Chức Vụ</span>
                    <span>{detailNhanVien.chucVu}</span>
                </div>
                <Divider style={{margin: "10px 0"}}></Divider>
                {/**/}
                <div style={{padding: "10px 10px 0 10px"}} className="d-flex justify-content-between">
                    <span style={{fontSize: "15px", fontWeight: 600}}>Kỳ OnBoard</span>
                    <span>{detailNhanVien.kyOnBroad}</span>
                </div>
                <Divider style={{margin: "10px 0"}}></Divider>
                {/**/}
                <div style={{padding: "10px 10px 0 10px"}} className="d-flex justify-content-between">
                    <span style={{fontSize: "15px", fontWeight: 600}}>Email FE</span>
                    <span>{detailNhanVien.taiKhoanFE}</span>
                </div>
                <Divider style={{margin: "10px 0"}}></Divider>
                {/**/}
                <div style={{padding: "10px 10px 0 10px"}} className="d-flex justify-content-between">
                    <span style={{fontSize: "15px", fontWeight: 600}}>Trạng Thái</span>
                    <span>{detailNhanVien.trangThai}</span>
                </div>
                <Divider style={{margin: "10px 0"}}></Divider>
                {/**/}
                <div style={{padding: "10px 10px 0 10px"}} className="d-flex justify-content-between">
                    <span style={{fontSize: "15px", fontWeight: 600}}>Tên Bộ Môn</span>
                    <span>{detailNhanVien.boMonCoSo}</span>
                </div>
                <Divider style={{margin: "10px 0"}}></Divider>
                {/**/}
                <div style={{padding: "10px 10px 15px 10px"}} className="d-flex justify-content-between">
                    <span style={{fontSize: "15px", fontWeight: 600}}>Loại Hợp Đồng</span>
                    <span>{detailNhanVien.loaiHopDong}</span>
                </div>
            </div>
        </Modal>
    )
}

export default DetailNhanVien