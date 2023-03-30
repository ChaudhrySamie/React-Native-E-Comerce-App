import React from 'react';
import { useState, useEffect } from 'react';
import { getCurrentUserData } from '../../Config/Firebase';
import { ScrollView, StyleSheet, Text, View,TouchableOpacity ,Image} from 'react-native';
import { Card } from 'react-native-paper';
import { getAllAds, auth } from '../../Config/Firebase';
import { signOut } from "firebase/auth";
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCurrentUserAds } from '../../Config/Firebase';

const MyAdds = () => {
    
    const [allAds, setAllAds] = useState()

    const callApi = async () => {
        const result = await getCurrentUserAds()
        setAllAds(result.data)
    }

    // callApi()
    useEffect(() => {
        callApi()
    }, [])


    if (!allAds) {
        return (
            <View style={{textAlign:'center'}}><Text>Loading</Text></View>
        )
    }
  return (
          

      <SafeAreaView style={styles.container}>
                <Text style={styles.mainheading}>Your Posted Adds</Text>
                
            <ScrollView >
                {
                    allAds.map((item, index) => {
                        return <View>
                            <Card style={styles.cardstyle} key={index}>
                            <View style={{display:'flex',justifyContent:'center',flexDirection:'row'}} >
                            <Image source={{ uri:  item.addpic }} style={{ width: 200, height: 200,borderRadius:6,borderWidth:2,borderColor:'grey',margin:6}} />
                            </View>
                                <Text style={styles.addTittle}> {item.title} </Text>
                                <Text style={styles.addDcr}> Descryption :  {item.descryption}</Text>
                                <Text style={styles.addPrice}> Price  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:  {item.price} pkr</Text>
                                
                            </Card>
                        </View>
                    })
                }
            </ScrollView>
            </SafeAreaView>
        
    )
}   
export default MyAdds;

const styles=StyleSheet.create({
    container:{
        backgroundColor:'grey',
        display:'flex',
        flex:1
    },
    mainheading:{
        fontSize:16,
        fontWeight:'bold',
        color:'white',
        textAlign:'center'
    },
   
    buttoninline:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        borderWidth:2,
        borderRadius:9,
        borderColor:'white',
        margin:7
    },
    cardstyle:{
        margin:6,
        padding:10
    },
   
  
    addTittle:{
        fontSize:21,
        fontWeight:'bold',
        color:'yellow',
    backgroundColor:'grey',
    padding:2,
    borderRadius:4,
        marginBottom:10
    },
    addDcr:{
        color:'grey',
        marginBottom:5,
        fontWeight:'bold',
    },
    addPrice:{
        color:'grey',
        fontWeight:'bold',
    }
    
    })
     
