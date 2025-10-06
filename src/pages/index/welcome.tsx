import React, { FC } from "react";
import { Box, Header, Text } from "zmp-ui";
import logo from "static/logo.png";
import appConfig from "../../../app-config.json";
import { getConfig } from "utils/config";
import { useHeaderHiddenOnScroll } from "hooks";

export const Welcome: FC = () => {
  const hidden = useHeaderHiddenOnScroll();

  return (
    <Header
      className={`app-header bg-[#055140] no-border pl-4 flex-none pb-[6px] transition-all duration-300`}
      showBackIcon={false}
      title={
        (
          <Box flex alignItems="center" className="space-x-2">
            <img
              className="w-8 h-8 rounded-lg border-inset"
              src={getConfig((c) => c.template.headerLogo) || logo}
            />
            <Box>
              <Text.Title size="small">{appConfig.app.title}</Text.Title>
            </Box>
          </Box>
        ) as unknown as string
      }
      style={{
        transition: "transform  0.6s cubic-bezier(.4,0,.2,1), opacity 0.6s",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        zIndex: 100,
        background: "#055140",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
      }}
    />
  );
};
