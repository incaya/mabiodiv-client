import React, { useState } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import AppBar from "./AppBar";
import SideBar from "./SideBar";
import MapContainer from "./MapContainer";
import { FormClose, Notification } from "grommet-icons";

import {
  Box,
  Button,
  Collapsible,
  Grommet,
  Layer,
  ResponsiveContext
} from "grommet";

const theme = {
  global: {
    colors: {
      brand: "#228BE6"
    },
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px"
    }
  }
};

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL
});

const App = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <ApolloProvider client={client}>
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill>
              <AppBar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
              />
              <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
                {!showSidebar || size !== "small" ? (
                  <Collapsible direction="horizontal" open={showSidebar}>
                    <Box
                      width="medium"
                      background="light-2"
                      elevation="small"
                      align="center"
                      justify="center"
                    >
                      <SideBar />
                    </Box>
                  </Collapsible>
                ) : (
                  <Layer>
                    <Box
                      background="light-2"
                      tag="header"
                      justify="end"
                      align="center"
                      direction="row"
                    >
                      <Button
                        icon={<FormClose />}
                        onClick={() => setShowSidebar(false)}
                      />
                    </Box>
                    <Box
                      fill
                      background="light-2"
                      align="center"
                      justify="center"
                    >
                      <SideBar />
                    </Box>
                  </Layer>
                )}
                <Box flex>
                  <MapContainer />
                </Box>
              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    </ApolloProvider>
  );
};

export default App;
