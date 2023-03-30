import React from "react";
import { useState } from "react";
import { Card } from 'react-native-paper';
import { TouchableOpacity,SafeAreaView,View,Text ,StyleSheet,Image} from "react-native";
import { TextInput, Button } from "react-native-paper";

import { signIn } from "../../Config/Firebase";


export default function Login({ navigation }) {
    const [email, setEmail] = useState("")
    console.log(email)
    const [password, setPassword] = useState("")

    const handleclick = async () => {
        const result = await signIn(email, password)
        console.log("Login Result", result)
        if (result.error) {
            swal("Error!", result.message, "error");
        } else {
            swal("Logged In!", result.message, "success");
        }
    }
    return (
        <>
        <SafeAreaView style={styles.container}>
       <View style={{  alignItems: 'center', justifyContent: 'center' }}>
       <Image source={{ uri: "https://firebasestorage.googleapis.com/v0/b/reactnativeolx-ba4c0.appspot.com/o/result%20(1).png?alt=media&token=6c3a4f2e-9a93-40a6-aaa9-2b7052d22159" }} style={{ width: 300, height: 200 }} />
     </View>




        <Card style={styles.cardstyle} >
            <TextInput
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={email => setEmail(email)}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={password => setPassword(password)}
            />

       </Card>   
            
                

            <TouchableOpacity style={styles.purchaseCon}  onPress={handleclick}> 
                                    <Text style={styles.purchase}>
                                        Login
                                    </Text>
                                 </TouchableOpacity>
        <View style={styles.pageswitcher}>
            <Text style={styles.alreadyaccount}>Don't have an Account? 
                <TouchableOpacity
                 onPress={() => navigation.navigate('SignUp')}
                >
                    <Text style={styles.authpages}> SignUp Page</Text>
                </TouchableOpacity>
            </Text>
        </View>
            </SafeAreaView>

        </>
    )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'grey',
        display:'flex',
        flex:1
    },
    cardstyle:{
        margin:14,
        padding:10
    },
    mainheading:{
        fontSize:24,
        fontWeight:'bold',
        color:'white',
        textAlign:'center',
        margin:8
    },purchase:{
        backgroundColor:'yellow',
        padding:5,
        fontWeight:'bold',
        color:'grey',
        width:80,
        borderRadius:9,
        textAlign:'center',
        borderWidth:2 ,
        borderColor:'grey',
        marginTop:14,
        marginBottom:5
        },
        purchaseCon:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center'    
        },
        pageswitcher:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center'
        },
        alreadyaccount:{
            color:'white'
        },
        authpages:{
color:'yellow',
fontWeight:'bold',
textDecorationLine:'underline'
        }
})