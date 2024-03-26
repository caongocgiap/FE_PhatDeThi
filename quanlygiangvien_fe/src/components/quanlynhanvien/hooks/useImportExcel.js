import {importExcelNhanVien_API} from "../../../apis/QuanLyNhanVienAPI";
import {toast} from "react-toastify";

export const useImportExcel = () => {

    const handleImportExcel = (file) => {
        return new Promise((resolve,reject)=>{
            file.addEventListener("change", async function onChange (e) {
                if(e.target.files[0]){
                    try{
                        let formData = new FormData();
                        formData.append("file",e.target.files[0]);
                        const response = await importExcelNhanVien_API(formData);
                        if(response && response.status === 201){
                            toast.success(response.data);
                            file.removeEventListener("change", onChange);
                            resolve(response.status);
                        }
                    }catch (e) {
                        for (let message in e.response.data){
                            toast.error(e.response.data[message]);
                        }
                        file.removeEventListener("change", onChange);
                        reject(e.response.data);
                    }
                }
            })
        })
    }

    return {handleImportExcel}
}
