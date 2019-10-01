import React from "react";
import { Box, FormField, TextInput, Heading } from "grommet";

import ChronoSlide from "./ChronoSlide";

const SideBar = () => {
  return (
    <Box fill="vertical">
      <Heading level="4" margin={{ bottom: "50px" }}>
        Options
      </Heading>
      <ChronoSlide />
    </Box>
  );
};

export default SideBar;
