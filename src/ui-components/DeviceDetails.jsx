import React, { useState, useEffect } from "react";
import { getOverrideProps } from "./utils";
import { Button, Divider, Flex, Text } from "@aws-amplify/ui-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getUserInfo, deleteUser } from "../utils/helper";
import DeviceUserPanel from "./DeviceUserPanel";

export default function DeviceDetails(props) {
  const { overrides, ...rest } = props;
  const [activeTab, setActiveTab] = useState(0);
  const { devId } = useParams();

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
      position="relative"
      padding="32px 32px 32px 32px"
      {...getOverrideProps(overrides, "UserManagement")}
    >
      <Flex
        gap="16px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 4389")}
      >
        <NavLink to="/user-management/devices" className="link-default">
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="200"
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
          children="Back to Device Management"
          {...getOverrideProps(overrides, "Back to User Management")}
        ></Text>
        </NavLink>
        <Divider
          height="30px"
          shrink="0"
          size="small"
          orientation="vertical"
          {...getOverrideProps(overrides, "Divider2602101")}
        ></Divider>
        <Text
          fontFamily="Inter"
          fontSize="25px"
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
          grow="1"
          shrink="1"
          basis="0"
          position="relative"
          padding="8px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Device Details"
          {...getOverrideProps(overrides, "User Profile")}
        ></Text>
      </Flex>
      <Flex
        gap="10px"
        direction="row"
        width="unset"
        height="35px"
        justifyContent="flex-end"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="10px 10px 10px 10px"
        {...getOverrideProps(overrides, "Frame 4390")}
      ></Flex>
      <Flex
        gap="10px"
        direction="row"
        width="unset"
        height="100px"
        justifyContent="space-between"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="10px 0px 10px 0px"
        backgroundColor="rgba(248,248,248,1)"
        {...getOverrideProps(overrides, "Frame 4392")}
      >
        <Flex
          gap="0"
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
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Frame 4393")}
        >
          <Flex
            gap="3px"
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
            padding="10px 10px 10px 20px"
            {...getOverrideProps(overrides, "Frame 43953351206")}
          >
            <Text
              fontFamily="Inter"
              fontSize="16px"
              fontWeight="400"
              color="rgba(48,64,80,1)"
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
              children="Device ID"
              {...getOverrideProps(overrides, "Email")}
            ></Text>
            <Text
              fontFamily="Inter"
              fontSize="16px"
              fontWeight="400"
              color="rgba(0,0,0,1)"
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
              padding="10px 0px 0px 0px"
              whiteSpace="pre-wrap"
              children={devId}
              {...getOverrideProps(overrides, "animber@aleph0cap.com")}
            ></Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        gap="10px"
        direction="row"
        width="unset"
        height="50px"
        justifyContent="flex-start"
        alignItems="flex-end"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 25px 0px 25px"
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
            className={`user-management-tabs ${activeTab === 0 ? 'active' : ''}`}
            onClick={() => {setActiveTab(0);}}
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
            {...getOverrideProps(overrides, "Users")}
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
        {...getOverrideProps(overrides, "Divider2601989")}
      ></Divider>
      { activeTab === 0 && (<DeviceUserPanel devId={devId} />) }
    </Flex>
  );
}
