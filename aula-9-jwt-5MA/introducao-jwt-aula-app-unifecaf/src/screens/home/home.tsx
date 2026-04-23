import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { Button, FlatList, Image, TouchableOpacity, View } from "react-native";
import { style } from "./styles";
import api from "@/src/api/api";
import { router } from "expo-router";
import { removeToken } from "@/src/utils/storage";

export interface Welcome {
  image: string[];
  id: number;
  name: string;
  description: string;
  years: number;
  contact: string;
  address: string;
  gender: Gender;
  size: Size;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export enum Gender {
  Fêmea = "Fêmea",
  Macho = "Macho",
  Masculino = "Masculino",
}

export enum Size {
  Grande = "Grande",
  Médio = "Médio",
  Pequeno = "Pequeno",
}

export const Home = () => {
  const [valueApi, setValueApi] = useState<Welcome[]>([]);
  const [match, setMatch] = useState<Welcome[]>([]);
  const [showMatch, setShowMatch] = useState(false);

  const requestApi = async () => {
    await api.get("dogs/getAllDogs").then((resp) => {
      console.log("RESPOSTA da API", resp.data)
      setValueApi(resp.data)
    })
  }

  useEffect(() => {
    requestApi()
  }, [])

  const handlePressNo = () => {
    setValueApi((prevState) => prevState.slice(1));
  };

  const handlePressYes = () => {
    setMatch((prevMatch) => [...prevMatch, valueApi[0]] as any);
    setValueApi((prevState) => prevState.slice(1));
  };

  return (
    <View style={style.container}>
      {showMatch ? (
        <>
          <FlatList
            data={match}
            renderItem={({ item }) => {
              return (
                <Image
                  source={{ uri: item?.image[0] }}
                  style={{
                    height: 200,
                    width: 200,
                  }}
                  resizeMode="contain"
                />
              );
            }}
          />
        </>
      ) : (
        <>
          <TouchableOpacity style={style.content}>
            <Image
              source={{ uri: valueApi[0]?.image[0] }}
              style={{
                height: "90%",
                width: "90%",
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={style.contentButton}>
            <TouchableOpacity onPress={handlePressNo} style={style.buttonNo}>
              <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePressYes} style={style.buttonYes}>
              <AntDesign name="heart" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </>
      )}
      <Button title="Ver matchs" onPress={() => setShowMatch(!showMatch)} />
      <Button 
        title="Sair do app" 
        onPress={async() => {
          router.replace("/")
          await removeToken()
        }}
      />
    </View>
  );
};
