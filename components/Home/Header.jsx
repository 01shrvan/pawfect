import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'

export default function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.slogan}>
          "Find your furry friend!"
        </Text>
        <Text style={styles.welcomeText}>
          Welcome to{' '}
          <Text style={styles.appName}>
            PawFect!
          </Text>
        </Text>
      </View>

      <Icon
        name="paw" 
        size={40}
        color="#333" 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  slogan: {
    fontFamily: 'outfit-bold',
    fontSize: 15,
    color: '#888',
  },
  welcomeText: {
    fontFamily: 'outfit',
    fontSize: 25,
    color: Colors.PRIMARY,
  },
  appName: {
    fontFamily: 'outfit-medium',
    color: Colors.BG,
  },
})