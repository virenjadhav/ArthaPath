import React, { useEffect } from "react";
import ButtonsAddEditComponent from "./ButtonsAddEditComponent";
import FormComponent from "./FormComponent";
import { Table, Pagination } from "antd";
import TableComponent from "./TableComponent";
import { useSelector } from "react-redux";

const ModelComponent = ({
  data1,
  columns,
  FormCustomComponent,
  deleteAction,
  navigatePath,
  refreshAction,
  moduleTitle,
  expandableTable = null,
}) => {
  const data = useSelector((state) => state.model.data);
  // const columns = useSelector((state) => state.model.columnsData);
  useEffect(() => {}, [data]);
  return (
    <div className="modelComponent">
      <div className="buttons">
        <ButtonsAddEditComponent
          deleteAction={deleteAction}
          navigatePath={navigatePath}
          refreshAction={refreshAction}
          moduleTitle={moduleTitle}
        />
      </div>
      <div className="tableComponent">
        {/* <Table columns={columns} dataSource={data} pagination={false} />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={data.length} 
                onChange={handleChangePage}
                showSizeChanger
                onShowSizeChange={(current, size) => setPageSize(size)}
            /> */}
        <TableComponent
          data={data}
          columns={columns}
          expandableTable={expandableTable}
        />
      </div>

      <FormComponent FormCustomComponent={FormCustomComponent} />
    </div>
  );
};

export default ModelComponent;

// All Model Field

{
  /* <Modal
  title="Add/Edit Transaction"
  visible={isModalVisible}
  onCancel={() => setIsModalVisible(false)}
  onOk={handleSaveTransaction}
  width={600} // Width of the modal
  bodyStyle={{ maxHeight: '400px', overflowY: 'auto' }} // Height and scroll control
>
  <Form layout="vertical">
    {/* Form fields go here */
}
//   </Form>
// </Modal> */}
