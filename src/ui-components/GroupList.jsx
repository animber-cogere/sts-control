import React, { useState, useEffect } from "react";
import { getOverrideProps } from "./utils";
import { Flex } from "@aws-amplify/ui-react";
import GroupListItem from "./GroupListItem";
import { COUNT_PER_PAGE } from "../utils/helper";

export default function GroupList(props) {
  const { overrides, ...rest } = props;
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setList(props.list);
  }, [props.list]);

  useEffect(() => {
    setPage(props.page);
  }, [props.page]);
  
  return (
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
      {...getOverrideProps(overrides, "GroupTable")}
    > {
      list.slice(page * COUNT_PER_PAGE, (page + 1) * COUNT_PER_PAGE).map((item) => (
        <GroupListItem handleChecked={props.handleChecked} item={item}/>
      ))}
    </Flex>
  );
}
