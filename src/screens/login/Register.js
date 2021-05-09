import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, TextInput } from 'react-native';
import { SIZES, icons } from '../../constants';
import logo from '../../assets/images/logo.png';
import background from '../../assets/images/background.png';

const axios = require('axios');

const Register = ({ navigation }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [phone, setPhone] = useState('');

	const hamRegister = () => {
		axios
			.get(
				'http://myebookapp.000webhostapp.com//user_register_api.php?name=' +
					name +
					'&email=' +
					email +
					'&password=' +
					password +
					'&phone=' +
					phone
			)
			.then(function (response) {
				var success = response.data.EBOOK_APP[0].success;
				var msg = response.data.EBOOK_APP[0].msg;
				if (success == 1) {
					alert(msg);
					navigation.navigate('Login');
				} else {
					alert(msg);
				}
			})
			.catch(function (err) {
				console.log(err);
			});
	};

	return (
		<ImageBackground source={background} style={{ flex: 1, height: '100%', justifyContent: 'space-between' }}>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<TouchableOpacity style={{ marginLeft: SIZES.base, marginTop: 20 }} onPress={() => navigation.goBack()}>
					<Image
						source={icons.back_arrow_icon}
						resizeMode="contain"
						style={{
							width: 30,
							height: 30,
							tintColor: 'white',
							margin: 15,
							marginLeft: 30,
						}}
					/>
				</TouchableOpacity>
				<Image source={logo} style={{ width: 100, height: 100, margin: 20 }} />
			</View>

			<View style={{ alignItems: 'center' }}>
				<Text
					style={{
						fontSize: 35,
						color: 'white',
						fontFamily: 'Roboto-Regular',
					}}
				>
					Đăng Kí
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
						placeholder="Tên"
						placeholderTextColor="white"
						onChangeText={(text) => setName(text)}
						value={name}
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
						placeholder="Email"
						placeholderTextColor="white"
						onChangeText={(text) => setEmail(text)}
						value={email}
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
						placeholder="Số điện thoại"
						placeholderTextColor="white"
						onChangeText={(text) => setPhone(text)}
						value={phone}
					/>
				</View>
				<TouchableOpacity style={{ marginLeft: SIZES.base, width: 300, height: 160 }} onPress={hamRegister}>
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
						<Text style={{ color: 'white', fontFamily: 'Colus-Regular', fontSize: 18 }}>Đăng kí</Text>
					</View>
				</TouchableOpacity>
			</View>
			<View
				style={{
					height: 80,
				}}
			></View>
		</ImageBackground>
	);
};

export default Register;
