import React, { useState } from 'react';
import { Text, View, Image, TextInput, ImageBackground, ToastAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import logo from '../../assets/images/logo.png';
import background from '../../assets/images/background.png';
import global from '../../constants/global';
import { SIZES } from '../../constants';

const axios = require('axios');

const Login = ({ navigation }) => {
	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');

	const functionLogin = () => {
		axios
			.get('http://myebookapp.000webhostapp.com//user_login_api.php?email=' + username + '&password=' + password)
			.then(function (response) {
				var id = response.data.EBOOK_APP[0].user_id;
				if (id != null) {
					var link = 'http://myebookapp.000webhostapp.com//user_profile_api.php?id=' + id;

					axios
						.get(link)
						.then(function (res) {
							global.userInfo = res.data.EBOOK_APP[0];
							if (
								global.userInfo.user_image == null ||
								global.userInfo.user_image == undefined ||
								global.userInfo.user_image == ''
							) {
								global.userInfo.user_image =
									'http://myebookapp.000webhostapp.com/images/user_images/user_no_image.png';
							} else {
								global.userInfo.user_image =
									'http://myebookapp.000webhostapp.com/images/user_images/' +
									global.userInfo.user_image;
							}
							navigation.navigate('Home');
						})
						.catch(function (error) {
							console.log(error);
						});
				} else {
					ToastAndroid.show('Login failed!!!', ToastAndroid.LONG);
				}
			})
			.catch(function (err) {
				console.log(err);
			});
	};

	return (
		<ImageBackground source={background} style={{ height: '100%' }}>
			<View style={{ backgroundColor: 'rgba(0,0,0,0.3)', height: '100%' }}>
				<Image
					source={logo}
					style={{
						alignSelf: 'center',
						width: '70%',
						resizeMode: 'contain',
						height: '22%',
						marginTop: 60,
					}}
				/>
				<Text
					style={{
						color: 'white',
						fontSize: 30,
						fontFamily: 'Colus-Regular',
						alignSelf: 'center',
						marginTop: 20,
					}}
				>
					Đăng Nhập
				</Text>

				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginHorizontal: 30,
						borderWidth: 2,
						marginTop: 50,
						paddingHorizontal: 10,
						borderColor: '#2c3d6b',
						borderRadius: 25,
						paddingVertical: 4,
					}}
				>
					<TextInput
						style={{ height: 38, width: 250, paddingHorizontal: 12, color: 'white' }}
						placeholder="Email"
						placeholderTextColor="white"
						onChangeText={(text) => setUserName(text)}
						value={username}
					/>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginHorizontal: 30,
						borderWidth: 2,
						marginTop: 15,
						paddingHorizontal: 15,
						borderColor: '#2c3d6b',
						borderRadius: 25,
						paddingVertical: 4,
					}}
				>
					<TextInput
						style={{ height: 38, width: 250, paddingHorizontal: 12, color: 'white' }}
						placeholder="Mật khẩu"
						placeholderTextColor="white"
						secureTextEntry={true}
						onChangeText={(text) => setPassword(text)}
						value={password}
					/>
				</View>

				<TouchableOpacity style={{ marginLeft: SIZES.base }} onPress={functionLogin}>
					<View
						style={{
							marginHorizontal: 20,
							alignItems: 'center',
							justifyContent: 'center',
							marginTop: 30,
							backgroundColor: '#2c3d6b',
							paddingVertical: 12,
							borderRadius: 25,
						}}
					>
						<Text style={{ color: 'white', fontFamily: 'Colus-Regular', fontSize: 18 }}>ĐĂNG NHẬP</Text>
					</View>
				</TouchableOpacity>
				<View
					style={{
						marginHorizontal: 30,
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: 60,
						paddingVertical: 8,
					}}
				>
					<TouchableOpacity onPress={() => navigation.navigate('Register')}>
						<Text
							style={{
								fontSize: 18,
								fontFamily: 'Colus-Regular',
								color: 'white',
							}}
						>
							Đăng kí
						</Text>
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
	);
};

export default Login;
