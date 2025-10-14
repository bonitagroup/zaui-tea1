import React, { Suspense } from "react";
import { Box, Page } from "zmp-ui";
import { Utilities } from "./utilities";
import { Welcome } from "./welcome";
import { Banner } from "./banner";
import { Endow } from "./endow";
import { Categories } from "./categories";
import { Recommend } from "./recommend";
import { ProductList } from "./product-list";
import { Divider } from "../../components/divider";

const HomePage: React.FunctionComponent = () => {
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Welcome />
      <Box className="flex-1 overflow-auto pb-20">
        <Banner />
        <Divider />
        <Utilities />
        <Divider />
        <Endow />
        <Divider />
        <Suspense>
          <Categories />
        </Suspense>
        <Divider />
        <Recommend />
        <Divider />
        <ProductList />
        <Divider />
      </Box>
    </Page>
  );
};

export default HomePage;