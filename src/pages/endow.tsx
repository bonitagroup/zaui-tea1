import React, { FC } from "react";
import { ListRenderer } from "components/list-renderer";
import { useRecoilValue } from "recoil";
import { endowListState } from "state";
import { Box, Header, Page, Text } from "zmp-ui";
import { Divider } from "components/divider";

const EndowList: FC = () => {
  const endows = useRecoilValue(endowListState);
  return (
    <Box className="bg-background">
      <ListRenderer
        noDivider
        items={endows}
        renderLeft={(item) => (
          <img className="w-10 h-10 rounded-full" src={item.image} />
        )}
        renderRight={(item) => (
          <Box key={item.id}>
            <Text.Header>{item.title}</Text.Header>
            <Text
              size="small"
              className="text-gray overflow-hidden whitespace-nowrap text-ellipsis"
            >
              {item.content}
            </Text>
          </Box>
        )}
      />
    </Box>
  );
};

const EndowPage: FC = () => {
  return (
    <Page>
      <Header title="Ưu đãi" showBackIcon={false} />
      <Divider />
      <EndowList />
    </Page>
  );
};

export default EndowPage;
