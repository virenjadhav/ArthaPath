import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
const DropDownComponent = ({
  name,
  Menus,
  placement = "bottomLeft",
  trigger = ["click"],
  arrow = false, // Default false
  disabled = false, // Default false
  visible = undefined, // Default undefined, don't use null
  handleVisibleChange = null,
  updateFlag = null,
}) => {
  // const handleMenuClick = (e) => {
  //   // Update the dropdown value and set it in the form
  //   const selectedOption = e.key;
  //   setDropdownValue(selectedOption);
  //   form.setFieldsValue({ dropdownField: selectedOption });
  // };
  // Prepare props conditionally to avoid JSX parsing errors
  const dropdownProps = {};
  if (trigger) dropdownProps.trigger = trigger;
  if (placement) dropdownProps.placement = placement;
  if (arrow !== null) dropdownProps.arrow = arrow;
  if (visible !== null) dropdownProps.visible = visible;
  if (handleVisibleChange) dropdownProps.onVisibleChange = handleVisibleChange;
  if (disabled !== null) dropdownProps.disabled = disabled;
  // const menu = (
  //   <Menu
  //   onClick={onClickHandler}
  //    onSelect={handleSelectHandler}
  //    >
  //     <Menu.Item key="1">
  //       <a href="https://www.google.com">Google</a>
  //     </Menu.Item>
  //     <Menu.Item key="2">
  //       <a href="https://www.facebook.com">Facebook</a>
  //     </Menu.Item>
  //     <Menu.Item key="3">Option 3</Menu.Item>
  //   </Menu>
  // );
  return (
    <>
      <Dropdown
        overlay={Menus}
        // trigger={['click']}
        {...dropdownProps}
        componentType="DropDown"
        updateFlag={updateFlag}
      >
        <Button>
          Dropdown <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );
  // Common Dropdown Properties:
  // overlay: (Required) The menu or custom content to show in the dropdown.
  // trigger: The event that triggers the dropdown (click, hover, or contextMenu).
  // placement: The position where the dropdown appears (e.g., bottomLeft, topRight).
  // arrow: Whether to show an arrow pointing to the trigger element.
  // disabled: Disable the dropdown functionality.
  // visible: Control whether the dropdown is visible.
  // onVisibleChange: Callback when the dropdown visibility changes.
};

export default DropDownComponent;
