/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Button, Flex, Icon, Text, TextField, View } from "@aws-amplify/ui-react";
import Modal from "react-modal";
import { issueTickets } from "../utils/helper";

export default function IssueTickets(props) {
  const { overrides, ...rest } = props;

  const onIssue = () => {
    const bundle = document.getElementById('Name').value;
    const devId = document.getElementById('DeviceId').value;
    issueTickets(bundle, devId, props.onClose);
  }

  const onClose = () => {
    props.onClose("Issue", false);
  }

  return (
    <Modal
      isOpen={true}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          width: '544px',
          height: '370px',
          margin: 'auto',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '0px',
        },
      }}
    >
    <Flex
      gap="0"
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "IssueTickets")}
      {...rest}
    >
      <Flex
        gap="10px"
        direction="column"
        width="unset"
        height="63px"
        justifyContent="center"
        alignItems="flex-start"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 10px 0px 10px"
        backgroundColor="rgba(239,240,240,1)"
        {...getOverrideProps(overrides, "Frame 4384")}
      >
        <Flex
          gap="10px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="space-between"
          alignItems="center"
          grow="1"
          shrink="1"
          basis="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Frame 4388")}
        >
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
            height="unset"
            gap="unset"
            alignItems="unset"
            grow="1"
            shrink="1"
            basis="0"
            alignSelf="stretch"
            position="relative"
            padding="13px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Issue Tickets"
            {...getOverrideProps(overrides, "Order Tickets")}
          ></Text>
          <View
            width="24px"
            height="24px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "\uD83D\uDD12Icon")}
          >
            <Icon
              onClick={onClose}
              width="14px"
              height="14px"
              viewBox={{ minX: 0, minY: 0, width: 14, height: 14 }}
              paths={[
                {
                  d: "M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z",
                  fill: "rgba(13,26,38,1)",
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
              left="20.83%"
              right="20.83%"
              {...getOverrideProps(overrides, "Vector")}
            ></Icon>
          </View>
        </Flex>
      </Flex>
      <Flex
        gap="10px"
        direction="column"
        width="unset"
        height="238px"
        justifyContent="center"
        alignItems="flex-start"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="16px 32px 16px 32px"
        backgroundColor="rgba(250,250,250,1)"
        {...getOverrideProps(overrides, "NavBarHeader2")}
      >
        <TextField
          id="Name"
          width="480px"
          height="unset"
          label="Name"
          placeholder="55123"
          shrink="0"
          size="default"
          isDisabled={false}
          labelHidden={false}
          variation="default"
          {...getOverrideProps(overrides, "TextField2601092")}
        ></TextField>
        <TextField
          id="DeviceId"
          width="480px"
          height="unset"
          label="Device ID"
          placeholder="STS-1234-1234567"
          shrink="0"
          size="default"
          isDisabled={false}
          labelHidden={false}
          variation="default"
          {...getOverrideProps(overrides, "TextField2601131")}
        ></TextField>
      </Flex>
      <Flex
        gap="10px"
        direction="row"
        width="unset"
        height="64px"
        justifyContent="flex-end"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="10px 10px 10px 10px"
        backgroundColor="rgba(250,250,250,1)"
        {...getOverrideProps(overrides, "Frame 4383")}
      >
        <Flex
          gap="14px"
          direction="row"
          width="262px"
          height="unset"
          justifyContent="flex-start"
          alignItems="flex-start"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "actions")}
        >
          <Button
            onClick={onClose}
            width="115px"
            height="unset"
            shrink="0"
            size="small"
            isDisabled={false}
            variation="default"
            children="Cancel"
            {...getOverrideProps(overrides, "Button2601096")}
          ></Button>
          <Button
            onClick={onIssue}
            width="128px"
            height="unset"
            shrink="0"
            backgroundColor="rgba(234,113,34,1)"
            size="small"
            isDisabled={false}
            variation="primary"
            children="Issue"
            {...getOverrideProps(overrides, "Button2601097")}
          ></Button>
        </Flex>
      </Flex>
    </Flex>
    </Modal>
  );
}
