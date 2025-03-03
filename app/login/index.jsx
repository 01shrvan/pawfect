import { View, Text, Image, Dimensions } from "react-native";
import React, { useCallback } from "react";
import Colors from "./../../constants/Colors";
import { Pressable } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

const { width } = Dimensions.get("window");

WebBrowser.maybeCompleteAuthSession();

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

export default function LoginScreen() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/(tabs)/home", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        // Do something with the created session
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [startOAuthFlow]);

  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <Image
        source={require("./../../assets/images/login1.png")}
        style={{
          width: width * 0.8,
          height: 300,
          resizeMode: "contain",
          marginBottom: 20,
        }}
      />
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
          textAlign: "center",
          color: Colors.PRIMARY,
          marginBottom: 10,
        }}
      >
        Ready to Make a New Best Friend?
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 16,
          textAlign: "center",
          color: Colors.GRAY,
          marginBottom: 20,
        }}
      >
        Open your heart to a loving pet in need. Together, we can create joyful
        moments and lasting memories!
      </Text>

      <Pressable
        onPress={onPress}
        style={{
          paddingVertical: 16,
          paddingHorizontal: 24,
          backgroundColor: Colors.BG,
          borderRadius: 14,
          width: width * 0.8,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 20,
            textAlign: "center",
            color: Colors.WHITE,
          }}
        >
          Get Started
        </Text>
      </Pressable>
    </View>
  );
}
