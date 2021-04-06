import React, { useState } from 'react';
import { Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import global from '../../constants/global';

import { COLORS, SIZES, FONTS, icons, images } from '../../constants';

const axios = require('axios');

const Profile = ({ navigation }) => {
	const [image, setImage] = useState(global.userInfo.user_image);
	const [data, setData] = useState(null);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.cancelled) {
			setImage(result.uri);
			setData(result);
		}
	};

	const uploadPhoto = () => {
		
		var link =
			'http://myebookapp.000webhostapp.com//user_profile_upload_image_api.php?id=' +
			global.userInfo.user_id +
			'&user_image=' +
			data;
		axios
			.get(link)
			.then(function (response) {
				console.log(response);
				if (response.EBOOK_APP[0].success == 1) {
					global.userInfo.user_image = image;
				}
			})
			.catch(function (err) {
				console.log(err);
			});
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#009688' }}>
			<ScrollView style={{ height: '100%', backgroundColor: COLORS.black }} showsVerticalScrollIndicator={false}>
				<View style={{ height: 70, backgroundColor: COLORS.black }}>
					<TouchableOpacity
						style={{ margin: 15, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}
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
						{/* Update Image */}
						<View
							style={{
								backgroundColor: 'rgba(255, 255, 255,0.1)',
								borderRadius: 10,
								margin: 20,
								flexDirection: 'row',
								marginTop: 20,
								marginBottom: 10,
							}}
						>
							{/* Chose Image */}
							<View
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									margin: 10,
								}}
							>
								<TouchableOpacity
									style={{
										backgroundColor: '#009688',
										width: 90,
										height: 90,
										borderRadius: 100,
										justifyContent: 'center',
										alignItems: 'center',
										marginBottom: 10,
									}}
									activeOpacity={0.7}
									onPress={pickImage}
								>
									{image && (
										<Image
											source={{
												uri: image,
											}}
											style={{
												backgroundColor: '#fff',
												width: 80,
												height: 80,
												borderRadius: 100,
											}}
										/>
									)}
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										backgroundColor: '#F96D41',
										width: 80,
										height: 40,
										borderRadius: 10,
										justifyContent: 'center',
										alignItems: 'center',
									}}
									activeOpacity={0.7}
									onPress={uploadPhoto()}
								>
									<Text
										style={{
											fontSize: 14,
											color: '#fff',
											fontWeight: 'bold',
											textAlign: 'center',
										}}
									>
										Cập nhật
									</Text>
								</TouchableOpacity>
							</View>
							{/* User Information */}
							<View
								style={{
									marginLeft: 10,
									justifyContent: 'center',
									backgroundColor: '#fff',
									width: 1,
									margin: 20,
								}}
							></View>
							{/* User Information */}
							<View
								style={{
									justifyContent: 'center',
								}}
							>
								<Text style={{ fontSize: 22, color: '#fff', fontWeight: 'bold', marginBottom: 15 }}>
									{global.userInfo.name}
								</Text>
								<Text style={{ fontSize: 14, color: '#fff', marginBottom: 15 }}>Ngày tham gia</Text>
								<Text style={{ fontSize: 14, color: '#fff', marginBottom: 15 }}>
									{global.userInfo.dt_register}
								</Text>
							</View>
						</View>
						{/* change information */}
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
								editable={false}
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
							<Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Cập Nhật</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Profile;
