import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavorites from "../components/NavFavorites";

const HomeScreen = () => {
   return (
      <SafeAreaView style={tw`bg-white h-full`}>
         <View style={tw`p-5`}>
            <Image
               style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain",
               }}
               source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCeTfTBnBuCJwtddlReH5otlLR_hX9Y_qg5CgFrOW3tCaOc6GNoF--_357H8TE7m1DVZY&usqp=CAU",
               }}
            />
            <GooglePlacesAutocomplete
               placeholder="Where from?"
               styles={{
                  container: {
                     flex: 0,
                  },
                  textInput: {
                     fontSize: 18,
                  },
               }}
               onPress={(data, details = null) => {
                  dispatch(
                     setOrigin({
                        location: details.geomatory.location,
                        description: data.description,
                     })
                  );
               }}
               fetchDetails={true}
               enablePoweredByContainer={false}
               minLength={2}
               query={{
                  key: GOOGLE_MAPS_APIKEY,
                  language: "en",
               }}
               nearbyPlacesAPI="GooglePlacesSearch"
               debounce={400}
            />
            <NavOptions />
            <NavFavorites />
         </View>
      </SafeAreaView>
   );
};

export default HomeScreen;

const styles = StyleSheet.create({});
