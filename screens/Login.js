import React from 'react'
import { Text, View , Image, TextInput} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import logo from '../assets/images/logo.jpg'

import { COLORS, SIZES, FONTS , icons, images} from '../constants';


const Login = ({navigation}) => {


    return (
        <View style={{ backgroundColor: '#fff', height: '100%' }}>
            
            <Image source={logo}
                style={{ alignSelf: "center" ,width: "60%" ,height: "20%", marginTop: 40}}
            />
            <Text
                style={{
                    fontSize: 30,
                    fontFamily : 'Colus-Regular',
                    alignSelf : 'center',
                }}
            >LOGIN</Text>

            <View style={{ 
                flexDirection: 'row',
                alignItems : 'center',
                marginHorizontal : 30,
                borderWidth:2,
                marginTop : 30,
                paddingHorizontal: 10,
                borderColor : "#00716F",
                borderRadius: 25,
                paddingVertical : 4,
                

            }}>
                <Icon name='mail' color="#00716F" size={35}/>
                <TextInput 
                    style={{paddingHorizontal :10}}
                />
                
            </View>
            <View style={{ 
                flexDirection: 'row',
                alignItems : 'center',
                marginHorizontal : 30,
                borderWidth:2,
                marginTop : 15,
                paddingHorizontal: 15,
                borderColor : "#00716F",
                borderRadius: 25,
                paddingVertical : 4,
            }}> 
                <Icon name='mail' color="#00716F" size={35}/>
                <TextInput 
                    style={{ paddingHorizontal : 10}}
                />

            </View>

            <View style={{
                marginHorizontal : 30,
                alignItems : 'center',
                justifyContent : 'center',
                marginTop : 20,
                backgroundColor : "#00716F",
                paddingVertical : 10,
                borderRadius:25,
            }}>
                <Text style={{ color: 'white', fontFamily: "Colus-Regular", fontSize: 18 }}>
                    Login    
                </Text>
            </View>
            <View style={{
                marginHorizontal : 30,
                alignItems : 'center',
                justifyContent : 'center',
                marginTop : 20,
                paddingVertical : 8,
            }}>
                <TouchableOpacity
                onPress={() => navigation.navigate('Register')}>
                    <Text
                    style={{
                        fontSize: 18,
                        fontFamily : 'Colus-Regular',
                        color : 'blue',
                    }}>Register</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                flexDirection: 'row',
                 marginHorizontal : 30,
                 alignItems : 'center',
                 justifyContent : 'center',
                 marginTop : 20,
                 backgroundColor : "#0e4eef",
                 paddingVertical : 13,
                 
            }}>
                <Image
                    source={icons.facebook}
                    style={{marginRight: 15, width: 20, height: 20 }}
                />
                
                <TouchableOpacity
                onPress={() => navigation.navigate('Register')}>
                    <Text
                    style={{
                        color: 'white',
                        marginLeft : 10,
                        fontSize: 18,
                        fontFamily : 'Colus-Regular',
                    }}>Login With Facebook</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                flexDirection: 'row',
                 marginHorizontal : 30,
                 
                 
                 marginTop : 20,
                 backgroundColor : "#c92520",
                 paddingVertical : 13,
                 
            }}>

                <Image
                    source={icons.google_icon}
                    style={{marginLeft: 20, width: 20, height: 20 }}
                />
                <TouchableOpacity
                onPress={() => navigation.navigate('Register')}>
                    <Text
                    style={{
                        color: 'white',
                        marginLeft : 30,
                        fontSize: 18,
                        fontFamily : 'Colus-Regular',
                    }}>Login With Google</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )

}

export default Login;
