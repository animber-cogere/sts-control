import { Text, Flex, Divider } from "@aws-amplify/ui-react";
import { getOverrideProps } from "./utils";
import React from "react";
import './styles.css';
import { NavLink, Outlet } from "react-router-dom";

export default function UserManagement(props) {
  const { overrides, ...rest } = props;

  return (
    <Flex
      gap="16px"
      direction="column"
      width="unset"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      grow="1"
      shrink="1"
      basis="0"
      alignSelf="stretch"
      position="relative"
      padding="32px 32px 32px 32px"
      {...getOverrideProps(overrides, "UserManagement")}
    >
      <Text
        fontFamily="Inter"
        fontSize="30px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        lineHeight="36.30681610107422px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="51px"
        gap="unset"
        alignItems="unset"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="User Management"
        {...getOverrideProps(overrides, "User Management")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="16px"
        fontWeight="400"
        color="rgba(92,102,112,1)"
        lineHeight="16.94318199157715px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="33px"
        gap="unset"
        alignItems="unset"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Create, view, and manage users and groups and devices."
        {...getOverrideProps(
          overrides,
          "Create, view, and manage users and groups and devices."
        )}
      ></Text>
      <Flex
        gap="10px"
        direction="row"
        width="unset"
        height="73px"
        justifyContent="flex-start"
        alignItems="flex-end"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="16px 32px 16px 32px"
        backgroundColor="rgba(255,255,255,1)"
        {...getOverrideProps(overrides, "NavBarHeader2")}
      >
        <Flex
          gap="32px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="center"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Frame 5")}
        >
          <NavLink to="/user-management/users"
            className={({ isActive }) =>
              isActive ? "active-sub-link" : "inactive-sub-link" }>
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="600"
            lineHeight="24px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Users"
            {...getOverrideProps(overrides, "Users353622")}
          ></Text>
          </NavLink>
          <NavLink to="/user-management/groups"
            className={({ isActive }) =>
            isActive ? "active-sub-link" : "inactive-sub-link" }>
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="600"
            lineHeight="24px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Groups"
            {...getOverrideProps(overrides, "Groups")}
          ></Text>
          </NavLink>
          <NavLink to="/user-management/devices"
            className={({ isActive }) =>
            isActive ? "active-sub-link" : "inactive-sub-link" }>
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="600"
            lineHeight="24px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Devices"
            {...getOverrideProps(overrides, "Devices")}
          ></Text>
          </NavLink>
        </Flex>
      </Flex>
      <Divider
        width="unset"
        height="1px"
        shrink="0"
        alignSelf="stretch"
        size="small"
        orientation="horizontal"
        {...getOverrideProps(overrides, "Divider")}
      ></Divider>
      <Outlet />
    </Flex>
  );
}
