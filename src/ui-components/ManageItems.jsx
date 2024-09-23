import { Flex, View, Icon, Text } from "@aws-amplify/ui-react";
import { getOverrideProps } from "./utils";
import React from 'react';
import './styles.css';
import { NavLink } from "react-router-dom";

export default function ManageItems(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="0px"
      direction="column"
      width="254px"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      shrink="0"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Section")}
    >
      <Text
        fontFamily="Inter"
        fontSize="16px"
        fontWeight="600"
        color="rgba(92,102,112,1)"
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
        padding="0px 0px 20px 10px"
        whiteSpace="pre-wrap"
        children="Manage"
        {...getOverrideProps(overrides, "label")}
      ></Text>
      <NavLink to="/user-management/users"
        className={({ isActive }) =>
          isActive ? "active-link" : "inactive-link" }>
      <Flex
        gap="8px"
        direction="row"
        width="225px"
        height="45px"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 10px"
        {...getOverrideProps(overrides, "link1711709")}
      >
        <Flex
          gap="0"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="flex-start"
          shrink="0"
          position="relative"
          borderRadius="4px"
          padding="6px 6px 6px 6px"
          {...getOverrideProps(overrides, "icon1711710")}
        >
          <View
            width="18px"
            height="18px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "MyIcon1731717")}
          >
            <Icon
              width="15px"
              height="10.5px"
              viewBox={{ minX: 0, minY: 0, width: 15, height: 10.5 }}
              paths={[
                {
                  d: "M5.25 6.5625C3.495 6.5625 0 7.44 0 9.1875L0 10.5L10.5 10.5L10.5 9.1875C10.5 7.44 7.005 6.5625 5.25 6.5625ZM1.755 9C2.385 8.565 3.9075 8.0625 5.25 8.0625C6.5925 8.0625 8.115 8.565 8.745 9L1.755 9ZM5.25 5.25C6.6975 5.25 7.875 4.0725 7.875 2.625C7.875 1.1775 6.6975 0 5.25 0C3.8025 0 2.625 1.1775 2.625 2.625C2.625 4.0725 3.8025 5.25 5.25 5.25ZM5.25 1.5C5.8725 1.5 6.375 2.0025 6.375 2.625C6.375 3.2475 5.8725 3.75 5.25 3.75C4.6275 3.75 4.125 3.2475 4.125 2.625C4.125 2.0025 4.6275 1.5 5.25 1.5ZM10.53 6.6075C11.4 7.2375 12 8.0775 12 9.1875L12 10.5L15 10.5L15 9.1875C15 7.6725 12.375 6.81 10.53 6.6075L10.53 6.6075ZM9.75 5.25C11.1975 5.25 12.375 4.0725 12.375 2.625C12.375 1.1775 11.1975 0 9.75 0C9.345 0 8.97 0.0974999 8.625 0.2625C9.0975 0.93 9.375 1.7475 9.375 2.625C9.375 3.5025 9.0975 4.32 8.625 4.9875C8.97 5.1525 9.345 5.25 9.75 5.25Z",
                  fillRule: "nonzero",
                },
              ]}
              display="block"
              gap="unset"
              alignItems="unset"
              justifyContent="unset"
              position="absolute"
              top="20.83%"
              bottom="20.83%"
              left="8.33%"
              right="8.33%"
              {...getOverrideProps(overrides, "Vector1731718")}
            ></Icon>
          </View>
        </Flex>
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="400"
          lineHeight="24px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          letterSpacing="0.01px"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="User Management"
          {...getOverrideProps(overrides, "UserManagement")}
        ></Text>
      </Flex>
      </NavLink>
      <NavLink to="/order-tickets"
        className={({ isActive }) =>
          isActive ? "active-link" : "inactive-link" }>
      <Flex
        gap="8px"
        direction="row"
        width="225px"
        height="45px"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 10px"
        {...getOverrideProps(overrides, "link1711704")}
      >
        <Flex
          gap="0"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="flex-start"
          shrink="0"
          position="relative"
          borderRadius="4px"
          padding="6px 6px 6px 6px"
          {...getOverrideProps(overrides, "icon1711705")}
        >
          <View
            width="18px"
            height="18px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "MyIcon1711706")}
          >
            <Icon
              width="13.5px"
              height="16.5px"
              viewBox={{
                minX: 0,
                minY: 0,
                width: 13.5,
                height: 16.5,
              }}
              paths={[
                {
                  d: "M12 1.5L8.865 1.5C8.55 0.63 7.725 0 6.75 0C5.775 0 4.95 0.63 4.635 1.5L1.5 1.5C0.675 1.5 0 2.175 0 3L0 15C0 15.825 0.675 16.5 1.5 16.5L12 16.5C12.825 16.5 13.5 15.825 13.5 15L13.5 3C13.5 2.175 12.825 1.5 12 1.5ZM6.75 1.5C7.1625 1.5 7.5 1.8375 7.5 2.25C7.5 2.6625 7.1625 3 6.75 3C6.3375 3 6 2.6625 6 2.25C6 1.8375 6.3375 1.5 6.75 1.5ZM12 15L1.5 15L1.5 3L3 3L3 5.25L10.5 5.25L10.5 3L12 3L12 15Z",
                  fillRule: "nonzero",
                },
              ]}
              display="block"
              gap="unset"
              alignItems="unset"
              justifyContent="unset"
              position="absolute"
              top="4.17%"
              bottom="4.17%"
              left="12.5%"
              right="12.5%"
              {...getOverrideProps(overrides, "Vector1711707")}
            ></Icon>
          </View>
        </Flex>
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="400"
          lineHeight="24px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          letterSpacing="0.01px"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Order Tickets"
          {...getOverrideProps(overrides, "OrderTickets")}
        ></Text>
      </Flex>
      </NavLink>
    </Flex>
  );
};
