import { getOverrideProps } from "./utils";
import { Button, CheckboxField, Flex, SearchField, StepperField, Text } from "@aws-amplify/ui-react";
import React, { useState, useEffect, useCallback } from "react";
import CreateGroup from "./CreateGroup";
import GroupList from "./GroupList"
import { searchGroups, deleteGroups } from "../utils/helper";

export default function GroupsPanel(props) {
  const { overrides, ...rest } = props;
  const [showModal, setShowModal] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [checkedAll, setCheckedAll] = useState(true);
  const [checkedCount, setCheckedCount] = useState(0);
  const [renderFlip, setRenderFlip] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    searchGroups(search, setPageNum, setFiltered);
    setCheckedCount(0);
  }, [search, renderFlip]);

  const onClose = useCallback((refresh) => {
    setShowModal(false);
    if (refresh)
      onRefresh();
  }, [renderFlip]);

  // Callback for handling user item checked changes
  const onChecked = useCallback((item, checked) => {
    filtered.map((item_) => {
      if (item_.GroupName === item.GroupName)
        item_.checked = checked;
      return null;
    });
    setCheckedCount(filtered.filter((item) => item.checked).length);
  }, [filtered]);

  const onCheckedAll = (e) => {
    setCheckedAll(!checkedAll);
    setFiltered(filtered.map((item) => {
      return { ...item, checked: checkedAll};
    }));
    setCheckedCount(checkedAll ? filtered.length : 0);
  }
  
  const onRefresh = () => {
    setRenderFlip(!renderFlip);
  }

  const onDeleteGroup = () => {
    if (checkedCount)
      deleteGroups(filtered, onRefresh);
  }

  const onHandlePage = (newValue) => {
    setPage(newValue - 1);
  }

  return (
    <>
      <Flex
        gap="0px"
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
        {...getOverrideProps(overrides, "Frame 4386")}
      >
        <Flex
          gap="10px"
          direction="column"
          width="unset"
          height="129px"
          justifyContent="space-between"
          alignItems="flex-start"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="7px 32px 20px 32px"
          backgroundColor="rgba(255,255,255,1)"
          {...getOverrideProps(overrides, "Users2123933")}
        >
          <Flex
            gap="253px"
            direction="row"
            width="unset"
            height="41px"
            justifyContent="space-between"
            alignItems="center"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Frame 4381")}
          >
            <Text
              fontFamily="Inter"
              fontSize="20px"
              fontWeight="600"
              color="rgba(0,0,0,1)"
              lineHeight="30px"
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
              {...getOverrideProps(overrides, "Users2123935")}
            ></Text>
            <Flex
              gap="14px"
              direction="row"
              width="268px"
              height="unset"
              justifyContent="flex-start"
              alignItems="flex-start"
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              {...getOverrideProps(overrides, "actions")}
            >
              <Button
                onClick={onDeleteGroup}
                width="126px"
                height="unset"
                shrink="0"
                size="small"
                isDisabled={false}
                variation="default"
                children="Delete"
                {...getOverrideProps(overrides, "Button2151020")}
              ></Button>
              <Button
                onClick={() => {setShowModal(true);}}
                width="124px"
                height="unset"
                shrink="0"
                size="small"
                isDisabled={false}
                variation="primary"
                backgroundColor="rgba(234,113,34,1)"
                children="Create Group"
                {...getOverrideProps(overrides, "Button2151024")}
              ></Button>
            </Flex>
          </Flex>
          <Flex
            gap="10px"
            direction="row"
            width="unset"
            height="46px"
            justifyContent="space-between"
            alignItems="center"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 1px 0px 1px"
            {...getOverrideProps(overrides, "Frame 4382")}
          >
            <SearchField
              onChange={(e) => {setSearch(e.target.value);}}
              onClear={() => {setSearch('');}}
              width="569px"
              height="unset"
              justifyContent="flex-end"
              shrink="0"
              size="small"
              isDisabled={false}
              labelHidden={false}
              variation="default"
              {...getOverrideProps(overrides, "SearchField")}
            ></SearchField>
            <StepperField
              onStepChange={onHandlePage}
              defaultValue={1}
              min={1}
              max={pageNum}
              width="163px"
              height="unset"
              shrink="0"
              size="default"
              labelHidden={true}
              variation="quiet"
              {...getOverrideProps(overrides, "StepperField")}
            ></StepperField>
          </Flex>
        </Flex>
        <Flex
          gap="20px"
          direction="row"
          width="unset"
          height="53px"
          justifyContent="flex-start"
          alignItems="center"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="16px 0px 16px 0px"
          backgroundColor="#f5f5f5"
          {...getOverrideProps(overrides, "Header")}
        >
          <CheckboxField
            onChange={onCheckedAll}
            checked={checkedCount && checkedCount === filtered.length}
            isIndeterminate={checkedCount && checkedCount !== filtered.length}
            width="51px"
            height="unset"
            size="default"
            defaultChecked={false}
            isDisabled={false}
            labelPosition="end"
            {...getOverrideProps(overrides, "CheckboxField2123943")}
          ></CheckboxField>
          <Text
            fontFamily="Inter"
            fontSize="14px"
            fontWeight="600"
            color="rgba(48,64,80,1)"
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
            children="Name"
            {...getOverrideProps(overrides, "Email2123944")}
          ></Text>
          <Text
            fontFamily="Inter"
            fontSize="14px"
            fontWeight="600"
            color="rgba(48,64,80,1)"
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
            children="Last Modified"
            {...getOverrideProps(overrides, "Created Date2123945")}
          ></Text>
        </Flex>
        <GroupList handleChecked={onChecked} checkedAll={checkedAll} list={filtered} page={page}/>
      </Flex>
      { showModal && <CreateGroup onClose={onClose} /> }
    </>
  );
}
