import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	SafeAreaView,
	Image,
	TouchableOpacity,
	TextInput,
	ScrollView,
	FlatList,
	RefreshControl,
} from 'react-native';

import { SearchBar } from 'react-native-elements';

import global from '../../constants/global';

import { COLORS, SIZES, FONTS, icons } from '../../constants';

const LineDivider = () => {
	return (
		<View style={{ width: 1, paddingVertical: 2 }}>
			<View style={{ flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1 }}></View>
		</View>
	);
};

const wait = (timeout) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Search = ({ navigation }) => {
	const [search, setSearch] = useState('');
	const [booksData, setBooksData] = useState([]);
	const [filteredBookData, setFilteredBookData] = useState([]);
	const [refreshing, setRefreshing] = React.useState(false);
	const axios = require('axios');

	useEffect(() => {
		var link = 'http://myebookapp.000webhostapp.com//api.php?all_book';
		axios
			.get(link)
			.then(function (response) {
				setFilteredBookData(response.data.EBOOK_APP);
				setBooksData(response.data.EBOOK_APP);
			})
			.catch(function (err) {
				console.log(err);
			});
	}, []);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	function renderHeader() {
		return (
			<View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: SIZES.padding, alignItems: 'center' }}>
				{/* Points */}
				<TouchableOpacity
					style={{
						backgroundColor: 'rgba(255,255,255,0.3)',
						width: 60,
						height: 60,
						paddingRight: 12,
						borderRadius: 40,
						marginRight: 15,
					}}
					onPress={() => {
						navigation.navigate('Profile');
					}}
				>
					<Image
						source={{
							uri: global.userInfo.user_image,
						}}
						resizeMode="cover"
						style={{
							width: 60,
							height: 60,
							borderRadius: 40,
							borderColor: '#009688',
							borderWidth: 1,
						}}
					/>
				</TouchableOpacity>

				<LineDivider />

				{/* Greetings */}
				<View style={{ flex: 1, marginLeft: 15 }}>
					<View style={{ marginRight: SIZES.padding }}>
						<Text style={{ ...FONTS.h3, color: COLORS.white }}>Xin chào</Text>
						<Text style={{ ...FONTS.h2, color: COLORS.white }}>{global.userInfo.name}</Text>
					</View>
				</View>
			</View>
		);
	}

	function searchButton() {
		return (
			<TextInput
				style={{
					height: 50,
					borderWidth: 1,
					borderRadius: 30,
					paddingLeft: 20,
					fontSize: 15,
					margin: 15,
					alignItems: 'center',
					borderColor: '#009688',
					color: 'white',
					backgroundColor: 'rgba(169,169,169,0.1)',
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: 30,
				}}
				onChangeText={(text) => {
					setSearch(text);
					searchFilterFunction(text);
				}}
				onClear={(text) => searchFilterFunction('')}
				placeholder="Type Here..."
				value={search}
				underlineColorAndroid="transparent"
				placeholder="Tìm kiếm ở đây ..."
				placeholderTextColor="rgb(255, 255, 255)"
			></TextInput>
		);
	}

	function searchFilterFunction(text) {
		if (text) {
			const newData = booksData.filter((item) => {
				const itemData = item.book_title ? item.book_title.toUpperCase() : ''.toUpperCase();
				const textData = text.toUpperCase();
				return itemData.indexOf(textData) > -1;
			});
			setFilteredBookData(newData);
			setSearch(text);
		} else {
			setFilteredBookData(booksData);
			setSearch(text);
		}
	}

	function RenderLateBook({ item }) {
		return (
			<View style={{ marginVertical: SIZES.base }}>
				<TouchableOpacity
					style={{ flex: 1, flexDirection: 'row' }}
					onPress={() =>
						navigation.navigate('BookDetail', {
							books: item.item,
						})
					}
				>
					{/* Book Cover */}
					<Image
						source={{
							uri:
								'http://myebookapp.000webhostapp.com/images/book_images/book_cover_img/' +
								item.item.book_cover_img,
						}}
						resizeMode="cover"
						style={{ width: 100, height: 150, borderRadius: 10 }}
					/>

					<View style={{ flex: 1, marginLeft: SIZES.radius }}>
						{/* Book name and author */}
						<View>
							<Text style={{ paddingRight: SIZES.padding, ...FONTS.h2, color: COLORS.white }}>
								{item.item.book_title}
							</Text>
							<Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>{item.item.author_name}</Text>
						</View>

						{/* Book Info */}
						<View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
							<Image
								source={icons.rate}
								resizeMode="contain"
								style={{
									width: 20,
									height: 20,
									tintColor: COLORS.lightGray,
								}}
							/>
							<Text style={{ ...FONTS.body4, color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>
								{item.item.rate_avg}
							</Text>

							<Image
								source={icons.read_icon}
								resizeMode="contain"
								style={{
									width: 20,
									height: 20,
									tintColor: COLORS.lightGray,
								}}
							/>
							<Text style={{ ...FONTS.body4, color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>
								{item.item.book_views}
							</Text>
						</View>

						{/* Genre */}
						<View style={{ flexDirection: 'row', marginTop: SIZES.base }}>
							{item.item.category_name && (
								<View
									style={{
										justifyContent: 'center',
										alignItems: 'center',
										padding: SIZES.base,
										marginRight: SIZES.base,
										backgroundColor: COLORS.darkGreen,
										height: 40,
										borderRadius: SIZES.radius,
									}}
								>
									<Text style={{ ...FONTS.body3, color: COLORS.lightGreen }}>
										{item.item.category_name}
									</Text>
								</View>
							)}
						</View>
					</View>
				</TouchableOpacity>

				{/* Bookmark Button */}
				<TouchableOpacity
					style={{ position: 'absolute', top: 5, right: 15 }}
					onPress={() => console.log('Bookmark')}
				>
					<Image
						source={icons.bookmark_icon}
						resizeMode="contain"
						style={{
							width: 25,
							height: 25,
							tintColor: COLORS.lightGray,
						}}
					/>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
			<View style={{ height: 70, paddingTop: 30 }}>{renderHeader()}</View>

			<View>{searchButton()}</View>

			<View style={{ flex: 1, marginLeft: 10 }}>
				<FlatList
					data={filteredBookData}
					renderItem={(item) => <RenderLateBook item={item} />}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Search;
