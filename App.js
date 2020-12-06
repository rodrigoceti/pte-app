import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";

import styled from "styled-components";

const Container = styled.View`
  background-color: #1e1e1e;
  flex: 1;
  align-items: center;
  padding-top: 60px;
`;

const ListContainer = styled.View`
  flex: 1;
  width: 100%;
`;

const StyledList = styled.FlatList`
  flex: 1;
  height: 500px;
`;

const ImageItem = styled.View`
  height: 50px;
  padding: 2px 40px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const ImageViewer = styled.Modal``;

const TopBar = styled.View`
  height: 100px;
  background-color: #1e1e1e;
  justify-content: center;
  padding: 16px;
`;

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const imageList = [
    {
      id: 1,
      title: "img_20_20323.jpg",
    },
  ];

  const handleItemPress = (item) => {
    console.log("item", item);
    setModalVisible(true);
  };

  const renderImage = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <ImageItem key={`${item.id}`}>
          <Text style={{ fontSize: 16, color: "white" }}>{item.title}</Text>
          <FontAwesome5 name="image" size={24} color="white" />
        </ImageItem>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <StatusBar style="light" />
      <Image
        style={{
          width: "80%",
          resizeMode: "contain",
          borderBottomWidth: 3,
          borderColor: "white",
        }}
        source={require("./logo.png")}
      />
      <ListContainer>
        <StyledList data={imageList} renderItem={renderImage} />
      </ListContainer>

      <ImageViewer animationType={"slide"} visible={modalVisible}>
        <TopBar>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
            style={{
              justifyContent: "center",
              paddingTop: 32,
              flex: 1,
            }}
          >
            <FontAwesome5 name="window-close" size={24} color="white" />
          </TouchableOpacity>
        </TopBar>
      </ImageViewer>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
