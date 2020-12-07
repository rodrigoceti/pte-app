import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
import Axios from "axios";

const Container = styled.View`
  background-color: #1e1e1e;
  flex: 1;
  align-items: center;
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

const ImageContainer = styled.View`
  align-items: flex-start;
  background: green;
  flex: 1;
`;

function mapPhotoResponse(photos = []) {
  const mappedPhotos = photos.map((photo) => {
    return photo.metadata;
  });
  console.log("mappedPhotos", mappedPhotos);
  return mappedPhotos;
}

export default function Admin() {
  const [modalVisible, setModalVisible] = useState(false);
  const [photoList, setPhotoList] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [fetchingPhotos, setFetchingPhotos] = useState(false);

  const handleItemPress = (item) => {
    console.log("item", item);
    setModalVisible(true);
    setSelectedPhoto(item);
  };

  const renderImage = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <ImageItem key={`${item.id}`}>
          <Text style={{ fontSize: 16, color: "white", paddingRight: 8 }}>
            {item.name}
          </Text>
          <FontAwesome5 name="image" size={24} color="white" />
        </ImageItem>
      </TouchableOpacity>
    );
  };

  const fetchPhotos = async () => {
    setFetchingPhotos(true);
    const { data: photoListRes } = await Axios.get(
      "https://us-central1-rodrigo-development.cloudfunctions.net/getPhotos"
    );
    setPhotoList(mapPhotoResponse(photoListRes));
    setFetchingPhotos(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  console.log("mediaLink", selectedPhoto);

  return (
    <Container>
      <ListContainer>
        <StyledList
          refreshing={fetchingPhotos}
          onRefresh={fetchPhotos}
          data={photoList}
          renderItem={renderImage}
        />
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
        <ImageContainer>
          <Image
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              resizeMode: "contain",
            }}
            source={{ uri: selectedPhoto?.mediaLink }}
          />
        </ImageContainer>
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
