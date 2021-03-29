import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView, Animated, ToastAndroid, TextInput } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { Modal } from 'react-native';
import global from '../../constants/global';
import HTML from 'react-native-render-html';

import { COLORS, SIZES, FONTS, icons, images } from '../../constants';
import { FlatList } from 'react-native';

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
	const [isModalVisibleRating, setModalVisibleRating] = useState(false);
	const [isModalVisibleComment, setModalVisibleComment] = useState(false);
	const [isModalVisibleRelatedBooks, setModalVisibleRelatedBooks] = useState(false);
	const [valueRating, setValueRating] = useState(5);

	const { books } = route.params;
	const { relateInBooks } = route.params;

	const [bookDetail, setBookDetail] = useState([]);
	const [bookComment, setBookComment] = useState([]);
	const [relatedBooks, setRelatedBooks] = useState([]);
	const [commentText, setCommentText] = useState('');
	const indicator = new Animated.Value(0);

	const axios = require('axios');

	if (relateInBooks == null || relateInBooks == '' || relateInBooks == undefined) {
			
		useEffect(() => {
			var link1 = 'http://myebookapp.000webhostapp.com//api.php?book_id=' + books.id;

			axios
				.get(link1)
				.then(function (response) {
					setBookDetail(response.data.EBOOK_APP);
					setBookComment(response.data.EBOOK_APP[0].user_comments);
					setRelatedBooks(response.data.EBOOK_APP[0].related_books);
				})
				.catch(function (err) {
					console.log(err);
				});
		}, []);
	} else {
		useEffect(() => {
			var link1 = 'http://myebookapp.000webhostapp.com//api.php?book_id=' + relateInBooks.id;

			axios
				.get(link1)
				.then(function (response) {
					setBookDetail(response.data.EBOOK_APP);
					setBookComment(response.data.EBOOK_APP[0].user_comments);
					setRelatedBooks(response.data.EBOOK_APP[0].related_books);
				})
				.catch(function (err) {
					console.log(err);
				});
		}, []);
	}

	global.bookId = bookDetail;

	/* 
	#BFEAB5
	#ADF1DB
	#1C1E24
	#313138
	#FF701F
	*/

	const toggleModalRating = () => {
		setModalVisibleRating(!isModalVisibleRating);
	};
	const toggleModalComment = () => {
		setModalVisibleComment(!isModalVisibleComment);
	};
	const toggleModalRelatedBooks = () => {
		setModalVisibleRelatedBooks(!isModalVisibleRelatedBooks);
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
				ToastAndroid.show(MSG, ToastAndroid.LONG);
			})
			.catch(function (err) {
				console.log(err);
			});
	};

	const functionComment = () => {
		if (commentText == null || commentText == '' || commentText == undefined) {
			ToastAndroid.show('please write a comment!!!', ToastAndroid.LONG);
		} else {
			axios
				.get(
					'http://myebookapp.000webhostapp.com//api_comment.php?book_id=' +
						books.id +
						'&user_name=' +
						global.userInfo.name +
						'&user_image=' +
						global.userInfo.user_image +
						'&comment_text=' +
						commentText
				)
				.then(function (response) {
					var msg = response.data.EBOOK_APP[0].msg;
					ToastAndroid.show(msg, ToastAndroid.LONG);
				})
				.catch(function (err) {
					console.log(err);
				});
		}
	};

	function ItemRelatedBooks({ item }) {
		return (
			<View style={{ marginVertical: SIZES.base, backgroundColor: 'rgba(61, 61, 61,0.6)', borderRadius: 15 }}>
				<TouchableOpacity
					style={{ flexDirection: 'row', margin: 5 }}
					onPress={() =>
						navigation.navigate('BookDetail', {
							relateInBooks: item.item,
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
					style={{ position: 'absolute', top: 5, right: 5, margin: 10 }}
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

	function modalRelatedBooks() {
		return (
			<View>
				<Modal animationType="slide" transparent={true} visible={isModalVisibleRelatedBooks}>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<View
							style={{
								width: '90%',
								height: '75%',
								borderRadius: 15,
								alignItems: 'center',
								backgroundColor: 'rgb(0,0,0)',
							}}
						>
							<View
								style={{
									height: '100%',
									width: '100%',
									flexDirection: 'row',
									borderRadius: 15,
								}}
							>
								<View style={{ flex: 1 }}>
									<TouchableOpacity
										style={{
											flex: 1.5 / 10,
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'center',
											borderTopRightRadius: 15,
											borderTopLeftRadius: 15,
											backgroundColor: 'rgba(61, 61, 61,0.6)',
										}}
										onPress={toggleModalRelatedBooks}
									>
										
										<Text style={{ flex: 1 / 4 }}> </Text>
										<Text
											style={{
												flex: 3 / 4,
												color: '#fff',
												fontWeight: 'bold',
												fontSize: 22,
												textAlign: 'center',
											}}
										>
											Related Books
										</Text>
										<TouchableOpacity
											style={{
												flex: 1 / 4,
												alignItems: 'center',
											}}
											onPress={toggleModalRelatedBooks}
										>
											<Image
												source={icons.close}
												style={{
													height: 20,
													width: 20,
													tintColor: '#fff',
												}}
											></Image>
										</TouchableOpacity>
									</TouchableOpacity>
									<View style={{ flex: 8 / 10, padding: 10 }}>
										<FlatList
											data={relatedBooks}
											renderItem={(item) => <ItemRelatedBooks item={item} />}
											keyExtractor={(item) => item.id}
											showsVerticalScrollIndicator={false}
										/>
									</View>
									<View style={{ flex: 0.5 / 10, backgroundColor: 'rgba(61, 61, 61,0.6)' }}></View>
								</View>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		);
	}

	function UserComment({ item }) {
		return (
			<View
				style={{
					height: 120,
					width: '100%',
					padding: 10,
					marginBottom: 10,
					flexDirection: 'row',
					backgroundColor: 'rgba(61, 61, 61,0.8)',
					borderRadius: 15,
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
				<Image
					source={{
						uri: 'http://myebookapp.000webhostapp.com/images/user_images/' + item.item.user_image,
					}}
					style={{
						width: 60,
						height: 60,
						borderRadius: 50,
						backgroundColor: 'white',
						marginRight: 10,
						borderColor: '#009688',
						borderWidth : 1
					}}
				></Image>
				<View style={{ backgroundColor: '#9e9e9e', width: 1, height: '100%' }}></View>

				<View
					style={{
						flex: 1,
						marginLeft: 10,
					}}
				>
					<View
						style={{
							flex: 2 / 6,
							justifyContent: 'center',
						}}
					>
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>{item.item.user_name}</Text>
					</View>
					<View style={{ backgroundColor: '#9e9e9e', width: '100%', height: 1 }}></View>
					<View
						style={{
							flex: 3 / 6,
						}}
					>
						<Text style={{ fontSize: 16, color: '#fff' }}>{item.item.comment_text}</Text>
					</View>
					<View
						style={{
							flex: 1 / 6,
						}}
					>
						<Text
							style={{
								fontSize: 14,
								color: '#cccccc',
								textAlign: 'right',
								justifyContent: 'center',
								marginRight: 10,
							}}
						>
							{item.item.dt_rate}
						</Text>
					</View>
				</View>
			</View>
		);
	}

	function modalComment() {
		return (
			<View>
				<Modal animationType="slide" transparent={true} visible={isModalVisibleComment}>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<View
							style={{
								width: '90%',
								height: '75%',
								backgroundColor: 'rgb(0,0,0)',
								borderRadius: 15,
								alignItems: 'center',
							}}
						>
							<View
								style={{
									height: '100%',
									width: '100%',
									flexDirection: 'row',
									borderRadius: 15,
								}}
							>
								<View style={{ flex: 1 }}>
									<View
										style={{
											flex: 1 / 8,
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'center',
											borderTopRightRadius: 15,
											borderTopLeftRadius: 15,
											backgroundColor: 'rgba(61, 61, 61,0.6)',
										}}
									>
										<Text style={{ flex: 1 / 4 }}> </Text>
										<Text
											style={{
												flex: 2 / 4,
												color: '#fff',
												fontWeight: 'bold',
												fontSize: 22,
												textAlign: 'center',
											}}
										>
											Comments
										</Text>
										<TouchableOpacity
											style={{
												flex: 1 / 4,
												alignItems: 'center',
											}}
											onPress={toggleModalComment}
										>
											<Image
												source={icons.close}
												style={{
													height: 20,
													width: 20,
													tintColor: '#fff',
												}}
											></Image>
										</TouchableOpacity>
									</View>
									<View style={{ flex: 6 / 8, padding: 10 }}>
										<FlatList
											data={bookComment}
											renderItem={(item) => <UserComment item={item} />}
											keyExtractor={(item) => item.id}
											showsVerticalScrollIndicator={false}
										/>
									</View>
									<View
										style={{
											flex: 1 / 8,
											flexDirection: 'row',
											alignItems: 'center',
											backgroundColor: 'rgba(61, 61, 61,0.6)',
											borderBottomRightRadius: 15,
											borderBottomLeftRadius: 15,
										}}
									>
										<TextInput
											style={{
												width: '80%',
												height: 40,
												backgroundColor: '#CFD9E0',
												borderRadius: 50,
												padding: 10,
												margin: 10,
												fontSize: 16,
											}}
											placeholder="Leave a comment"
											onChangeText={(text) => setCommentText(text)}
											value={commentText}
										></TextInput>
										<TouchableOpacity onPress={functionComment}>
											<Image
												source={icons.send}
												style={{
													height: 35,
													width: 35,
													tintColor: '#fff',
												}}
											></Image>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		);
	}

	const Rating = () => {
		return (
			<View>
				<Modal
					animationType="slide"
					transparent={true}
					visible={isModalVisibleRating}
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
								backgroundColor: 'rgba(0, 0, 0, 0.9)',
								borderRadius: 15,
								padding: 35,
								alignItems: 'center',
								// shadowColor: '#000',
								// shadowOffset: {
								// 	width: 0,
								// 	height: 2,
								// },
								// shadowOpacity: 0.25,
								// shadowRadius: 4,
								// elevation: 5,
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
									onPress={toggleModalRating}
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
										toggleModalRating(), functionRating();
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
					<TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={toggleModalRating}>
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
					onPress={toggleModalRelatedBooks}
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
				{modalComment()}
				{modalRelatedBooks()}
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
					onPress={toggleModalComment}
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
