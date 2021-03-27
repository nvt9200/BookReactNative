import React from 'react';
import { Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import global from '../../constants/global';

import { COLORS, SIZES, FONTS, icons, images } from '../../constants';

const Profile = ({ navigation }) => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#009688' }}>
			<ScrollView style={{ height: '100%', backgroundColor: COLORS.black }} showsVerticalScrollIndicator={false}>
				<View style={{ height: 120, backgroundColor: COLORS.black }}>
					<TouchableOpacity
						style={{ margin : 15, width: 40, height: 40, justifyContent : 'center', alignItems : 'center' }}
						onPress={() => navigation.goBack()}
					>
						<Image
							source={icons.back_arrow_icon}
							resizeMode="contain"
							style={{
								width: 25,
								height: 25,
								tintColor: '#fff',
							}}
						/>
					</TouchableOpacity>
				</View>
				<View style={{ height: 8, backgroundColor: '#009688' }}></View>
				<View style={{ backgroundColor: COLORS.black }}>
					<View>
						<View style={{ alignItems: 'center', marginTop: 10, marginBottom : 10 }}>
							<TouchableOpacity
								style={{
									backgroundColor: '#009688',
									width: 140,
									height: 140,
									borderRadius: 100,
									marginTop: -80,
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Image
									source={{
										uri:
											'http://myebookapp.000webhostapp.com/images/user_images/' +
											global.userInfo.user_image,
									}}
									style={{
										backgroundColor: '#fff',
										width: 125,
										height: 125,
										borderRadius: 100,
									}}
								></Image>
							</TouchableOpacity>

							<Text style={{ fontSize: 22, color: '#fff', fontWeight: 'bold', padding: 10 }}>
								{global.userInfo.name}
							</Text>
							<Text style={{ fontSize: 14, color: '#fff', textAlign: 'center', padding: 10 }}>
								Ngày tham gia
							</Text>
							<Text style={{ fontSize: 14, color: '#fff' }}>{global.userInfo.dt_register}</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								marginLeft: 20,
								marginRight: 20,
								margin: 10,
							}}
						>
							<Text
								style={{
									fontSize: 14,
									color: '#fff',
									flexDirection: 'row',
									justifyContent: 'center',
									fontWeight: 'bold',
								}}
							>
								Email
							</Text>
							<TextInput
								style={{
									alignSelf: 'center',
									flexDirection: 'row',
									justifyContent: 'center',
									backgroundColor: 'rgba(255, 255, 255,0.1)',
									width: '75%',
									padding: 10,
									paddingBottom: 12,
									borderRadius: 15,
									borderWidth: 1.5,
									borderColor: '#009688',
									paddingLeft: 15,
									color: '#fff',
								}}
								placeholderTextColor="rgb(255, 255, 255)"
							>
								{global.userInfo.email}
							</TextInput>
						</View>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								marginLeft: 20,
								marginRight: 20,
								margin: 10,
							}}
						>
							<Text
								style={{
									fontSize: 14,
									color: '#fff',
									flexDirection: 'row',
									justifyContent: 'center',
									fontWeight: 'bold',
								}}
							>
								Password
							</Text>
							<TextInput
								style={{
									alignSelf: 'center',
									flexDirection: 'row',
									justifyContent: 'center',
									backgroundColor: 'rgba(255, 255, 255,0.1)',
									width: '75%',
									padding: 10,
									paddingBottom: 12,
									borderRadius: 15,
									borderWidth: 1.5,
									borderColor: '#009688',
									paddingLeft: 15,
									color: '#fff',
								}}
								placeholder="Password"
								placeholderTextColor="rgb(255, 255, 255)"
							>
								{global.userInfo.password}
							</TextInput>
						</View>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								marginLeft: 20,
								marginRight: 20,
								margin: 10,
							}}
						>
							<Text
								style={{
									fontSize: 14,
									color: '#fff',
									flexDirection: 'row',
									justifyContent: 'center',
									fontWeight: 'bold',
								}}
							>
								Name
							</Text>
							<TextInput
								style={{
									alignSelf: 'center',
									flexDirection: 'row',
									justifyContent: 'center',
									backgroundColor: 'rgba(255, 255, 255,0.1)',
									width: '75%',
									padding: 10,
									paddingBottom: 12,
									borderRadius: 15,
									borderWidth: 1.5,
									borderColor: '#009688',
									paddingLeft: 15,
									color: '#fff',
								}}
								placeholder="Name"
								placeholderTextColor="rgb(255, 255, 255)"
							>
								{global.userInfo.name}
							</TextInput>
						</View>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								marginLeft: 20,
								marginRight: 20,
								margin: 10,
							}}
						>
							<Text
								style={{
									fontSize: 14,
									color: '#fff',
									flexDirection: 'row',
									justifyContent: 'center',
									fontWeight: 'bold',
								}}
							>
								Phone
							</Text>
							<TextInput
								style={{
									alignSelf: 'center',
									flexDirection: 'row',
									justifyContent: 'center',
									backgroundColor: 'rgba(255, 255, 255,0.1)',
									width: '75%',
									padding: 10,
									paddingBottom: 12,
									borderRadius: 15,
									borderWidth: 1.5,
									borderColor: '#009688',
									paddingLeft: 15,
									color: '#fff',
								}}
								placeholder="Phone"
								placeholderTextColor="rgb(255, 255, 255)"
							>
								{global.userInfo.phone}
							</TextInput>
						</View>
						<TouchableOpacity
							style={{
								alignSelf: 'center',
								flexDirection: 'row',
								justifyContent: 'center',
								backgroundColor: '#F96D41',
								width: '70%',
								padding: 14,
								paddingBottom: 16,
								borderRadius: 10,
								shadowOpacity: 80,
								elevation: 15,
								marginTop: 50,
								marginBottom: 40,
							}}
						>
							<Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>
								Cập Nhật
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Profile;
