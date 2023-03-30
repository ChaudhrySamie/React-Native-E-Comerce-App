import React from "react";
import { uploadImage } from "../../Config/Firebase";
import { Card } from 'react-native-paper';
import { useState,useEffect} from "react";
import { TouchableOpacity, Button, View,Platform, Image, StyleSheet, SafeAreaView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Text, TextInput } from "react-native-paper";
import { signUp } from "../../Config/Firebase"


export default function Signup({ navigation }) {
  const [firstname, setfirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [contactno, setContactno] = useState("")
    const [email, setEmail] = useState("")
    console.log(email)
    const [password, setPassword] = useState("")
    const [image, setImage] = useState(null);

    
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };



    const handleclick = async () => {

        const profilePic =await uploadImage(image)
        const result = await signUp(email, password, firstname, lastname, contactno ,profilePic)
        console.log("result", result)
        if (result.error) {
            swal("Error!", result.message, "error");
        } else {
            swal("Success!", result.message, "success");
        }
    }


    return (
        <>
        
            <SafeAreaView style={styles.container}>
                <Text style={styles.mainheading}>Register Your Account</Text>
                <Card style={styles.cardstyle} >
                    <TextInput
                        label="First Name"
                        value={firstname}
                        onChangeText={firstname => setfirstName(firstname)}
                    />
                    <TextInput
                        label="Last Name"
                        value={lastname}
                        onChangeText={lastname => setLastName(lastname)}
                    />
                    <TextInput
                        label="Contact #"
                        value={contactno}
                        onChangeText={contactno => setContactno(contactno)}
                    />
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
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={password => setPassword(password)}
                    />
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
                        <Button title="Pick Profile Pic" onPress={pickImage} />
                        {/* {image && <Image source={{ uri: image }} style={{ width: 60, height: 60 }} />} */}
                        
                    </View>
                </Card>


                <TouchableOpacity style={styles.purchaseCon} onPress={handleclick}  >
                    <Text style={styles.purchase}>
                        SignUp
                    </Text>
                </TouchableOpacity>
                <View style={styles.pageswitcher}>
                    <Text style={styles.alreadyaccount}>Already have an account?
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.authpages}> Login</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </SafeAreaView>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'grey',
        display: 'flex',
        flex: 1
    },
    cardstyle: {
        margin: 8,
        padding: 10
    },
    mainheading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        margin: 8
    },
     purchase: {
        backgroundColor: 'yellow',
        padding: 5,
        fontWeight: 'bold',
        color: 'grey',
        width: 80,
        borderRadius: 9,
        textAlign: 'center',
        borderWidth: 2,
        borderColor: 'grey',
        marginTop: 8,
        marginBottom: 5
    },
    purchaseCon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    pageswitcher: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    alreadyaccount: {
        color: 'white'
    },
    authpages: {
        color: 'yellow',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
})