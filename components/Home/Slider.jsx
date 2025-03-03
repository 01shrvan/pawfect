import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
  Animated,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_WIDTH = SCREEN_WIDTH * 0.85;
const ITEM_HEIGHT = ITEM_WIDTH * 0.5625;
const SPACING = 10;
const SIDE_PADDING = (SCREEN_WIDTH - ITEM_WIDTH) / 3;

export default function EnhancedSlider() {
  const [sliderList, setSliderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const snapshot = await getDocs(collection(db, "Sliders"));
        const sliders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSliderList(sliders);
      } catch (error) {
        console.error("Error fetching sliders: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSliders();
  }, []);

  useEffect(() => {
    if (sliderList.length > 1) {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % sliderList.length;
        flatListRef.current?.scrollToOffset({
          offset: currentIndex * (ITEM_WIDTH + SPACING),
          animated: true,
        });
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [sliderList]);

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * (ITEM_WIDTH + SPACING),
      index * (ITEM_WIDTH + SPACING),
      (index + 1) * (ITEM_WIDTH + SPACING),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: "clamp",
    });

    return (
      <Animated.View style={[styles.itemContainer, { transform: [{ scale }] }]}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.sliderImage}
          onError={() => console.log(`Failed to load image: ${item.imageUrl}`)}
        />
      </Animated.View>
    );
  };

  const renderDot = (index) => {
    const inputRange = [
      (index - 1) * (ITEM_WIDTH + SPACING),
      index * (ITEM_WIDTH + SPACING),
      (index + 1) * (ITEM_WIDTH + SPACING),
    ];

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: "clamp",
    });

    return <Animated.View key={index} style={[styles.dot, { opacity }]} />;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E8B20E" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={sliderList}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        bounces={false}
        contentContainerStyle={styles.flatListContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={renderItem}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH + SPACING,
          offset: (ITEM_WIDTH + SPACING) * index,
          index,
        })}
        initialScrollIndex={0}
        scrollEnabled={false}
      />
      <View style={styles.dotContainer}>
        {sliderList.map((_, index) => renderDot(index))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContent: {
    paddingHorizontal: SIDE_PADDING - SPACING / 1,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginHorizontal: SPACING / 4,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
  },
  sliderImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E8B20E",
    marginHorizontal: 4,
  },
});
