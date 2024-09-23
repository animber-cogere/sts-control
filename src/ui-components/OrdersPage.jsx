import * as React from "react";
import { getOverrideProps } from "./utils";
import { Divider, Flex, Text } from "@aws-amplify/ui-react";
import OrdersPanel from "./OrdersPanel";
import "./styles.css";

export default function OrdersPage(props) {
  const { overrides, ...rest } = props;

  return (
    <>
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
          children="Order Tickets"
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
          children="Order and issue tickets."
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
            <Text
              fontFamily="Inter"
              fontSize="16px"
              fontWeight="600"
              color="rgba(234,113,34,1)"
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
              children="Orders"
              {...getOverrideProps(overrides, "Users2113186")}
            ></Text>
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
        <OrdersPanel />
      </Flex>
    </>
  );
}
