import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import styled from "styled-components";
import axios from "axios";

const Container = styled.View`
  flex: 1;
  background-color: #1e1e1e;
  align-items: center;
  justify-content: center;
`;

const RingBell = styled.TouchableOpacity`
  background-color: #7a63ff;
  padding: 64px;
  border-radius: 200px;
`;

export default function Home() {
  const [loading, setLoading] = useState(false);
  const handleRingPress = async () => {
    try {
      setLoading(true);
      console.log("start");
      const response = await fetch(
        `https://us-central1-rodrigo-development.cloudfunctions.net/upload-photo`
      );
      setLoading(false);
    } catch (e) {
      console.log("Error", e);
      setLoading(false);
    }
  };

  return (
    <Container>
      <RingBell onPress={handleRingPress}>
        <Text style={{ color: "white", fontWeight: "bolder", fontSize: 24 }}>
          {loading ? <ActivityIndicator size="large" /> : "Ring"}
        </Text>
      </RingBell>
    </Container>
  );
}
