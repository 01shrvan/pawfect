import { Pressable, Text, View } from "react-native";
import { Link, Redirect, useRootNavigationState } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";

export default function Index() {
  const { user } = useUser();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    CheckNavLoaded();
  }, [rootNavigationState]);

  const CheckNavLoaded = () => {
    if (!rootNavigationState?.key) {
      return null;
    }
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      
      {user ? <Redirect href={"/(tabs)/home"} /> : <Redirect href={"/login"} />}
    </View>
  );
}
