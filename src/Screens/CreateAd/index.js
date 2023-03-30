import React from "react";
import { useState } from 'react';
import { StyleSheet,Text,TouchableOpacity,Button, View} from "react-native";
import { TextInput,Card} from "react-native-paper";
import { SafeAreaView} from "react-native-safe-area-context";
import { createAd } from "../../Config/Firebase";
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from "../../Config/Firebase";


export default function CreateAd() {
    const [title, setTitle] = useState("")
    const [descryption, setDescryption] = useState("")
    const [price, setPrice] = useState("")

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
       const addpic =await uploadImage(image)
       createAd(title, descryption, price,addpic)
      
    }

    return (
        <>
    <SafeAreaView style={styles.container}>
        <Text style={styles.mainheading}>Post An Add</Text>
        <Card style={styles.cardstyle} >
            
            <TextInput
                label="Title"
                value={title}
                onChangeText={title => setTitle(title)}
            />
            <TextInput
                label="Descryption"
                value={descryption}
                onChangeText={descryption => setDescryption(descryption)}
            />
            <TextInput
                label="Price"
                value={price}
                onChangeText={price => setPrice(price)}
            />

          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
                        <Button title="Pick Profile Pic" onPress={pickImage} />
                        {/* {image && <Image source={{ uri: image }} style={{ width: 60, height: 60 }} />} */}
                        
          </View>

            </Card>
            <TouchableOpacity style={styles.purchaseCon} onPress={handleclick}  >
                    <Text style={styles.purchase}>
                        Post
                    </Text>
                </TouchableOpacity>
            
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