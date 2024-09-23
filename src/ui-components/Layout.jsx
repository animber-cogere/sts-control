import * as React from "react";
import { getOverrideProps } from "./utils";
import { Divider, Button, Flex, Text } from "@aws-amplify/ui-react";
import ManageItems from "./ManageItems"
import { Outlet } from "react-router-dom";
import LongToaster from './LongToaster';

export default function Layout(props) {
  const { overrides, ...rest } = props;
  return (
    <>
      <Flex
        gap="0"
        direction="column"
        width="95vw"
        height="835px"
        justifyContent="space-between"
        alignItems="flex-start"
        position="relative"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(255,255,255,1)"
        {...getOverrideProps(overrides, "Users")}
        {...rest}
      >
        <Flex
          gap="40px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="center"
          alignItems="center"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="24px 32px 24px 32px"
          backgroundColor="rgba(255,255,255,1)"
          {...getOverrideProps(overrides, "NavBarHeader")}
        >
          <Text
            fontFamily="Inter"
            fontSize="30px"
            fontWeight="500"
            color="rgba(0,0,0,1)"
            lineHeight="36.30681610107422px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            width="441px"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="STS Control Panel"
            {...getOverrideProps(overrides, "StsControlPanel")}
          ></Text>
          <Flex
            gap="32px"
            direction="row"
            width="unset"
            height="unset"
            justifyContent="flex-end"
            alignItems="center"
            grow="1"
            shrink="1"
            basis="0"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Frame 321353323")}
          >
            <Button
              onClick={ props.signOut }
              width="128px"
              height="unset"
              shrink="0"
              size="small"
              isDisabled={false}
              variation="destructive"
              children="SIGN OUT"
              {...getOverrideProps(overrides, "Button353332")}
            ></Button>
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
        <Flex
          gap="0"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="flex-start"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "main")}
        >
          <Flex
            gap="10px"
            direction="row"
            width="307px"
            height="751px"
            justifyContent="flex-start"
            alignItems="flex-start"
            shrink="0"
            position="relative"
            padding="32px 0px 32px 0px"
            {...getOverrideProps(overrides, "SideBar")}
          >
            <Flex
              gap="32px"
              direction="column"
              width="unset"
              height="693px"
              justifyContent="flex-start"
              alignItems="flex-start"
              grow="1"
              shrink="1"
              basis="0"
              position="relative"
              padding="0px 0px 0px 0px"
              {...getOverrideProps(overrides, "Frame 321353337")}
            >
              <Flex
                gap="32px"
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
                padding="0px 32px 0px 32px"
                {...getOverrideProps(overrides, "Frame 321353338")}
              >
                <ManageItems />
              </Flex>
            </Flex>
          </Flex>
          <Outlet />
        </Flex>
      </Flex>
      <LongToaster />
    </>
  );
}
