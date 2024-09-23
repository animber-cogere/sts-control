import React, { useState, useEffect } from "react";
import { getOverrideProps } from "./utils";
import Modal from "react-modal";
import { Button, Flex, Icon, Autocomplete, Text, View } from "@aws-amplify/ui-react";
import { getUsersForGroup, addUsersForGroup } from "../utils/helper"
import "./styles.css"

export default function AddUsersInGroup(props) {
  const { overrides, ...rest } = props;
  const [modalHeight, setModalHeight] = useState(250);
  const [frameHeight, setFrameHeight] = useState('248px');
  const [users, setUsers] = useState([]);
  const [selUsers, setSelUsers] = useState([]);
  const [holder, setHolder] = useState('');
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState('');
  const groupName = props.groupName;

  // Calculate or measure the height of the content
  useEffect(() => {
    getUsersForGroup(groupName, setUsers);
  }, []);

  useEffect(() => {
    setOptions(users.map(user => {
      return { id: user, label: user }
    }))
    if (users.length > 0)
      setHolder(`Find users by name`);
    else
      setHolder(`No users to add`);
  }, [users]);

  useEffect(() => {
    let height = 250 + selUsers.length * 40;
    setModalHeight(height);
    setFrameHeight((height - 2) + 'px');
  }, [selUsers]);

  const onSelect = (option) => {
    setUsers(users.filter(user => user !== option.label));
    setSelUsers([...selUsers, option.label]);
    setValue('');
  }

  const onRemoveUser = (user) => {
    setUsers([...users, user]);
    setSelUsers(selUsers.filter(user_ => user_ !== user));
  }

  const onClose = () => {
    props.onClose(false);
  }

  const onAddUser = () => {
    addUsersForGroup(groupName, selUsers, props.onClose);
  }

  return (
    <Modal
      isOpen={true}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          width: '546px',
          height: `${modalHeight}px`,
          margin: 'auto',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '0px',
          overflow: 'visible'
        },
      }}
    >
    <Flex id="modal-content"
      gap="0"
      direction="column"
      width="544px"
      height={frameHeight}
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "AddUsersInGroup")}
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
            lineHeight="30.25568199157715px"
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
            children="Add users to group"
            {...getOverrideProps(overrides, "Add user")}
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
            {...getOverrideProps(overrides, "\uD83D\uDD12Icon3543616")}
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
              {...getOverrideProps(overrides, "Vector3543617")}
            ></Icon>
          </View>
        </Flex>
      </Flex>
      <Flex
        gap="10px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        grow="1"
        shrink="1"
        alignSelf="stretch"
        position="relative"
        padding="30px 32px 16px 32px"
        backgroundColor="rgba(250,250,250,1)"
        {...getOverrideProps(overrides, "NavBarHeader2")}
      >
        <Autocomplete
          onSelect={onSelect}
          value={value} 
          width="unset"
          height="unset"
          label="User"
          shrink="0"
          alignSelf="stretch"
          placeholder={holder}
          size="default"
          isDisabled={false}
          labelHidden={true}
          variation="default"
          options={options}
          overflow="visible"
          {...getOverrideProps(overrides, "SelectField")}
        >
        </Autocomplete> {
          selUsers.map(user => (
          <Flex
            gap="0px"
            direction="row"
            width="unset"
            height="unset"
            justifyContent="space-between"
            alignItems="center"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            border="1px SOLID rgba(67,168,84,1)"
            padding="4px 4px 4px 9px"
            backgroundColor="rgba(239,240,240,1)"
            {...getOverrideProps(overrides, "Frame 4400")}
          >
            <Text
              fontFamily="Inter"
              fontSize="14px"
              fontWeight="400"
              color="rgba(0,0,0,1)"
              lineHeight="21px"
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
              children={user}
              {...getOverrideProps(overrides, "STS")}
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
              {...getOverrideProps(overrides, "\uD83D\uDD12Icon3553648")}
            >
              <Icon
                onClick={() => { onRemoveUser(user)}}
                className="close-icon"
                width="14px"
                height="14px"
                viewBox={{ minX: 0, minY: 0, width: 14, height: 14 }}
                paths={[
                  {
                    d: "M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z",
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
                {...getOverrideProps(overrides, "Vector3553649")}
              ></Icon>
            </View>
          </Flex>))
        }
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
            {...getOverrideProps(overrides, "Button3543622")}
          ></Button>
          <Button
            onClick={onAddUser}
            width="128px"
            height="unset"
            shrink="0"
            backgroundColor="rgba(234,113,34,1)"
            size="small"
            isDisabled={false}
            variation="primary"
            children="Add user(s)"
            {...getOverrideProps(overrides, "Button3543623")}
          ></Button>
        </Flex>
      </Flex>
    </Flex>
    </Modal>
  );
}
