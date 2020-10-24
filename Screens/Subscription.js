import React,{useState, useEffect} from 'react'
import { View, Text, SafeAreaView,StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions, ImageBackground } from 'react-native'
import { CheckBox } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import * as firebase from 'firebase'
const Subscription = ({ navigation }) => {

    const [uid, setuid] = useState("")
    const [name, setname] = useState("")
    const [subscription, setsubscription] = useState(false)
    const [loading, setloading] = useState(false)
    const [pay, setpay] = useState(false)
    var database = firebase.database()
    
    const fadeIn = {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      };


    const get = () => {
        setloading(true)
        firebase.auth()
                .onAuthStateChanged(user => {
                    if(user){
                        setname(user.displayName)
                        setuid(user.uid)
                        //subscriped(user.uid)
                        console.log("get : ",subscription)
                        setTimeout(() => {
                            subscriped(user.uid)
                        }, 1000);
                    }else{
                        console.log("user.subscription")
                    }
                })
    }

    const checkForSubscription = () => {
        if(subscription){
            console.log("moving ")
            navigation.navigate("Movies") 
        }
    }
    

    const subscriped = (id) => {
        var self = this;
        if(id !== null){
            var ref = firebase.database().ref(id)
            ref.on("value",datasnapshot => {
                if(datasnapshot.val()){
                    console.log("data : ",(datasnapshot.val().subscription))
                    const messageList = datasnapshot.val().subscription
                    if(messageList)
                        navigation.navigate("Movies") 
                    setloading(false)
                    checkForSubscription();
                    console.log("message : ",messageList)
                }
            })
        }
    }

    const paymentconfirm = () => {
        setpay(false);
        setloading(true);
        database.ref(uid).update({
            subscription : true,
            username : name
        },(error) => {
            if(error){
                console.log("update fail")
            }else{
                setloading(false)
                subscriped(uid)
                setsubscription(true)
                checkForSubscription();
                console.log("done updated")
            }
        })
    }

    const payment = (price) => {
        //setloading(true)
        setpay(true)
        setTimeout(() => {
            paymentconfirm()
        }, 5000);
    }
    useEffect(() => {
        get()
        
                       
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            {
                !pay && loading && <ActivityIndicator color="#f50" size={30} />
            }
            {
                pay && <Animatable.Text animation={fadeIn} style={{color : 'white', fontSize : 15}} iterationCount={5}>wait subscribing</Animatable.Text>
            }
           {
               !pay && !loading &&  !subscription &&
              <View>
                    <View >
                        <Text style={styles.message}>Sorry! you need to Subscribe First</Text>
                    </View>
                    <View style={styles.input}>
                        <TouchableOpacity onPress={() => payment(8.99)}>
                        <Text style={styles.pay}>Basic $8.99/mo</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.input}>
                        <TouchableOpacity onPress={() => payment(12.99)}>
                        <Text style={styles.pay}>Standard $12.99/mo</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.input}>
                        <TouchableOpacity onPress={() => payment(15.99)}>
                        <Text style={styles.pay}>Premium $15.99/mo</Text>
                        </TouchableOpacity>
                    </View>
                    
              </View>
           }
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
    input : {
        width : Dimensions.get("screen").width-50,
        backgroundColor : "#616C6F",
        marginTop : "5%",
        borderRadius : 7
    },
    pay : {
        height: 60, 
        borderColor: 'gray', 
        borderWidth: 2,
        borderRadius : 5 ,
        padding : 15, 
        color : 'white', 
        backgroundColor : "#B83227", 
        textAlign : "center", 
        fontSize : 20
    },
    message : {
        color : 'white', 
        fontSize : 15, 
        textAlign : "center",
        marginBottom : "5%"
    },
    image : {
        marginTop : "5%",
        width : 100, 
        height : 100
    },
})

export default Subscription;

