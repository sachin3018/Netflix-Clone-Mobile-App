import React, { Component, useState, useEffect } from 'react'
import { Text, View, ImageBackground, StyleSheet, SafeAreaView, TextInput, Dimensions, Button, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import {Input} from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from "firebase";


const Signup = ({ navigation }) => {

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [loading, setloading] = useState(false)
    var database = firebase.database()
    // const [values, setvalues] = useState({
    //     username : "",
    //     password : "",
    //     confirmpassword : "",
    // })

    useEffect(() => {
       
    },[])

    // const {username, password, confirmpassword } = values;

    const signup = (email,password) => {
        console.log(email)
        if(password === confirmPassword){
            setloading(true)
            if(email.includes('@')){
                firebase.auth().createUserWithEmailAndPassword(email,password)
                           .then(authenticate => {
                               authenticate.user.updateProfile({
                                   displayName : username
                               })
                               .then(() => {
                                   setloading(false)
                                   setusername("")
                                   setpassword("")
                                   firebase.auth()
                                        .onAuthStateChanged(user => {
                                        if(user){
                                            // var reff = database.ref(user.uid);
                                            // var postData = reff.push()
                                            database.ref(user.uid).set({
                                                subscription : false,
                                                username : user.displayName
                                            })

                                        }else{
                                        console.log(user)
                                    }
                                })
                                   navigation.navigate("Login")
                               })
                               .catch(error =>{
                                   setloading(false)
                                   Alert.alert(error.message)
                               })
                           })
                           .catch(error => {
                               setloading(false)
                               Alert.alert(error.message)
                           })
            }else{
                Alert.alert("not valid email")
            }
        }
       
    }
    
        return (
            <SafeAreaView style={styles.container} behavior="position" enabled>
                <View style={{justifyContent : "center", alignItems : "center"}}>
                    <Animatable.View animation="zoomInUp">
                        <ImageBackground
                            source={{uri : "https://i.pinimg.com/originals/17/65/2c/17652c3268c85ac2e3ac9fbdab374a5a.png"}}
                            style={styles.image}
                        />
                    </Animatable.View>
                </View>
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
                            autoCorrect = {false}
                            placeholderTextColor = '#DAE0E2'
                            onChangeText={(password) => setpassword(password)}
                            value={password}
                    />
                </View>
                <View style={styles.input}>
                    <TextInput
                            style={{ height: 60, borderColor: 'gray', borderWidth: 4,borderRadius : 5 ,padding : 15, color : 'white'}}
                            placeholder="confirm password"
                            secureTextEntry={true}
                            autoCorrect = {false}
                            placeholderTextColor = '#DAE0E2'
                            onChangeText={(confirmPassword) => setconfirmPassword(confirmPassword)}
                            value={confirmPassword}
                    />
                </View>
                <View style={styles.input}>
                    <TouchableOpacity onPress={() => signup(username,password)} >
                    <Text
                            style={{ height: 60, borderColor: 'gray', borderWidth: 2,borderRadius : 5 ,padding : 15, color : 'white', backgroundColor : "#000", textAlign : "center", fontSize : 20}}
                    >SignUp</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop : "5%",}}>
                    <TouchableOpacity>
                        <Text style={{ padding : 15, color : 'white', backgroundColor : "#000", textAlign : "center", fontSize : 15}}>Need Help?</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop : "5%",}}>
                    <TouchableOpacity>
                        <Text style={{ padding : 15, color : 'white', backgroundColor : "#000", textAlign : "center", fontSize : 15}}>Member of Netflix? Sign In now</Text>
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

export default Signup;