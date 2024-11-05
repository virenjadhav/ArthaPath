import React, { useEffect } from "react";
import { Modal, Input, Form, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import InputComponent from "../FormComponent/InputComponent";
import DateTimeComponent from "../FormComponent/DateTimeComponent";
import { useForm } from "antd/es/form/Form";
import { useFormRefreshAction } from "../Services/FormServices";
import dayjs from "dayjs";
import { setSearchCriteriaData } from "../../redux/features/generic/modelSlice";
import "../../assets/css/CriteriaStyle.css";
import InputDecimalNumberComponent from "../FormComponent/InputDecimalNumberComponent";

const CriteriaModel = ({ isSearchModelVisible, setIsSearchModelVisible }) => {
  const criteriaDataStru = useSelector((state) => state.model.criteriaDataStru);
  const [form] = useForm();
  const { formRefreshAction } = useFormRefreshAction();
  const dispatch = useDispatch();

  const renderInputField = (field) => {
    switch (field.dataType) {
      case "String":
        return (
          <InputComponent
            name={field.dataTag}
            label={field.label}
            key={field.dataTag}
          />
        );
      case "Number":
        return (
          <InputDecimalNumberComponent
            min={0}
            step={1}
            precision={0}
            name={field.dataTag}
            label={field.label}
          />
        );
      case "Date":
        return (
          <DateTimeComponent
            name={field.dataTag}
            label={field.label}
            form={form}
          />
        );
      default:
        return null;
    }
  };

  const handleCancelModelClickHandler = () => {
    setIsSearchModelVisible(false);
  };

  //   const handleModelOk = async (values) => {

  //     let searchData = {};
  //     if (criteriaDataStru) {
  //       Object.entries(criteriaDataStru).forEach(([key, value]) => {
  //         switch (value?.dataType) {
  //           case "String":
  //             searchData[value?.dataTag] = {
  //               value: values[value?.dataTag],
  //               type: "String",
  //             };
  //             break;
  //           case "Number":
  //             searchData[value?.dataTag] = {
  //               value: values[value?.dataTag],
  //               type: "Number",
  //             };
  //             break;
  //           case "Date":
  //             let dataValue = values[value?.dataTag]; // This should be the RangePicker value

  //             if (Array.isArray(dataValue)) {
  //               // Handle RangePicker case
  //               searchData[value?.dataTag] = {
  //                 value: dataValue.map((date) =>
  //                   date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss.SSS") : null
  //                 ),
  //                 type: "Date",
  //               };
  //             } else {
  //               // Handle single DatePicker case
  //               searchData[value?.dataTag] = {
  //                 value: dataValue
  //                   ? dayjs(dataValue).format("YYYY-MM-DD HH:mm:ss.SSS")
  //                   : null,
  //                 type: "Date",
  //               };
  //             }
  //             break;
  //           default:
  //         }
  //       });

  //       setSearchCriteriaData(searchData);

  //       let payload = {
  //         data: {
  //           criteriaSearchData: searchData,
  //         },
  //       };
  //       await formRefreshAction(payload);
  //     }
  //   };

  const handleModelOk = async (values) => {
    let searchData = {};
    if (criteriaDataStru) {
      Object.entries(criteriaDataStru).forEach(([key, value]) => {
        switch (value?.dataType) {
          case "String":
            searchData[value?.dataTag] = {
              value: values[value?.dataTag],
              type: "String",
            };
            break;
          case "Number":
            searchData[value?.dataTag] = {
              value: values[value?.dataTag],
              type: "Number",
            };
            break;
          case "Date":
            const dataValue = values[value?.dataTag]; // This should be the selected date value
            const dateType = values[value?.dataTag + "-type"];

            switch (dateType) {
              case "date":
                searchData[value?.dataTag] = {
                  value: dataValue
                    ? dayjs(dataValue).format("YYYY-MM-DD")
                    : null,
                  type: "Date",
                  dateType: dateType,
                };
                break;
              case "week":
                const startOfWeek = dayjs(dataValue)
                  .startOf("week")
                  .format("YYYY-MM-DD");
                const endOfWeek = dayjs(dataValue)
                  .endOf("week")
                  .format("YYYY-MM-DD");
                searchData[value?.dataTag] = {
                  value: [startOfWeek, endOfWeek],
                  type: "Date",
                  dateType: dateType,
                };
                break;
              case "month":
                searchData[value?.dataTag] = {
                  value: dayjs(dataValue).format("YYYY-MM"),
                  type: "Date",
                  dateType: dateType,
                };
                break;
              case "year":
                searchData[value?.dataTag] = {
                  value: dayjs(dataValue).format("YYYY"),
                  type: "Date",
                  dateType: dateType,
                };
                break;
              case "quarter":
                searchData[value?.dataTag] = {
                  value: dayjs(dataValue).format("YYYY-[Q]Q"),
                  type: "Date",
                  dateType: dateType,
                };
                break;
              case "range":
                if (Array.isArray(dataValue)) {
                  searchData[value?.dataTag] = {
                    value: dataValue.map((date) =>
                      date
                        ? dayjs(date).format("YYYY-MM-DD HH:mm:ss.SSS")
                        : null
                    ),
                    type: "Date",
                    dateType: dateType,
                  };
                }
                break;
              //   case "time":
              //     // Assuming the TimePicker returns a single moment object for both start and end time
              //     if (Array.isArray(dataValue)) {
              //       searchData[value?.dataTag] = {
              //         value: dataValue.map((time) =>
              //           time ? dayjs(time).format("HH:mm:ss") : null
              //         ),
              //         type: "Time",
              //         dateType: dateType,
              //       };
              //     }
              //     break;
              default:
                console.log("Unhandled date type");
            }
            break;
          default:
            console.log("default");
        }
      });
      dispatch(setSearchCriteriaData(searchData));

      let payload = {
        data: {
          criteriaSearchData: searchData,
        },
      };
      await formRefreshAction(payload);
      handleCancelModelClickHandler();
    }
  };
  //   const handleModelOk = async (values) => {
  //     let searchData = {};
  //     Object.entries(criteriaDataStru).forEach(([key, value]) => {
  //       if (value?.dataTag) {
  //         searchData[value?.dataTag] = {
  //           value: values[value?.dataTag],
  //           type: value?.dataType,
  //         };
  //       }
  //     });

  //     // Format Date if necessary
  //     for (const key in searchData) {
  //       if (searchData[key].type === "Date" && searchData[key].value) {
  //         searchData[key].value = searchData[key].value
  //           ? dayjs(searchData[key].value).format("YYYY-MM-DD HH:mm:ss")
  //           : null;
  //       }
  //     }

  //     setSearchCriteriaData(searchData);
  //     let payload = {
  //       data: {
  //         criteriaSearchData: searchData,
  //       },
  //     };
  //     await formRefreshAction(payload);
  //   };

  return (
    <Modal
      title=""
      visible={isSearchModelVisible}
      onCancel={handleCancelModelClickHandler}
      footer={null}
      className="criteria-model"
    >
      <Form
        form={form}
        onFinish={handleModelOk}
        layout="horizontal"
        style={{ marginTop: "50px" }}
      >
        {criteriaDataStru?.map((field) => (
          <div key={field.key} style={{ marginBottom: "16px" }}>
            {renderInputField(field)}
          </div>
        ))}
        <Form.Item>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button type={"primary"} htmlType="submit">
              Search
            </Button>
            <Button
              type="default"
              htmlType="button"
              onClick={handleCancelModelClickHandler}
            >
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CriteriaModel;

// import React, { useEffect } from "react";
// import { Modal, Input, DatePicker, Form, Button } from "antd";
// import { useSelector } from "react-redux";
// import InputComponent from "../FormComponent/InputComponent";
// import DateComponent from "../FormComponent/DateComponent";
// import FormAddEdit from "../FormComponent/FormAddEdit";
// import { useForm } from "antd/es/form/Form";
// import { useFormRefreshAction } from "../FormComponent/FormServices";
// import dayjs from "dayjs";
// import { setSearchCriteriaData } from "../../redux/features/generic/modelSlice";
// import InputDecimalNumberComponent from "../FormComponent/InputDecimalNumberComponent";
// import DateTimeComponent from "../FormComponent/DateTimeComponent";
// import "../../assets/css/CriteriaStyle.css";
// // Sample JSON array
// // const dataFields = [
// //   {
// //     dataType: "String",
// //     label: "Trans #",
// //     dataTag: "trans_no",
// //   },
// //   {
// //     dataType: "Date",
// //     label: "Trans Date",
// //     dataTag: "trans_date",
// //   },
// // ];

// const CriteriaModel = ({ isSearchModelVisible, setIsSearchModelVisible }) => {
//   const criteriaDataStru = useSelector((state) => state.model.criteriaDataStru);
//   const [form] = useForm();
//   const { formRefreshAction } = useFormRefreshAction();
//   useEffect(() => {
//   }, [criteriaDataStru]);

//   //   useEffect(() => {
//   //     if (criteriaData) {
//   //       form.setFieldsValue(criteriaData);
//   //     } else {
//   //       form.resetFields();
//   //     }
//   //   }, [form]);

//   const renderInputField = (field) => {
//     switch (field.dataType) {
//       case "String":
//         return (
//           //   <Input
//           //     placeholder={field.label}
//           //     name={field.dataTag}
//           //     key={field.dataTag}
//           //   />
//           <InputComponent
//             name={field.dataTag}
//             label={field.label}
//             key={field.key}
//             // formStyle={{ width: "400px" }}
//             //   disabled={isEditing ? true : false}
//             //   includeInLayout={isEditing ? true : false}
//             //   customComponentProps={{ updateFlag: true }}
//             //   isBold={true}
//           />
//         );
//       case "Number":
//         return (
//           <InputDecimalNumberComponent
//             min={0}
//             step={1}
//             precision={0}
//             name={field.dataTag}
//             label={field.label}
//           />
//         );
//       case "Date":
//         return (
//           //   <DatePicker
//           //     placeholder={field.label}
//           //     name={field.dataTag}
//           //     key={field.key}
//           //   />
//           <DateTimeComponent
//             name={field.dataTag}
//             label={field.label}
//             //   rules={[
//             //     { required: true, message: "Please select the transaction date!" },
//             //   ]}
//             formate={"YYYY-MM-DD"}
//             //   customComponentProps={{ updateFlag: true }}
//           />
//         );
//       default:
//         return null;
//     }
//   };
//   const formElements = criteriaDataStru?.map((field) => (
//     <div key={field.key} style={{ marginBottom: "16px" }}>
//       {/* <label>{field.label}</label> */}
//       {renderInputField(field)}
//     </div>
//   ));
//   const handleCancelModelClickHandler = () => {
//     setIsSearchModelVisible(false);
//   };
//   const handleModelOk = async (values) => {
//     let searchData = {};
//     if (criteriaDataStru) {
//       Object.entries(criteriaDataStru).forEach(([key, value]) => {
//         switch (value?.dataType) {
//           case "String":
//             searchData[value?.dataTag] = {
//               value: values[value?.dataTag],
//               type: "String",
//             };
//             break;
//           case "Number":
//             searchData[value?.dataTag] = {
//               value: values[value?.dataTag],
//               type: "Number",
//             };
//             break;
//           case "Date":
//             // saveData = {
//             //   ...saveData,
//             //   [key]: value
//             //     ? dayjs(value).format("YYYY-MM-DD HH:mm:ss.SSS")
//             //     : null,
//             // };
//             let dataValue = values[value?.dataTag];
//             searchData[value?.dataTag] = {
//               value: dataValue
//                 ? dayjs(dataValue).format("YYYY-MM-DD HH:mm:ss.SSS")
//                 : null,
//               type: "Date",
//             };
//             break;
//           default:
//         }
//       });
//       setSearchCriteriaData(searchData);
//       let payload = {
//         data: {
//           criteriaSearchData: searchData,
//         },
//       };
//       await formRefreshAction(payload);
//     }
//   };
//   return (
//     <>
//       <Modal
//         title={""}
//         visible={isSearchModelVisible}
//         onCancel={handleCancelModelClickHandler}
//         // onOk={}
//         footer={null}
//         className="criteria-model"
//       >
//         {/* <FormAddEdit
//           style={{ marginTop: "50px" }}
//           activeButtonTitle="Search"
//           isCancleButtonVisible={true}
//           handleCancelModel={handleCancelModelClickHandler}
//         >
//           {formElements}
//         </FormAddEdit> */}
//         <Form
//           form={form}
//           // initialValues={selectedRecord || {}}
//           onFinish={handleModelOk}
//           layout="horizontal"
//           style={{ marginTop: "50px" }}
//           onCancel={handleCancelModelClickHandler}
//         >
//           {formElements}
//           <Form.Item>
//             <div style={{ display: "flex", gap: "10px" }}>
//               <Button type={"primary"} htmlType="submit">
//                 Search
//               </Button>

//               <Button
//                 type="default"
//                 htmlType="button"
//                 onClick={handleCancelModelClickHandler}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default CriteriaModel;
