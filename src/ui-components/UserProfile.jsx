import React, { useState, useEffect } from "react";
import { getOverrideProps } from "./utils";
import { Button, Divider, Flex, Text } from "@aws-amplify/ui-react";
import { NavLink, useNavigate, useParams, Outlet } from "react-router-dom";
import { getUserInfo, deleteUser } from "../utils/helper";

export default function UserProfile(props) {
  const { overrides, ...rest } = props;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const { userName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo(userName, setEmail, setStatus);
  }, []);

  const goBack = () => {
    navigate('/user-management/users');
  }

  const onDeleteAccount = () => {
    deleteUser(userName, goBack);
  }

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
        <NavLink to="/user-management/users" className="link-default">
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
          children="Back to User Management"
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
          children="User Profile"
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
      >
        <Button
          onClick={onDeleteAccount}
          width="126px"
          height="unset"
          shrink="0"
          size="small"
          isDisabled={false}
          variation="default"
          children="Delete"
          {...getOverrideProps(overrides, "Button2602104")}
        ></Button>
      </Flex>
      <Flex
        gap="10px"
        direction="row"
        width="unset"
        height="150px"
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
            padding="10px 10px 10px 10px"
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
              children="Email"
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
              padding="0px 0px 0px 0px"
              whiteSpace="pre-wrap"
              children={email}
              {...getOverrideProps(overrides, "animber@aleph0cap.com")}
            ></Text>
          </Flex>
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
            padding="10px 10px 10px 10px"
            {...getOverrideProps(overrides, "Frame 43963351207")}
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
              children="Sub ID"
              {...getOverrideProps(overrides, "Sub ID")}
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
              padding="0px 0px 0px 0px"
              whiteSpace="pre-wrap"
              children="2f0316c7-26f0-4e2b-b34b-09fad8f10783"
              {...getOverrideProps(
                overrides,
                "2f0316c7-26f0-4e2b-b34b-09fad8f10783"
              )}
            ></Text>
          </Flex>
        </Flex>
        <Divider
          width="0.3px"
          height="unset"
          shrink="0"
          alignSelf="stretch"
          size="small"
          orientation="vertical"
          {...getOverrideProps(overrides, "Divider3351201")}
        ></Divider>
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
          {...getOverrideProps(overrides, "Frame 4394")}
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
            padding="10px 10px 10px 10px"
            {...getOverrideProps(overrides, "Frame 43953371216")}
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
              children="Account Status"
              {...getOverrideProps(overrides, "Account Status")}
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
              padding="0px 0px 0px 0px"
              whiteSpace="pre-wrap"
              children={status}
              {...getOverrideProps(overrides, "FORCE_CHANGE_PASSWORD")}
            ></Text>
          </Flex>
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
            padding="10px 10px 10px 10px"
            {...getOverrideProps(overrides, "Frame 43963371219")}
          ></Flex>
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
          <NavLink to="groups"
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
            children="Group Membership"
            {...getOverrideProps(overrides, "Users")}
          ></Text>
          </NavLink>
          <NavLink to="devices"
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
            {...getOverrideProps(overrides, "Users")}
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
        {...getOverrideProps(overrides, "Divider2601989")}
      ></Divider>
      <Outlet />
      {/* { activeTab === 0 && (<UserGroupPanel userName={userName} email={email} />) }
      { activeTab === 1 && (<UserDevicePanel email={email} />) } */}
    </Flex>
  );
}
