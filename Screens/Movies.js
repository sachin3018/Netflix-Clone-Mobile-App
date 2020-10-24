import React, { useState,useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image, ImageBackground, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import * as firebase from "firebase";
//import { TouchableOpacity } from 'react-native-gesture-handler'

const Movies = ({ navigation }) => {
    const [loading, setloading] = useState(false)
    const [netflix, setnetflix] = useState([])
    const [netflixComedy, setnetflixComedy] = useState([])
    const [netflixAction, setnetflixAction] = useState([])
    const [netflixHorror, setnetflixHorror] = useState([])
    const [netflixRomance, setnetflixRomance] = useState([])
    const [topRated, settopRated] = useState([])
    const [logoutloading, setlogoutloading] = useState(false)

    const APIkey = '77093f34675c34b9db8694e9373ad78b'
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${APIkey}`
    const posterBase = 'https://image.tmdb.org/t/p/w500/'
    var path = netflixComedy.length === 0 ? "/4ka8vAzAFUZFKxWyfGfwVcSXuZo.jpg" : netflixComedy[12].poster_path
    var name = netflixComedy.length === 0 ? "loading" : netflixComedy[12].name
    const getComedy = () => {
        setloading(true)
        console.log('entered')
        return(
            fetch(`${url}&sort_by=popularity.desc&with_genres=35&language=en`)
            .then(response => response.json())
            .then(response => {
                setnetflixComedy(response.results)
                setloading(false)
                //console.log(netflixComedy[0].poster_path)
            })
            .catch(error => console.log(error))
        )

    }

    const getNetflix = () => {
        console.log('entered')
        return(
            fetch(`${url}&language=en`)
            .then(response => response.json())
            .then(response => {
                setnetflix(response.results)
                //console.log(netflixComedy[0])
            })
            .catch(error => console.log(error))
        )

    }

    const getRomance = () => {
        console.log('entered')
        return(
            fetch(`${url}&sort_by=popularity.desc&with_genres=10749&language=en`)
            .then(response => response.json())
            .then(response => {
                setnetflixRomance(response.results)
                //console.log(netflixComedy[0])
            })
            .catch(error => console.log(error))
        )

    }

    const getHorror = () => {
        console.log('entered')
        return(
            fetch(`${url}&sort_by=popularity.desc&with_genres=27&language=en`)
            .then(response => response.json())
            .then(response => {
                setnetflixHorror(response.results)
                //console.log(netflixComedy[0])
            })
            .catch(error => console.log(error))
        )

    }

    const getAction = () => {
        console.log('entered')
        return(
            fetch(`${url}&sort_by=popularity.desc&with_genres=28&language=en`)
            .then(response => response.json())
            .then(response => {
                setnetflixAction(response.results)
                //console.log(netflixComedy[0])
            })
            .catch(error => console.log(error))
        )

    }

    const getTopRated = () => {
        console.log('entered')
        return(
            fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIkey}&language=en`)
            .then(response => response.json())
            .then(response => {
                settopRated(response.results)
                //console.log(netflixComedy[0])
            })
            .catch(error => console.log(error))
        )

    }

    
    const logoutUser = () => {
        setlogoutloading(true)
        firebase.auth()
                .signOut()
                .then(() => {
                    setlogoutloading(false)
                    navigation.navigate('Login')
                })
                .catch(error => {
                    setlogoutloading(false)
                    Alert.alert(error.message)
                })
    }


    useEffect(() => {
        getComedy();
        getNetflix();
        getRomance();
        getHorror();
        getAction();
        getTopRated();
        console.log('entered')
    }, [])
    return(
        <SafeAreaView style={styles.container}>
        <ScrollView style={{height : 2000,flex : 12}}>
            <ImageBackground
              source={{ uri : `${posterBase}${path}`}}
              style = {{flex : 1,width : "100%", height : "160%",marginTop : "2%",}}
             >
                <View style={{flex : 1,marginHorizontal : "5%",flexDirection : "row",justifyContent : "space-between",marginTop : "4%",}}>
                    <Image  
                        source={{uri : "https://i.pinimg.com/originals/17/65/2c/17652c3268c85ac2e3ac9fbdab374a5a.png"}}
                        style={styles.image}/>
                    <Text style={{fontSize : 17,color : "#fff",textAlignVertical : "center",marginRight : "3%"}}>TV Shows</Text>
                    <Text style={{fontSize : 17,color : "#fff",textAlignVertical : "center",marginRight : "3%"}}>Movies</Text>
                    <Text style={{fontSize : 17,color : "#fff",textAlignVertical : "center",marginRight : "3%"}}>MyList</Text>
                </View>
                <View style={{flex : 11,justifyContent : "center",alignItems : "center"}} >
                    <TouchableOpacity
                        style={{paddingTop : "40%",marginTop : 100}}
                    >
                            <View style={{backgroundColor : "#000",borderRadius : 25}}>
                               <TouchableOpacity>
                                <AntDesign 
                                        name="play"
                                        size={50}
                                        color = 'white'
                                    />
                               </TouchableOpacity>
                            </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            
                <Text style={{color : 'white',marginTop : "60%",fontSize : 20,marginLeft : 4}}>Netflix Orignals</Text>
                <FlatList 
                 horizontal
                 data={netflix}
                 keyExtractor={item => item.id}
                 renderItem = {({item}) => {
                     var pic = item.poster_path
                     console.log(pic)
                     return(
                         <Image 
                            source={{uri : `${posterBase}${pic}`}}
                            style={{width : 200, height : 300, margin : 2}}
                         />
                     )
                 }}
                />
                {
                    logoutloading && <ActivityIndicator color="#f50" size={30} />
                }
                <Text style={{color : 'white',marginTop : "4%",fontSize : 20,marginLeft : 4}}>Top Rated Movies</Text>
                <FlatList 
                 horizontal
                 data={topRated}
                 keyExtractor={item => item.id}
                 renderItem = {({item}) => {
                     var pic = item.poster_path
                     console.log(pic)
                     return(
                         <Image 
                            source={{uri : `${posterBase}${pic}`}}
                            style={{width : 200, height : 300, margin : 2}}
                         />
                     )
                 }}
                />
                <Text style={{color : 'white',marginTop : "4%",fontSize : 20,marginLeft : 4}}>Romance Movies</Text>
                <FlatList 
                 horizontal
                 data={netflixRomance}
                 keyExtractor={item => item.id}
                 renderItem = {({item}) => {
                     var pic = item.poster_path
                     console.log(pic)
                     return(
                         <Image 
                            source={{uri : `${posterBase}${pic}`}}
                            style={{width : 200, height : 300, margin : 2}}
                         />
                     )
                 }}
                />
                <Text style={{color : 'white',marginTop : "4%",fontSize : 20,marginLeft : 4}}>Action Movies</Text>
                <FlatList 
                 horizontal
                 data={netflixAction}
                 keyExtractor={item => item.id}
                 renderItem = {({item}) => {
                     var pic = item.poster_path
                     console.log(pic)
                     return(
                         <Image 
                            source={{uri : `${posterBase}${pic}`}}
                            style={{width : 200, height : 300, margin : 2}}
                         />
                     )
                 }}
                />
                <Text style={{color : 'white',marginTop : "4%",fontSize : 20,marginLeft : 4}}>Horror Movies</Text>
                <FlatList 
                 horizontal
                 data={netflixHorror}
                 keyExtractor={item => item.id}
                 renderItem = {({item}) => {
                     var pic = item.poster_path
                     console.log(pic)
                     return(
                         <Image 
                            source={{uri : `${posterBase}${pic}`}}
                            style={{width : 200, height : 300, margin : 2}}
                         />
                     )
                 }}
                />
                <Text style={{color : 'white',marginTop : "4%",fontSize : 20,marginLeft : 4}}>Comedy Movies</Text>
                <FlatList 
                 horizontal
                 data={netflixComedy}
                 keyExtractor={item => item.id}
                 renderItem = {({item}) => {
                     var pic = item.poster_path
                     console.log(pic)
                     return(
                         <Image 
                            source={{uri : `${posterBase}${pic}`}}
                            style={{width : 200, height : 300, margin : 2}}
                         />
                     )
                 }}
                />
            </ScrollView>
       
        <View style={{flex : 0.06, flexDirection : "row",justifyContent : "space-around",alignContent : "center"}}>
            <Icon
                name='home'
                color = 'white'
                size={30}
                style={styles.icon}
           />
           <Icon
                name='search'
                color = 'white'
                size={30}
                style={styles.icon}
           />
           <AntDesign 
                name ="download"
                color = "white"
                size={30}
                style={styles.icon}
           />
           <AntDesign 
                name ="logout"
                color = "red"
                size={30}
                style={styles.icon}
                onPress={() => {
                    logoutUser();
                }}
           />
          
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#000",
    },
    input : {
        width : Dimensions.get("screen").width-50,
        backgroundColor : "#616C6F",
        marginTop : "5%",
        borderRadius : 7
    },
    image : {
        width : 40, 
        height :40,
    },
    icon : {
        margin : "1%"
    }
})
export default Movies;