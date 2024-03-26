import { Spin } from "antd";

const Loading = () => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10000000000000000,
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      >
        <div className="d-flex justify-content-center align-items-center h-100">
          <Spin size="large" />
        </div>
      </div>
    </>
  );
};

export default Loading;
