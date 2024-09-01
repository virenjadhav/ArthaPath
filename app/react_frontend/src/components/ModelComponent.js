import React from 'react';
import ButtonComponent from './ButtonComponent';
import FormComponent from './FormComponent';
import { Table, Pagination } from "antd";
import TableComponent from './TableComponent';

const ModelComponent = ({data, columns, setData}) => {
  return (
    <div className='modelComponent'>
        <div className="buttons">
            <ButtonComponent />
        </div>
        <div className='tableComponent'>
            {/* <Table columns={columns} dataSource={data} pagination={false} />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={data.length} 
                onChange={handleChangePage}
                showSizeChanger
                onShowSizeChange={(current, size) => setPageSize(size)}
            /> */}
            <TableComponent data={data}  columns = {columns} setData = {setData} />
        </div>
        <FormComponent />
    </div>
  )
}

export default ModelComponent;

// All Model Field

{/* <Modal
  title="Add/Edit Transaction"
  visible={isModalVisible}
  onCancel={() => setIsModalVisible(false)}
  onOk={handleSaveTransaction}
  width={600} // Width of the modal
  bodyStyle={{ maxHeight: '400px', overflowY: 'auto' }} // Height and scroll control
>
  <Form layout="vertical">
    {/* Form fields go here */}
//   </Form>
// </Modal> */}
