import React ,{useState}from 'react'
import { Text, View , Image, TextInput, ImageBackground} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import logo from '../../assets/images/logo.jpg'
import background from '../../assets/images/background.png'
import global from '../../constants/global';
import { COLORS, SIZES, FONTS , icons, images} from '../../constants';

const axios = require('axios');
    

const Login = ({navigation}) => {

    const [username, setUserName] = useState('H');
    const [password, setPassword] = useState('h');
    

    const functionLogin = () => {
        axios.get('http://myebookapp.000webhostapp.com//user_login_api.php?email='+ username +'&password=' + password)
            .then(
                function (response) {
                    var id = (response.data.EBOOK_APP)[0].user_id;
                    if (id != null){
                        var link = 'http://myebookapp.000webhostapp.com//user_profile_api.php?id=' + id;
                            
                            axios.get(link)
                                .then(function (res) {
                                    global.userInfo = (res.data.EBOOK_APP)[0];
                                    navigation.navigate('Home');
                                })
                                .catch(function (error) {
                                    consol.log(error);
                                })

                    } else {
                        alert('Login failed!!!')

                    }
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    return (
        <ImageBackground source={background} style={{  height: '100%' }}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', height: '100%' }}>
            <Image source={logo}
                style={{ alignSelf: "center" ,width: "60%" ,height: "20%", marginTop: 40}}
            />
            <Text
                style={{
                    color: 'white',
                    fontSize: 30,
                    fontFamily : 'Colus-Regular',
                    alignSelf : 'center',
                    marginTop : 20
                }}
            >LOGIN</Text>

            <View style={{ 
                flexDirection: 'row',
                alignItems : 'center',
                marginHorizontal : 30,
                borderWidth:2,
                marginTop : 50,
                paddingHorizontal: 10,
                borderColor : "#2c3d6b",
                borderRadius: 25,
                paddingVertical : 4,
                

            }}>
                
                <TextInput 
                    style={{ height: 38,width:250,paddingHorizontal : 12,color : 'white'}}
                    
                    placeholder="Email"
                    placeholderTextColor = 'white'
                    onChangeText = {(text) => setUserName(text)}
                    value = {username}
                />
                
            </View>
            <View style={{ 
                flexDirection: 'row',
                alignItems : 'center',
                marginHorizontal : 30,
                borderWidth:2,
                marginTop : 15,
                paddingHorizontal: 15,
                borderColor : "#2c3d6b",
                borderRadius: 25,
                paddingVertical : 4,
            }}> 

                <TextInput 
                    style={{ height: 38,width:250,paddingHorizontal : 12,color : 'white'}}
                    placeholder="Password"
                    placeholderTextColor = 'white'
                    secureTextEntry = {true}
                    onChangeText = {(text) => setPassword(text)}
                    value = {password}
                />

            </View>


            <TouchableOpacity
                style={{ marginLeft: SIZES.base }}
                onPress={functionLogin}
            >
                <View style={{
                    marginHorizontal : 20,
                    alignItems : 'center',
                    justifyContent : 'center',
                    marginTop : 30,
                    backgroundColor : "#2c3d6b",
                    paddingVertical : 12,
                    borderRadius:25,
                }}>
                    <Text style={{ color: 'white', fontFamily: "Colus-Regular", fontSize: 18 }}>
                        Login    
                    </Text>
                    
                </View>
            </TouchableOpacity>
            <View style={{
                marginHorizontal : 30,
                alignItems : 'center',
                justifyContent : 'center',
                marginTop : 60,
                paddingVertical : 8,
            }}>
                <TouchableOpacity
                onPress={() => navigation.navigate('Register')}>
                    <Text
                    style={{
                        fontSize: 18,
                        fontFamily : 'Colus-Regular',
                        color : 'white',
                    }}>Register</Text>
                </TouchableOpacity>
            </View>

            {/* <View style={{
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
            </View> */}

            {/* <View style={{
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
            </View> */}
            
            
        </View>
        </ImageBackground>
    )

}

export default Login;
