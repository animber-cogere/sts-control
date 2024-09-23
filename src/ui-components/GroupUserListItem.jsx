import { Text, Flex, CheckboxField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "./utils";
import React, { useState, useEffect } from "react";
import { getLocaleDate, getUserEmail } from "../utils/helper";
import { NavLink } from 'react-router-dom';
import "./styles.css";

export default function GroupUserListItem(props) {
  const { overrides, ...rest } = props;
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(props.item.checked);
  }, [props.item.checked])

  return (
    <Flex
      className={checked ? "listItem-checked" : "listItem"}
      gap="20px"
      direction="row"
      width="unset"
      height="50px"
      justifyContent="flex-start"
      alignItems="center"
      shrink="0"
      alignSelf="stretch"
      position="relative"
      padding="16px 0px 16px 0px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "DataRow353398")}
    >
      <CheckboxField
        onChange={(e) => {
          setChecked(e.target.checked);
          props.handleChecked(props.item, e.target.checked);
        }}
        checked={checked}
        width="51px"
        height="unset"
        shrink="0"
        size="default"
        defaultChecked={false}
        isDisabled={false}
        labelPosition="end"
        {...getOverrideProps(overrides, "CheckboxField353399")}
      ></CheckboxField>
      <NavLink className='link-default' to={`/user-management/user-details/${props.item.Username}/groups`}>
      <Text
        fontFamily="Inter"
        fontSize="14px"
        fontWeight="400"
        color="rgba(64,106,191,1)"
        lineHeight="21px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="300px"
        height="unset"
        gap="unset"
        alignItems="unset"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={getUserEmail(props.item)}
        {...getOverrideProps(overrides, "Email353400")}
      ></Text>
      </NavLink>
      <Text
        fontFamily="Inter"
        fontSize="14px"
        fontWeight="400"
        color="rgba(13,26,38,1)"
        lineHeight="21px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        grow="1"
        shrink="1"
        basis="0"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={getLocaleDate(props.item.UserCreateDate)}
        {...getOverrideProps(overrides, "Created Date353401")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="14px"
        fontWeight="400"
        color="rgba(13,26,38,1)"
        lineHeight="21px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        grow="1"
        shrink="1"
        basis="0"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={props.item.UserStatus}
        {...getOverrideProps(overrides, "Created Date353402")}
      ></Text>
    </Flex>
  );
}