import React from "react";
import { View, Text, Image, StatusBar } from "react-native";
import styled from "styled-components";

const Container = styled.View`
  background-color: #1e1e1e;
  align-items: center;
  justify-content: center;
`;

export default function Header() {
  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Image
        source={require("./logo.png")}
        style={{
          width: "100%",
          borderBottomWidth: 1,
          borderColor: "#2f2f2f",
          resizeMode: "contain",
          marginTop: 32,
        }}
      />
    </Container>
  );
}
