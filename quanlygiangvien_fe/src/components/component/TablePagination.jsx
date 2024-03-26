import { Pagination, Table } from "antd";

const TablePaginaton = ({
  column,
  data,
  total,
  pageNo,
  pageSize,
  handlePageChange,
}) => {
  return (
    <>
      <div>
        <div className={"min-height-500"}>
          <Table
            columns={column}
            dataSource={data}
            pagination={false}
            scroll={{ x: true }}
          />
        </div>
        <Pagination
          current={pageNo}
          pageSize={pageSize}
          total={total}
          defaultCurrent={1}
          onChange={(page, pageSize) => handlePageChange(page, pageSize)}
        />
      </div>
    </>
  );
};
export default TablePaginaton;
