import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error404Page from "./pages/404page/Error404Page";
import DashBroardBanDaoTao from "./layout/DashBroardBanDaoTao";
import QuanLyCoSo from "./components/quanlycoso/QuanLyCoSo";
import QuanLyMonHoc from "./components/quanlymonhoc/QuanLyMonHoc";
import QuanLyHocKy from "./components/quanlyhocky/layout/QuanLyHocKy";
import QuanLyNhanVien from "./components/quanlynhanvien/layout/QuanLyNhanVien";
import QuanLyBoMon from "./components/quanlybomon/QuanLyBoMon";
import QuanLyChucVu from "./components/quanlychucvu/QuanLyChucVu";
import AddOrUpdateNhanVien from "./components/quanlynhanvien/layout/AddOrUpdateNhanVien";
import QuanLyGiaoVienDayMon from './components/quanlygiaoviendaymon/layout/QuanLyGiaoVienDayMon'

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
                        <QuanLyNhanVien/>
                    </DashBroardBanDaoTao>
                }
            >
            </Route>
            <Route path="/bandaotao/quan-ly-nhan-vien/them-nhan-vien" element={
                <DashBroardBanDaoTao>
                    <AddOrUpdateNhanVien/>
                </DashBroardBanDaoTao>
            }/>
            <Route path="/bandaotao/quan-ly-nhan-vien/sua-nhan-vien/:id" element={
                <DashBroardBanDaoTao>
                    <AddOrUpdateNhanVien/>
                </DashBroardBanDaoTao>
            }/>
            END QLNV
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
            <Route
                path="/bandaotao/quan-ly-giao-vien-day-mon"
                element={
                    <DashBroardBanDaoTao>
                        <QuanLyGiaoVienDayMon />
                    </DashBroardBanDaoTao>
                }
            />
        </Routes>
      </Router>
    </>
  );
}

export default App;
