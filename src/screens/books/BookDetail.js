import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView, Animated, ToastAndroid } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Modal } from 'react-native';
import global from '../../constants/global';
import HTML from 'react-native-render-html';

import { COLORS, SIZES, FONTS, icons, images } from '../../constants';

const LineDivider = () => {
	return (
		<View style={{ width: 1, paddingVertical: 5 }}>
			<View style={{ flex: 1, borderLeftColor: COLORS.lightGray2, borderLeftWidth: 1 }}></View>
		</View>
	);
};

const BookDetail = ({ route, navigation }) => {
	const [scrollViewWholeHeight, setScrollViewWholeHeight] = useState(1);
	const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = useState(0);
	const [isModalVisible, setModalVisible] = useState(false);
	const [valueRating, setValueRating] = useState(5);

	const { books } = route.params;
	const [bookDetail, setBookDetail] = useState([]);
	const indicator = new Animated.Value(0);

	const axios = require('axios');

	useEffect(() => {
		var link1 = 'http://myebookapp.000webhostapp.com//api.php?book_id=' + books.id;

		axios
			.get(link1)
			.then(function (response) {
				setBookDetail(response.data.EBOOK_APP);
			})
			.catch(function (err) {
				console.log(err);
			});
	}, []);

	global.bookId = bookDetail;

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	const functionRating = () => {
		axios
			.get(
				'http://myebookapp.000webhostapp.com//api_rating.php?book_id=' +
					books.id +
					'&user_id=' +
					global.userInfo.user_id +
					'&rate=' +
					valueRating
			)
			.then(function (response) {
				var MSG = response.data.EBOOK_APP[0].MSG;
				console.log(MSG);
				ToastAndroid.show(MSG, ToastAndroid.LONG);
			})
			.catch(function (err) {
				console.log(err);
			});
	};

	const Rating = () => {
		return (
			<View>
				<Modal
					animationType="slide"
					transparent={true}
					visible={isModalVisible}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}
				>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<View
							style={{
								margin: 20,
								backgroundColor: 'rgba(0,0,0,0.8)',
								borderRadius: 15,
								padding: 35,
								alignItems: 'center',
								shadowColor: '#000',
								shadowOffset: {
									width: 0,
									height: 2,
								},
								shadowOpacity: 0.25,
								shadowRadius: 4,
								elevation: 5,
							}}
						>
							<AirbnbRating
								count={5}
								reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great']}
								defaultRating={5}
								size={30}
								onFinishRating={setValueRating}
							/>
							<View
								style={{
									height: 45,
									width: 250,
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
									marginTop: 30,
								}}
							>
								<TouchableOpacity
									style={{
										flex: 1.5 / 4,
										height: 45,
										backgroundColor: '#7D7E84',
										justifyContent: 'center',
										alignItems: 'center',
										borderRadius: 15,
									}}
									onPress={toggleModal}
								>
									<Text
										style={{
											color: 'white',
											fontSize: 18,
											fontWeight: 'bold',
										}}
									>
										Cancel
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										flex: 1.5 / 4,
										height: 45,
										backgroundColor: '#F96D41',
										justifyContent: 'center',
										alignItems: 'center',
										borderRadius: 15,
									}}
									onPress={() => {
										toggleModal(), functionRating();
									}}
								>
									<Text
										style={{
											color: 'white',
											fontSize: 18,
											fontWeight: 'bold',
										}}
									>
										Ok
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		);
	};

	function renderBookInfoSection() {
		return (
			<View style={{ flex: 1 }}>
				<ImageBackground
					source={{
						uri:
							'http://myebookapp.000webhostapp.com/images/book_images/book_cover_img/' +
							books.book_cover_img,
					}}
					resizeMode="cover"
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
					}}
				/>

				{/* Color Overlay */}
				<View
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
						backgroundColor: 'rgba(240,240,232,0.9)',
					}}
				></View>

				{/* Navigation header */}
				<View
					style={{
						flexDirection: 'row',
						paddingHorizontal: SIZES.radius,
						alignItems: 'center',
						height: 55,
						justifyContent: 'space-between',
					}}
				>
					<TouchableOpacity
						style={{
							width: 40,
							height: 40,
							alignItems: 'center',
							justifyContent: 'center',
							marginLeft: SIZES.base,
						}}
						onPress={() => navigation.goBack()}
					>
						<Image
							source={icons.back_arrow_icon}
							resizeMode="contain"
							style={{
								width: 25,
								height: 25,
								tintColor: '#000',
							}}
						/>
					</TouchableOpacity>

					<View style={{ flex: 1, height: 55, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{ ...FONTS.h2, color: '#000' }}>Book Detail</Text>
					</View>

					<TouchableOpacity onPress={() => console.log('Bookmark')}>
						<Image
							source={icons.bookmark_icon}
							resizeMode="contain"
							style={{
								width: 30,
								height: 30,
								tintColor: '#000',
							}}
						/>
					</TouchableOpacity>
				</View>

				{/* Book Cover */}
				<View style={{ flex: 5, paddingTop: SIZES.padding2, alignItems: 'center' }}>
					<Image
						source={{
							uri:
								'http://myebookapp.000webhostapp.com/images/book_images/book_cover_img/' +
								books.book_cover_img,
						}}
						resizeMode="contain"
						style={{
							flex: 1,
							width: 200,
							height: 'auto',
						}}
					/>
				</View>

				{/* Book Name and Author */}
				<View style={{ flex: 1.8, alignItems: 'center', justifyContent: 'center' }}>
					<Text style={{ ...FONTS.h2, color: '#000' }}>{books.book_title}</Text>
					<Text style={{ ...FONTS.body3, color: '#000' }}>{books.author_name}</Text>
				</View>

				{/* Book Info */}
				<View
					style={{
						flexDirection: 'row',
						paddingVertical: 5,
						margin: SIZES.padding,
						borderRadius: SIZES.radius,
						backgroundColor: 'rgba(0,0,0,0.3)',
					}}
				>
					{/* Rating */}
					<TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={toggleModal}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ ...FONTS.h3, color: COLORS.white }}>{books.rate_avg}</Text>
							<Image
								source={icons.rate}
								style={{
									height: 15,
									width: 15,
									tintColor: '#fff',
									marginLeft: 3,
								}}
							/>
						</View>
						<Text style={{ ...FONTS.body4, color: COLORS.white }}>Rating</Text>
					</TouchableOpacity>
					{Rating()}

					<LineDivider />

					{/* Pages */}
					<View style={{ flex: 1, paddingHorizontal: SIZES.radius, alignItems: 'center' }}>
						<Text style={{ ...FONTS.h3, color: COLORS.white }}>{books.total_rate}</Text>
						<Text style={{ ...FONTS.body4, color: COLORS.white }}>Number rate</Text>
					</View>

					<LineDivider />

					{/* Language */}
					<View style={{ flex: 1, alignItems: 'center' }}>
						<Text style={{ ...FONTS.h3, color: COLORS.white }}>{books.book_views}</Text>
						<Text style={{ ...FONTS.body4, color: COLORS.white }}>View</Text>
					</View>
				</View>
			</View>
		);
	}

	function renderBookDescription() {
		const indicatorSize =
			scrollViewWholeHeight > scrollViewVisibleHeight
				? (scrollViewVisibleHeight * scrollViewVisibleHeight) / scrollViewWholeHeight
				: scrollViewVisibleHeight;

		const difference = scrollViewVisibleHeight > indicatorSize ? scrollViewVisibleHeight - indicatorSize : 1;

		return (
			<View style={{ flex: 1, flexDirection: 'row', padding: SIZES.padding }}>
				{/* Custom Scrollbar */}
				<View style={{ width: 4, height: '100%', backgroundColor: COLORS.gray1 }}>
					<Animated.View
						style={{
							width: 4,
							height: indicatorSize,
							backgroundColor: COLORS.lightGray4,
							transform: [
								{
									translateY: Animated.multiply(
										indicator,
										scrollViewVisibleHeight / scrollViewWholeHeight
									).interpolate({
										inputRange: [0, difference],
										outputRange: [0, difference],
										extrapolate: 'clamp',
									}),
								},
							],
						}}
					/>
				</View>

				{/* Description */}

				<ScrollView
					contentContainerStyle={{ paddingLeft: SIZES.padding2 }}
					showsVerticalScrollIndicator={false}
					scrollEventThrottle={16}
					onContentSizeChange={(width, height) => {
						setScrollViewWholeHeight(height);
					}}
					onLayout={({
						nativeEvent: {
							layout: { x, y, width, height },
						},
					}) => {
						setScrollViewVisibleHeight(height);
					}}
					onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: indicator } } }], {
						useNativeDriver: false,
					})}
				>
					<HTML
						html={books.book_description}
						tagsStyles={{
							p: { color: 'white' },
						}}
					/>
				</ScrollView>
			</View>
		);
	}

	function renderBottomButton() {
		return (
			<View style={{ flex: 1, flexDirection: 'row' }}>
				{/* Bookmark */}
				<TouchableOpacity
					style={{
						width: 60,
						backgroundColor: COLORS.secondary,
						marginLeft: SIZES.padding,
						marginVertical: SIZES.base,
						borderRadius: SIZES.radius,
						alignItems: 'center',
						justifyContent: 'center',
					}}
					onPress={() => console.log('Related')}
				>
					<Image
						source={icons.related}
						resizeMode="contain"
						style={{
							width: 25,
							height: 25,
							tintColor: COLORS.lightGray2,
						}}
					/>
				</TouchableOpacity>

				{/* Start Reading */}
				<TouchableOpacity
					style={{
						flex: 1,
						backgroundColor: COLORS.primary,
						marginHorizontal: SIZES.base,
						marginVertical: SIZES.base,
						borderRadius: SIZES.radius,
						alignItems: 'center',
						justifyContent: 'center',
					}}
					onPress={() => navigation.navigate('BookChapter')}
				>
					<Text style={{ ...FONTS.h3, color: COLORS.white }}>Start Reading</Text>
				</TouchableOpacity>

				{/* Comments */}
				<TouchableOpacity
					style={{
						width: 60,
						backgroundColor: COLORS.secondary,
						marginRight: SIZES.padding,
						marginVertical: SIZES.base,
						borderRadius: SIZES.radius,
						alignItems: 'center',
						justifyContent: 'center',
					}}
					onPress={() => console.log('Comment')}
				>
					<Image
						source={icons.comment}
						resizeMode="contain"
						style={{
							width: 25,
							height: 25,
							tintColor: COLORS.lightGray2,
						}}
					/>
				</TouchableOpacity>
			</View>
		);
	}

	if (bookDetail) {
		return (
			<View style={{ flex: 1, backgroundColor: COLORS.black }}>
				{/* Book Cover Section */}
				<View style={{ flex: 5 }}>{renderBookInfoSection()}</View>

				{/* Description */}

				<View>
					<Text style={{ ...FONTS.h3, color: COLORS.white }}>Description</Text>
				</View>

				<View style={{ flex: 1.8 }}>{renderBookDescription()}</View>

				{/* Buttons */}
				<View style={{ height: 70, marginBottom: 5 }}>{renderBottomButton()}</View>
			</View>
		);
	} else {
		return <></>;
	}
};

export default BookDetail;
