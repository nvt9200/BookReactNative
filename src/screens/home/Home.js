import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
import global from '../../constants/global';
import { COLORS, SIZES, FONTS, icons } from '../../constants';

const LineDivider = () => {
	return (
		<View style={{ width: 1, paddingVertical: 12 }}>
			<View style={{ flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1 }}></View>
		</View>
	);
};

const Home = ({ navigation }) => {
	const [featureBooks, setFeatureBooks] = useState([]);
	const [latestBooks, setLatestBooks] = useState([]);
	const [popularBooks, setPopularBooks] = useState([]);

	const axios = require('axios');

	useEffect(() => {
		var link1 = 'http://myebookapp.000webhostapp.com//api.php?home';

		axios
			.get(link1)
			.then(function (response) {
				setFeatureBooks(response.data.EBOOK_APP.featured_books);
				setLatestBooks(response.data.EBOOK_APP.latest_books);
				setPopularBooks(response.data.EBOOK_APP.popular_books);
			})
			.catch(function (err) {
				console.log(err);
			});
	}, []);

	function renderHeader() {
		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					paddingHorizontal: SIZES.padding,
					alignItems: 'center',
					backgroundColor: '#24202d',
					borderBottomLeftRadius: 20,
					borderBottomRightRadius: 20,
				}}
			>
				{/* Points */}
				<TouchableOpacity
					style={{
						backgroundColor: '#fff',
						width: 60,
						height: 60,
						marginLeft: 10,
						borderRadius: 40,
						marginRight: 20,
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
							flex: 1,
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

	function RenderFeatureBook({ item }) {
		return (
			<TouchableOpacity
				style={{
					flex: 1,

					marginRight: 20,
				}}
				onPress={() => {
					navigation.navigate('BookDetail', {
						books: item.item,
					});
				}}
			>
				{/* Book Cover */}
				<Image
					source={{
						uri:
							'http://myebookapp.000webhostapp.com/images/book_images/book_cover_img/' +
							item.item.book_cover_img,
					}}
					resizeMode="cover"
					style={{
						width: 130,
						height: 200,
						borderRadius: 5,
					}}
				/>
			</TouchableOpacity>
		);
	}

	function RenderPopularBook({ item }) {
		return (
			<TouchableOpacity
				style={{
					flex: 1,

					marginRight: 20,
				}}
				onPress={() => {
					navigation.navigate('BookDetail', {
						books: item.item,
					});
				}}
			>
				{/* Book Cover */}
				<Image
					source={{
						uri:
							'http://myebookapp.000webhostapp.com/images/book_images/book_cover_img/' +
							item.item.book_cover_img,
					}}
					resizeMode="cover"
					style={{
						width: 130,
						height: 200,
						borderRadius: 5,
					}}
				/>
			</TouchableOpacity>
		);
	}

	function RenderLateBook({ item }) {
		return (
			<View style={{ marginVertical: SIZES.base }}>
				<TouchableOpacity
					style={{ flexDirection: 'row', marginRight: 20, marginLeft: 20 }}
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

	const headerList = () => {
		return (
			<View>
				<View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row' }}>
					<Text style={{ ...FONTS.h2, color: COLORS.white, marginTop: 10 }}>Sách nổi bật</Text>
				</View>
				<View style={{ marginTop: 10, marginBottom: 25 }}>
					<FlatList
						data={featureBooks}
						renderItem={(item) => <RenderFeatureBook item={item} />}
						contentContainerStyle={{ paddingLeft: 20 }}
						keyExtractor={(item) => item.id}
						horizontal
						showsHorizontalScrollIndicator={false}
					/>
				</View>
				<View
					style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between' }}
				>
					<Text style={{ ...FONTS.h2, color: COLORS.white }}>Sách phổ biến</Text>
				</View>
				<View style={{ marginTop: 10, marginBottom: 25 }}>
					<FlatList
						data={popularBooks}
						renderItem={(item) => <RenderPopularBook item={item} />}
						contentContainerStyle={{ paddingLeft: 20 }}
						keyExtractor={(item) => item.id}
						horizontal
						showsHorizontalScrollIndicator={false}
					/>
				</View>
				<View style={{ marginTop: 10, marginBottom: 10 }}>
					<Text style={{ ...FONTS.h1, color: COLORS.white, marginLeft: 20 }}>Sách mới nhất</Text>
				</View>
			</View>
		);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
			<View style={{ height: 110 }}>{renderHeader()}</View>

			<FlatList
				ListHeaderComponent={headerList}
				data={latestBooks}
				renderItem={(item) => <RenderLateBook item={item} />}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
};

export default Home;
