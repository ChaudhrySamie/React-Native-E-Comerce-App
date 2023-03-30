import React from 'react'
import { useState, useEffect } from 'react';
import { getCurrentUserData } from '../../Config/Firebase';
import { ScrollView, StyleSheet, Text, View,TouchableOpacity ,Image} from 'react-native';
import { Card } from 'react-native-paper';
import { getAllAds, auth } from '../../Config/Firebase';
import { signOut } from "firebase/auth";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Dashboard({ navigation }) {

const [allAds, setAllAds] = useState()
const [userData, setUserData] = useState({})
   
console.log("add aya", allAds)

    const callApi = async () => {
       
      const result = await getAllAds()
      setAllAds(result.data)

      const result2 = await getCurrentUserData()
      console.log("Result====>", result2)
      setUserData(result2)
      console.log(userData)
    }


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
                <Text style={styles.mainheading}>Welcome to E-Shopping Hutt</Text>
                <Text style={styles.userheading}>Hii {userData.firstname} !</Text>
                <View style={styles.buttoninline}>
                 
                 <TouchableOpacity  style={{borderRightWidth:2,borderRadius:0,borderColor:'white',padding:8}}
                 onPress={
                 () => navigation.navigate('My_Profile')}
                 >
                <Text style={{textAlign:'center',fontWeight:'bold',color:'#E2DCCD'}}> Profile Page</Text>
                </TouchableOpacity>

                 <TouchableOpacity style={{borderRightWidth:2,borderRadius:0,borderColor:'white',textAlign:'center',padding:8}}
                 onPress={
                   () => navigation.navigate('Create Your Add')}
                 >
                <Text style={{textAlign:'center',fontWeight:'bold',color:'#E2DCCD'}}>Create Add</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{borderRightWidth:2,borderRadius:0,borderColor:'white',textAlign:'center',padding:8}}
                 onPress={
                   () => navigation.navigate('My_Adds')}
                 >
                <Text style={{textAlign:'center',fontWeight:'bold',color:'#E2DCCD'}}>My Adds</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{textAlign:'center',padding:8}}
                    
                    onPress={async () => {
                        await signOut(auth)
                        navigate('Login')
                    }}
                ><Text style={{textAlign:'center',fontWeight:'bold',color:'#E2DCCD'}}>Logout</Text>
                </TouchableOpacity>
                
                </View>
            
            <ScrollView >
                {
                    allAds.map((item, index) => {
                        return <View>
                            <Card style={styles.cardstyle} key={index}>
                            <View style={{display:'flex',justifyContent:'center',flexDirection:'row'}} >
                            <Image source={{ uri:  item.addpic }} style={{ width: 290, height: 280,borderRadius:6,margin:6}} />
                            </View>
                                <Text style={styles.addTittle}> {item.title} </Text>
                                <Text style={styles.addDcr}> Descryption :  {item.descryption}</Text>
                                <Text style={styles.addPrice}> Price  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:  {item.price} pkr</Text>
                                 <TouchableOpacity style={styles.purchaseCon}  onPress={
                   () => alert('03012303563 =>(Contact Me)')}>
                                    <Text style={styles.purchase}>
                                        Buy Now
                                    </Text>
                                 </TouchableOpacity>
                            </Card>
                        </View>
                    })
                }
            </ScrollView>
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
    fontSize:14,
    fontWeight:'bold',
    color:'white',
    textAlign:'center'
},
userheading:{
    fontSize:24,
    fontWeight:'bold',
    color:'yellow',
    textAlign:'center',
     marginTop:4
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
    margin:20,
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