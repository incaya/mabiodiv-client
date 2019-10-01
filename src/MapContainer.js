import React from "react";
import "./App.css";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Map from "./Map";

import styled from "styled-components";

const OBSERVATIONS_GETALL = gql`
  {
    observations {
      id
      date
      point
      user {
        username
      }
      taxon {
        name
        famille {
          id
          name
        }
      }
    }
  }
`;

const MapContainer = () => {
  const { loading, error, data } = useQuery(OBSERVATIONS_GETALL);

  return (
    <StyledContainer>
      {loading && <p>Loading...</p>}
      {error && <p>Error :(</p>}
      {!loading && !error && <Map data={data} />}
    </StyledContainer>
  );
};

export default MapContainer;

const StyledContainer = styled.div``;
