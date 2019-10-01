import React from "react";
import { Box, Button, Heading } from "grommet";
import { Notification } from "grommet-icons";

const AppBar = props => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  >
    <Heading level="3" margin="none">
      Ma Biodiv
    </Heading>
    <Button
      icon={<Notification />}
      onClick={() => props.setShowSidebar(!props.showSidebar)}
    />
  </Box>
);

export default AppBar;
