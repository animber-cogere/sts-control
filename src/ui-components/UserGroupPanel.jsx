import { getOverrideProps } from "./utils";
import { Flex, Text, SelectField, View, Icon } from "@aws-amplify/ui-react";
import React, { useState, useEffect } from "react";
import { getGroups, addUserToGroup, removeUserFromGroup } from "../utils/helper";
import { useParams } from "react-router-dom";

export default function UserGroupPanel(props) {
  const { overrides, ...rest } = props;
  const [userGroups, setUserGroups] = useState([]);
  const [groups, setGroups] = useState([]);
  const [holder, setHolder] = useState('');
  const [renderFlip, setRenderFlip] = useState(false);
  const [selValue, setSelValue] = useState('');
  const [email, setEmail] = useState('');
  const { userName } = useParams();
  
  useEffect(() => {
    getGroups(userName, setEmail, setUserGroups, setGroups);
    setSelValue('');
  }, [renderFlip]);

  const refresh = () => {
    setRenderFlip(!renderFlip);
  }

  const onSelGroup = (e) => {
    if (e.target.value !== '')
      addUserToGroup(userName, e.target.value, refresh);
  }

  const onRemoveGroup = (group) => {
    removeUserFromGroup(userName, group, refresh);
  }

  useEffect(() => {
    if (groups.length)
      setHolder(`Add ${email} to a group`);
    else
      setHolder(`No groups to add`);
  }, [groups, email]);

  return (
    <Flex
      gap="16px"
      direction="column"
      width="unset"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      shrink="0"
      alignSelf="stretch"
      position="relative"
      padding="0px 0px 20px 0px"
      backgroundColor="rgba(248,248,248,1)"
      {...getOverrideProps(overrides, "Frame 4386")}
    >
      <Flex
        gap="10px"
        direction="row"
        width="unset"
        height="60px"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="4px 20px 4px 20px"
        backgroundColor="rgba(232,232,232,1)"
        {...getOverrideProps(overrides, "Frame 4397")}
      >
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="600"
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
          children="Groups"
          {...getOverrideProps(overrides, "Groups")}
        ></Text>
      </Flex>
      <Flex
        gap="10px"
        direction="column"
        width="unset"
        height="65px"
        justifyContent="flex-start"
        alignItems="flex-start"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 20px 0px 20px"
        {...getOverrideProps(overrides, "Frame 4398")}
      >
        <SelectField
          onChange={onSelGroup}
          width="402px"
          height="unset"
          label="Add user to group"
          shrink="0"
          size="small"
          isDisabled={false}
          labelHidden={false}
          value={selValue}
          placeholder={holder}
          variation="default"
          {...getOverrideProps(overrides, "SelectField")}
        > {
            groups.map(group => (
            <option value={group}>{group}</option>))
          }
        </SelectField>
      </Flex>
      <Flex
        gap="10px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="5px 20px 5px 20px"
        {...getOverrideProps(overrides, "Frame 4399")}
      > {
        userGroups.map(group => (
          <Flex
            gap="439px"
            direction="row"
            width="unset"
            height="unset"
            justifyContent="space-between"
            alignItems="center"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            border="1px SOLID rgba(67,168,84,1)"
            padding="4px 9px 4px 9px"
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
              children={group}
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
              {...getOverrideProps(overrides, "\uD83D\uDD12Icon")}
            >
              <Icon
                className="close-icon"
                onClick={() => {onRemoveGroup(group);}}
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
                {...getOverrideProps(overrides, "Vector3431327")}
              ></Icon>
            </View>
          </Flex>))
        }
      </Flex>
    </Flex>
  );
}