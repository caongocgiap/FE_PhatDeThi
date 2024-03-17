import "./App.css";
import {ToastContainer} from "react-toastify";
import {BrowserRouter as Router, Outlet, Route, Routes} from "react-router-dom";
import Error404Page from "./pages/404page/Error404Page";
import DashBroardBanDaoTao from "./layout/DashBroardBanDaoTao";
import QuanLyCoSo from "./components/quanlycoso/QuanLyCoSo";
import QuanLyMonHoc from "./components/quanlymonhoc/QuanLyMonHoc";
import QuanLyNhanVien from "./components/quanlynhanvien/layout/QuanLyNhanVien";
import QuanLyBoMon from "./components/quanlybomon/QuanLyBoMon";
import QuanLyChucVu from "./components/quanlychucvu/QuanLyChucVu";
import AddOrUpdateNhanVien from "./components/quanlynhanvien/layout/AddOrUpdateNhanVien";
import QuanLyHocKy from "./components/quanlyhocky/layout/QuanLyHocKy";
import QuanLyLopMon from "./components/quanlylopmon/layout/QuanLyLopMon";
import QuanLyLopMonAddOrUpdate from "./components/quanlylopmon/layout/QuanLyLopMonAddOrUpdate";
import {LopMonProvider} from "./components/quanlylopmon/store/provider/Provider";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="*" element={<Error404Page/>}/>
          <Route path="/bandaotao" element={<DashBroardBanDaoTao/>}/>
            <Route
                path="/bandaotao/quan-ly-co-so"
                element={
                    <DashBroardBanDaoTao>
                        <QuanLyCoSo />
                    </DashBroardBanDaoTao>
                }
            />
            <Route
                path="/bandaotao/quan-ly-mon-hoc"
                element={
                    <DashBroardBanDaoTao>
                        <QuanLyMonHoc/>
                    </DashBroardBanDaoTao>
                }
            />
            <Route
                path="/bandaotao/quan-ly-hoc-ky"
                element={
                    <DashBroardBanDaoTao>
                        <QuanLyHocKy/>
                    </DashBroardBanDaoTao>
                }
            />
            {/*START QLNV*/}
            <Route
                path="/bandaotao/quan-ly-nhan-vien"
                element={
                    <DashBroardBanDaoTao>
                        <Outlet/>
                    </DashBroardBanDaoTao>
                }
            >
                {/*render khi route là /bandaotao/quan-ly-nhan-vien */}
                <Route index element={
                    <QuanLyNhanVien/>
                }/>
                <Route path="them-nhan-vien" element={
                    <AddOrUpdateNhanVien/>
                }/>
                <Route path="sua-nhan-vien/:id" element={
                    <AddOrUpdateNhanVien/>
                }/>
            </Route>
            {/*END QLNV*/}
            <Route
                path="/bandaotao/quan-ly-bo-mon"
                element={
                    <DashBroardBanDaoTao>
                        <QuanLyBoMon/>
                    </DashBroardBanDaoTao>
                }
            />
            <Route
                path="/bandaotao/quan-ly-chuc-vu"
                element={
                    <DashBroardBanDaoTao>
                        <QuanLyChucVu/>
                    </DashBroardBanDaoTao>
                }
            />
            {/*START QLLM*/}
            <Route
                path={"/bandaotao/quan-ly-lop-mon"}
                element={
                    <DashBroardBanDaoTao>
                        <LopMonProvider>
                            <Outlet/>
                        </LopMonProvider>
                    </DashBroardBanDaoTao>
                }
            >
                <Route index element={
                    <QuanLyLopMon/>
                } />
                <Route path="them-lop-mon" element={
                    <QuanLyLopMonAddOrUpdate/>
                }/>
                <Route path="sua-lop-mon/:id" element={
                    <QuanLyLopMonAddOrUpdate/>
                }/>
            </Route>
            {/*END QLLM*/}
        </Routes>
      </Router>
    </>
  );
}

export default App;
