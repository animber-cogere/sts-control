import { getOverrideProps } from "./utils";
import { Text, Flex, Button, SearchField, StepperField, CheckboxField } from "@aws-amplify/ui-react";
import React, { useState, useEffect, useCallback } from "react";
import OrderList from "./OrderList";
import { searchOrders, deleteOrders } from "../utils/helper";
import OrderTickets from "./OrderTickets";
import IssueTickets from "./IssueTickets";
import { parseFile, addOrders } from "../utils/helper";

export default function OrdersPanel(props) {
  const { overrides, ...rest } = props;
  const [ showOrderModal, setShowOrderModal ] = useState(false);
  const [ showIssueModal, setShowIssueModal ] = useState(false);  
  const [pageNum, setPageNum] = useState(1);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [checkedAll, setCheckedAll] = useState(true);
  const [checkedCount, setCheckedCount] = useState(0);
  const [renderFlip, setRenderFlip] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    searchOrders(search, setPageNum, setFiltered);
    setCheckedCount(0);
  }, [search, renderFlip])

  const onClose = useCallback((dlg, refresh) => {
    if (dlg === "Order")
      setShowOrderModal(false);
    else
      setShowIssueModal(false);
    if (refresh)
      onRefresh();
  }, [renderFlip]);

  // Callback for handling user item checked changes
  const onChecked = useCallback((item, checked) => {
    filtered.map((item_) => {
      if (item_.id === item.id)
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

  const onDeleteOrders = () => {
    if (checkedCount)
      deleteOrders(filtered, onRefresh);
  }

  const onHandlePage = (newValue) => {
    setPage(newValue - 1);
  }

  const onUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.className = 'dialogContainer';
    fileInput.addEventListener('change', async (e) => {
      const parsedData = await parseFile(e.target.files[0]);
      addOrders(parsedData.data);
      onRefresh();
    });
    fileInput.click();
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
          {...getOverrideProps(overrides, "Users353384")}
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
              children="Orders"
              {...getOverrideProps(overrides, "Users353386")}
            ></Text>
            <Flex
              gap="14px"
              direction="row"
              width="408px"
              height="unset"
              justifyContent="flex-start"
              alignItems="flex-start"
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              {...getOverrideProps(overrides, "actions")}
            >
              <Button
                onClick={ onDeleteOrders }
                width="80px"
                height="unset"
                shrink="0"
                size="small"
                isDisabled={false}
                variation="default"
                children="Delete"
                {...getOverrideProps(overrides, "Button214997")}
              ></Button>
              <Button
                onClick={ () => { setShowOrderModal(true) } }
                width="80px"
                height="unset"
                shrink="0"
                size="small"
                isDisabled={false}
                variation="default"
                children="Order"
                {...getOverrideProps(overrides, "Button214998")}
              ></Button>
              <Button
                onClick={ () => { setShowIssueModal(true) } }
                width="80px"
                height="unset"
                shrink="0"
                size="small"
                isDisabled={false}
                variation="default"
                children="Issue"
                {...getOverrideProps(overrides, "Button2141006")}
              ></Button>	      
              <Button
                onClick={onUpload}
                width="124px"
                height="unset"
                shrink="0"
                size="small"
                isDisabled={false}
                variation="primary"
                backgroundColor="rgba(234,113,34,1)"
                children="Upload"
                {...getOverrideProps(overrides, "Button214946")}
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
            {...getOverrideProps(overrides, "CheckboxField353394")}
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
              width="60px"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Bundle"
            {...getOverrideProps(overrides, "Email353395")}
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
            width="60px"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Set"
            {...getOverrideProps(overrides, "Set2123559")}
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
            width="60px"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Layout"
            {...getOverrideProps(overrides, "Layout2123560")}
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
            width="60px"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Value"
            {...getOverrideProps(overrides, "Value2123561")}
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
            width="157px"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Ticket"
            {...getOverrideProps(overrides, "Ticket2123562")}
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
            width="60px"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="PIN"
            {...getOverrideProps(overrides, "PIN2123563")}
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
            width="220px"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Created Date"
            {...getOverrideProps(overrides, "Ordered Date")}
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
            children="Status"
            {...getOverrideProps(overrides, "Status2123565")}
          ></Text>
        </Flex>
        <OrderList handleChecked={onChecked} checkedAll={checkedAll} list={filtered} page={page}/>
      </Flex>
      { showOrderModal && (<OrderTickets onClose={ onClose } />) }
      { showIssueModal && (<IssueTickets onClose={ onClose } />) }
    </>
  );
}
