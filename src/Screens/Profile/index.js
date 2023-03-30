import React from 'react'
import { useState,useEffect } from 'react';
import { SafeAreaView,StyleSheet,Image ,View} from 'react-native';
import { Text } from 'react-native-paper'
import { Card } from 'react-native-paper';
import { getCurrentUserData } from '../../Config/Firebase'

export default function Profile(){
   const [userData,setUserData]=useState({});

    const callApi = async () => {
        const result = await getCurrentUserData()
        console.log("Result====>", result)
        setUserData(result)
        console.log(userData)
    }
  
    // callApi()
    useEffect(() => {
        callApi()
    }, [])
  

    return(
        <SafeAreaView style={styles.container}>
        <Text style={styles.mainheading}>Current User Profile Page</Text>
        <Card style={styles.cardstyle} >

        <View style={{  alignItems: 'center', justifyContent: 'center' }}>
      
       <Image source={{ uri:  userData.profilePic }} style={{ width: 200, height: 200,borderRadius:90,borderWidth:2,borderColor:'grey',marginBottom:30,marginTop:10 }} />
     </View>

                                <Text style={styles.addTittle}> User Name: {userData.firstname} {userData.lastname}</Text>
                                <Text style={styles.addDcr}> User Phone# &nbsp;: {userData.contactno}</Text>
                                <Text style={styles.addPrice}> User Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {userData.email} </Text>
                                {/* <TouchableOpacity style={styles.purchaseCon}  onPress={
                   () => alert('03012303563 =>(Contact Me)')}>
                                    <Text style={styles.purchase}>
                                        Buy Now
                                    </Text>
                                 </TouchableOpacity> */}
                            </Card>
        
        </SafeAreaView>
        
    )
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'grey',
        display:'flex',
        flex:1
    },
    mainheading:{
        marginTop:8,
        fontSize:14,
        fontWeight:'bold',
        color:'white',
        textAlign:'center'
    },cardstyle:{
        margin:6,
        padding:10
    },
    purchase:{
    backgroundColor:'yellow',
    padding:5,
    fontWeight:'bold',
    color:'grey',
    width:80,
    borderRadius:9,
    textAlign:'center',
    borderWidth:2 ,
    borderColor:'grey',
    marginTop:8
    },
    purchaseCon:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end'    
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