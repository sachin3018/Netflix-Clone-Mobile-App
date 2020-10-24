import React, { Component, useState, useEffect } from 'react'
import { Text, View, ImageBackground, StyleSheet, SafeAreaView, TextInput, Dimensions, ActivityIndicator } from 'react-native'
import {Input} from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from "firebase";


const login = ({ navigation }) => {

    
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [loading, setloading] = useState(false)
    
    const check = () => {
        firebase.auth()
        .onAuthStateChanged(user => {
        if(user){
            navigation.navigate("Subscription")
        }else{
        console.log(user)
    }})
    }
    
    useEffect(() => {
        check();
    },[])

    //const {username, password, uid } = values;

    const signIn = (email,password) => {
        setloading(true)
        firebase.auth().signInWithEmailAndPassword(email,password)
                .then(data => {
                    setloading(false)
                    setusername("")
                    setpassword("")
                    
                    navigation.navigate("Subscription")
                    
                })
                .catch(error => {
                    //TODO : toast genration
                    setloading(false)
                })
    }
    
        return (
            <SafeAreaView style={styles.container}>
                <Animatable.View animation="zoomInUp">
                    <ImageBackground
                        source={{uri : "https://i.pinimg.com/originals/17/65/2c/17652c3268c85ac2e3ac9fbdab374a5a.png"}}
                        style={styles.image}
                    />
                </Animatable.View>
                {
                    loading && <ActivityIndicator color="#f50" size={30} />
                }
                <View>
                <View style={styles.input}>
                    <TextInput
                        style={{ height: 60, borderColor: 'gray', borderWidth: 4,borderRadius : 5 ,padding : 15, color : 'white'}}
                        placeholder="Email or Phone number"
                        placeholderTextColor = '#DAE0E2'
                        onChangeText={(username) => setusername(username)}
                        value={username}
                    />
                </View>
               
                <View style={styles.input}>
                    <TextInput
                            style={{ height: 60, borderColor: 'gray', borderWidth: 4,borderRadius : 5 ,padding : 15, color : 'white'}}
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor = '#DAE0E2'
                            onChangeText={(password) => setpassword(password)}
                            value={password}
                    />
                </View>
                <View style={styles.input}>
                    <TouchableOpacity onPress={() => signIn(username,password)}>
                    <Text
                            style={{ height: 60, borderColor: 'gray', borderWidth: 2,borderRadius : 5 ,padding : 15, color : 'white', backgroundColor : "#000", textAlign : "center", fontSize : 20}}
                    >Signin</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop : "5%",}}>
                    <TouchableOpacity >
                        <Text style={{ padding : 15, color : 'white', backgroundColor : "#000", textAlign : "center", fontSize : 15}}>Need Help?</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop : "5%",}}>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={{ padding : 15, color : 'white', backgroundColor : "#000", textAlign : "center", fontSize : 15}}>New To Netflix? Sign up now</Text>
                    </TouchableOpacity>
                </View>
                
                </View>
            </SafeAreaView>
        )
    }


const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#000",
        alignItems : "center",
        justifyContent : "center"
    },
    image : {
        marginTop : "5%",
        width : 100, 
        height : 100
    },
    input : {
        width : Dimensions.get("screen").width-50,
        backgroundColor : "#616C6F",
        marginTop : "5%",
        borderRadius : 7
    }
})

export default login;