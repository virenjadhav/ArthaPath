import { Button, Col, Form, Input, Row, Upload } from 'antd'
import React, { useState } from 'react'
import { useCommonServiceAction } from '../Services/CommonServices';
import axiosService, { configureAxios } from '../../apis/axiosService';

const UploadComponent = ({
  name,
  label,
  buttonLabel,
  includeInLayout = true,
  visible = true,
  rules=null,
  formStyle=null,
  defaultUploadList = false,
  serviceId = null,
  serviceDetail= null,
  handleSelectImageHandler = null

}) => {
  const {commonServiceAction} = useCommonServiceAction();
  const [imageName, setImageName] = useState(null)
  configureAxios({
    baseURL: "https://api.example.com",
    contentType: "application/json",
  });
  const handleImageSelect = async (file) => {
    setImageName(file.name); // Set image name with extension in the input
    const formData = new FormData();
    formData.append("image", file);
    console.log(formData)
    console.log(file)

    // Send the image to the Rails backend
    // axios
    //   .post("/images/upload", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   })
    //   .then((response) => {
    //     message.success("Image uploaded successfully!");
    //     form.setFieldsValue({ image_name: file.name }); // Update form value
    //   })
    //   .catch((error) => {
    //     message.error("Image upload failed!");
    //     console.error(error);
    //   });

    // Prevent default upload behavior
    // return false;
    // axiosService
    //   .get("/endpoint") // '/endpoint' will be appended to baseURL
    //   .then((response) => {
    //     // setData(response.data); // Save response data
    //     console.log(response)
    //   })
    //   .catch((err) => {
    //     // setError(err.message); // Handle error
    //     console.log(err)
    //   });
    let urlId = ''
    let serviceDetail = {}
    if( !serviceId){
      urlId = 'upload_image'
      serviceDetail = {
        id: "upload_image",
        url: "image/upload_image",
        key: "upload_image",
        name: "generic/upload_image",
        method: "post",
      };
    }
    else{
      urlId = serviceId
      // url = serviceUrl
      // serviceDetail = {
      //   id: serviceId,
      //   url: serviceUrl,
      //   key: "upload_image",
      //   name: `generic/${serviceUrl}`,
      //   method: "post",
      // };
    }
    let payload = {
      data: formData
    }
    const axiosDetail = {
      baseURL: null,
       contentType:  "multipart/form-data"
    }
    await commonServiceAction(urlId,payload, afterActionHandler, serviceDetail,axiosDetail );
  };
  const afterActionHandler = (response) => {
    if(handleSelectImageHandler){
      handleSelectImageHandler(response);
    }
  }
  return (
   <>
    {includeInLayout && (
        <>
        <Form.Item name={name} label={label} rules={rules} style={formStyle}>
        
          {visible && (
             <Row gutter={8} align="middle">
              <Col span={20}>
                <Input value={imageName} disabled  />
              </Col>
              <Col span={4}>
              <Upload
            beforeUpload={handleImageSelect}
            showUploadList={defaultUploadList} // Disable default upload list
            accept="image/*" // Allow only image files
          >
            {/* <Button type="primary">{buttonLabel}</Button> */}
            
            <Button type="primary" style={{width: "10px"}}>..</Button>
          </Upload>
              </Col>
              </Row>
            
          )}
          
          </Form.Item>
          {/* <Form.Item label="Image Name" name="image_name" hidden>
          <Input value={imageName} disabled  />
        </Form.Item> */}
        </>
          )}
   </>
  )
}

export default UploadComponent