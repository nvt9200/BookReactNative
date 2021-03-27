import React from 'react';
import { Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import global from '../../constants/global';
import { COLORS, SIZES, FONTS, icons, images } from '../../constants';

const Setting = ({ navigation }) => {
	console.log(global.userInfo);
	function settingHeader() {
		return (
			<View style={{ alignItems: 'center', marginTop: 10 }}>
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

					onPress={() => {
						navigation.navigate('Profile');
					}}
				>
					<Image
						source={{
							uri: 'http://myebookapp.000webhostapp.com/images/user_images/' + global.userInfo.user_image,
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
				<Text style={{ fontSize: 14, color: '#fff', textAlign: 'center', padding: 10 }}>Ngày tham gia</Text>
				<Text style={{ fontSize: 14, color: '#fff' }}>{global.userInfo.dt_register}</Text>
			</View>
		);
	}

	function settingBody() {
		return (
			<View>
				<TouchableOpacity
					style={{
						alignSelf: 'center',
						flexDirection: 'row',
						justifyContent: 'center',
						backgroundColor: '#909090',
						width: '90%',
						padding: 18,
						paddingBottom: 20,
						borderRadius: 10,
						shadowOpacity: 80,
						elevation: 15,
						marginTop: 15,
					}}
				>
					<Image source={icons.bell} style={{ width: 20, height: 20, tintColor: '#fff' }}></Image>
					<Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold', marginLeft: 15 }}>
						Xây dựng thói quen
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						alignSelf: 'center',
						flexDirection: 'row',
						justifyContent: 'center',
						backgroundColor: '#909090',
						width: '90%',
						padding: 18,
						paddingBottom: 20,
						borderRadius: 10,
						shadowOpacity: 80,
						elevation: 15,
						marginTop: 15,
					}}
				>
					<Image source={icons.like} style={{ width: 20, height: 20, tintColor: '#fff' }}></Image>
					<Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold', marginLeft: 15 }}>Đánh giá</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						alignSelf: 'center',
						flexDirection: 'row',
						justifyContent: 'center',
						backgroundColor: '#909090',
						width: '90%',
						padding: 18,
						paddingBottom: 20,
						borderRadius: 10,
						shadowOpacity: 80,
						elevation: 15,
						marginTop: 15,
					}}
				>
					<Image source={icons.language} style={{ width: 20, height: 20, tintColor: '#fff' }}></Image>
					<Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold', marginLeft: 15 }}>Ngôn Ngữ</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						alignSelf: 'center',
						flexDirection: 'row',
						justifyContent: 'center',
						backgroundColor: '#F96D41',
						width: '90%',
						padding: 18,
						paddingBottom: 20,
						borderRadius: 10,
						shadowOpacity: 80,
						elevation: 15,
						marginTop: 15,
						marginBottom: 40,
					}}
				>
					<Image source={icons.logout} style={{ width: 20, height: 20, tintColor: '#fff' }}></Image>
					<Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold', marginLeft: 15 }}>Đăng Xuất</Text>
				</TouchableOpacity>
			</View>
		);
	}

    function setting () {
        return (
			<ScrollView style={{ height: '100%', backgroundColor: COLORS.black }} showsVerticalScrollIndicator={false}>
				<View style={{ height: 120, backgroundColor: COLORS.black }}></View>
				<View style={{ height: 8, backgroundColor: '#009688' }}></View>
				<View style={{ backgroundColor: COLORS.black }}>
					{settingHeader()}
					{settingBody()}
				</View>
			</ScrollView>
		);
    }

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#009688' }}>
			<View>{setting()}</View>
		</SafeAreaView>
	);
};

export default Setting;
