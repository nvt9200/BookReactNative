import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, SafeAreaView, ScrollView } from 'react-native';

import { COLORS, SIZES, FONTS, icons, images } from '../../constants';
import global from '../../constants/global';

const BookChapter = ({ navigation }) => {
	const [chapterBookData, setChapterBookData] = useState([]);
	// const {BookChapter} = route.params;
	const axios = require('axios');

	var BookChapter = global.bookId;

	useEffect(() => {
		var link1 = 'http://myebookapp.000webhostapp.com//api_chapter.php?book_id=' + BookChapter[0].id;

		axios
			.get(link1)
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
						{BookChapter[0].book_title}
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
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black, width: '100%', height: '100%' }}>
			<View style={{ backgroundColor: COLORS.black }}>
				<View style={{ height: 70, width: '100%' }}>{bookName()}</View>

				<ScrollView>
					<View style={{ flex: 1, marginTop: SIZES.padding }}>
						<FlatList
							data={chapterBookData}
							renderItem={(item) => <ChapterData item={item} />}
							keyExtractor={(item) => item.chap_id}
							showsHorizontalScrollIndicator={false}
						/>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default BookChapter;
