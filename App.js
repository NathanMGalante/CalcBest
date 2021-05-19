import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal,TouchableHighlight, Button, SafeAreaView,SectionList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather,AntDesign } from '@expo/vector-icons';

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <LinearGradient colors={['rgba(255,255,255,0.3)', 'transparent']} style={{width:'100%',height:'100%',position:'absolute'}}/>

      {/*painel*/}
      <View style={{width:'100%',height:'75%',padding:'10%',borderColor:'red',borderWidth:1}}>
        <View style={{width:'100%',height:'100%',borderColor:'red',borderWidth:1}}>

        </View>
      </View>

      {/*controle*/}
      <View style={{width:'100%',height:'100%',borderColor:'red',borderWidth:1}}>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(43, 105, 91)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:20
  },
});
