import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, SafeAreaView, ScrollView } from 'react-native';

import { COLORS, SIZES, FONTS, icons, images } from '../../constants';

import ViewPager from '@react-native-community/viewpager';

import global from '../../constants/global';

const ReadBook = ({ navigation }) => {
	const [chapterBookData, setChapterBookData] = useState([]);
	// const {ReadBook} = route.params;
	const axios = require('axios');

	useEffect(() => {
		var link = 'http://myebookapp.000webhostapp.com//api_chapter.php?book_id=' + global.bookId;

		axios
			.get(link)
			.then(function (response) {
				setChapterBookData(response.data.EBOOK_APP);
			})
			.catch(function (err) {
				console.log(err);
			});
	}, []);

	function bookName() {
		return (
			<View
				style={{
					flexDirection: 'row',
					width: '100%',
					height: '100%',
					backgroundColor: COLORS.darkGreen,
					justifyContent: 'center',
					alignItems: 'center',
					borderBottomEndRadius: 20,
					borderBottomLeftRadius: 20,
				}}
			>
				<TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.goBack()}>
					<Image
						source={icons.back_arrow_icon}
						resizeMode="contain"
						style={{
							width: 25,
							height: 25,
							tintColor: 'white',
						}}
					/>
				</TouchableOpacity>

				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Text style={{ ...FONTS.h2, color: 'white', textAlign: 'center' }}>
						{global.bookId[0].book_title}
					</Text>
				</View>
			</View>
		);
	}

	function ChapterData({ item }) {
		return (
			<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
				<TouchableOpacity
					style={{
						width: '95%',
						height: 65,
						backgroundColor: 'white',
						borderRadius: SIZES.radius,
						margin: 5,
					}}
					onPress={() =>
						navigation.navigate('ChapterDetail', {
							readDetail: item.item,
						})
					}
				>
					<View
						style={{
							flex: 1,
							marginLeft: 10,
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<Text style={{ ...FONTS.h2, color: 'black' }}>Chương {item.item.chapter_number} : </Text>
						<Text style={{ ...FONTS.h2, color: 'black' }}>{item.item.chapter_title}</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ViewPager style={{ flex: 1 }} initialPage={0}>
					<View key="1">
						<Text>First page</Text>
					</View>
					<View key="2">
						<Text style={{ color: '#fff' }}>Second page</Text>
					</View>
				</ViewPager>
			</View>
		</SafeAreaView>
	);
};

export default ReadBook;
