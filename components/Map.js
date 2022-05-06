import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin, setTravelTimeInformation } from "../slices/navSlice";
import { selectDestination } from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { useRef } from "react";

const Map = () => {
   const origin = useSelector(selectOrigin);
   const destination = useSelector(selectDestination);
   const mapRef = useRef(null);
   const disp = useDispatch();

   useEffect(() => {
      if (!origin || !destination) return;

      mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
         edgePadding: { top: 50, bottom: 50, left: 50, right: 50 },
      });
   }, [origin, destination]);

   useEffect(() => {
      if (!origin || !destination) return;

      const getTravelTime = async () => {
         fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?
            units=imperial&origins=${origin.latitude},${origin.longitude}&destinations=$
            {destination.latitude},${destination.longitude}&key=${GOOGLE_MAPS_APIKEY}`
         )
            .then((res) => res.json())
            .then((data) => {
               disp(setTravelTimeInformation(data.rows[0].elements[0].duration.text));
            });
      };
      getTravelTime();
   });

   return (
      <MapView
         style={tw`flex-1`}
         mapType="mutedStandard"
         initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
         }}
      >
         {origin && destination && (
            <MapViewDirections
               origin={origin.description}
               destination={destination.description}
               // apikey={GOOGLE_MAPS_APIKEY}
               strokeWidth={3}
               strokeColor="black"
            />
         )}

         {origin?.location && (
            <Marker
               coordinate={{
                  latitude: origin.location.lat,
                  longitude: origin.location.lng,
               }}
               title="Origin"
               description={origin.description}
               identifier="origin"
            />
         )}
      </MapView>
   );
};

export default Map;

const styles = StyleSheet.create({});
