import React, { useState, useEffect, createRef } from 'react';
import {
	Text,
	View,
	SafeAreaView,
	Image,
	TouchableOpacity,
	ScrollView,
	FlatList,
	Animated,
	TouchableWithoutFeedback,
	Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';

import ViewPager from '@react-native-community/viewpager';
import HTML from 'react-native-render-html';

import { COLORS, SIZES, icons } from '../../constants';
import global from '../../constants/global';

const ChapterDetail = ({ navigation }) => {
	const [scrollViewWholeHeight, setScrollViewWholeHeight] = useState(1);
	const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = useState(0);
	const [fontText, setFontText] = useState('Literata-Regular');
	const [textSize, setTextSize] = useState(18);
	const [textLineHeigh, setTextLineHeight] = useState(30);
	const [chapterBookData, setChapterBookData] = useState([]);
	const [pageFocus, setPageFocus] = useState();

	const indicator = new Animated.Value(0);
	const [isModalFont, setModalFont] = useState(false);
	const [isModalChapter, setModalChapter] = useState(false);

	const screenWidth = Dimensions.get('window').width;
	const screenHeight = Dimensions.get('window').height;
	const axios = require('axios');

	var Book = global.bookId;
	let listViewRef;

	useEffect(() => {
		var link = 'http://myebookapp.000webhostapp.com//api_chapter.php?book_id=' + global.bookId[0].id;

		axios
			.get(link)
			.then(function (response) {
				setChapterBookData(response.data.EBOOK_APP);
				global.bookDetail = response.data.EBOOK_APP;
			})
			.catch(function (err) {
				console.log(err);
			});
	}, []);

	const fontData = [
		{
			id: 1,
			name: 'Literata',
			fontStyle: 'Literata-Regular',
		},
		{
			id: 2,
			name: 'Palatino',
			fontStyle: 'Pala-tino',
		},
		{
			id: 3,
			name: 'Roboto',
			fontStyle: 'Roboto-Black',
		},
		{
			id: 4,
			name: 'ProductSans',
			fontStyle: 'Product-Sans',
		},
		{
			id: 5,
			name: 'Traveling',
			fontStyle: 'Traveling-Typewriter',
		},
		{
			id: 6,
			name: 'ColusRegular',
			fontStyle: 'Colus-Regular',
		},
		{
			id: 7,
			name: 'MuseoSansCyrl',
			fontStyle: 'Museo-Sans',
		},
	];

	const toggleModalFont = () => {
		setModalFont(!isModalFont);
	};

	const toggleModalChapter = () => {
		setModalChapter(!isModalChapter);
	};

	const focusButton = () => {
		listViewRef.scrollToIndex({
			index: pageFocus,
			animated: false,
		});
	};

	function bookName() {
		return (
			<View
				style={{
					flexDirection: 'row',
					width: '100%',
					height: '100%',
					backgroundColor: 'rgba(33, 52, 50,0.95)',
					justifyContent: 'space-between',
					alignItems: 'center',
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
				}}
			>
				<TouchableOpacity
					style={{
						marginLeft: 20,
						width: 35,
						height: 45,
						justifyContent: 'center',
					}}
					onPress={toggleModalChapter}
				>
					<Image
						source={icons.arrow_right}
						resizeMode="contain"
						style={{
							width: 20,
							height: 20,
							tintColor: 'white',
						}}
					/>
				</TouchableOpacity>

				<View style={{ flex: 1 }}>
					<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>{Book[0].book_title}</Text>
				</View>
			</View>
		);
	}

	function chapterData({ item }) {
		return (
			<View style={{ margin: 5, flexDirection: 'row', justifyContent: 'center' }}>
				<TouchableOpacity
					style={{
						width: '100%',
						height: 60,
						backgroundColor: 'white',
						borderRadius: SIZES.radius,
					}}
					// onPress={(setPageFocus(item.chapter_number), { focusButton })}
				>
					<View
						style={{
							flex: 1,
							marginLeft: 10,
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<Text style={{ color: 'black' }}>Chương {item.chapter_number} : </Text>
						<Text style={{ color: 'black' }}>{item.chapter_title}</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}

	function renderHeader() {
		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					backgroundColor: '#444444',
				}}
			>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<TouchableOpacity
						style={{ marginLeft: 5, height: 50, width: 50, alignItems: 'center', justifyContent: 'center' }}
						onPress={() => navigation.navigate('BookDetail')}
					>
						<Image
							source={icons.close}
							resizeMode="contain"
							style={{
								width: 17,
								height: 17,
								tintColor: '#D9D9D9',
							}}
						/>
					</TouchableOpacity>
				</View>

				{/* Greetings */}

				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<TouchableOpacity
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							width: 50,
							height: 50,
						}}
						onPress={toggleModalFont}
					>
						<Image
							source={icons.text_font}
							resizeMode="contain"
							style={{
								width: 25,
								height: 25,
								tintColor: '#D9D9D9',
							}}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							marginTop: 5,
							marginRight: 10,
							justifyContent: 'center',
							alignItems: 'center',
							width: 50,
							height: 50,
						}}
						onPress={toggleModalChapter}
					>
						<Image
							source={icons.menu_icon}
							resizeMode="contain"
							style={{
								width: 20,
								height: 20,
								tintColor: '#D9D9D9',
							}}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	function RenderDetails({ item }) {
		const indicatorSize =
			scrollViewWholeHeight > scrollViewVisibleHeight
				? (scrollViewVisibleHeight * scrollViewVisibleHeight) / scrollViewWholeHeight
				: scrollViewVisibleHeight;

		const difference = scrollViewVisibleHeight > indicatorSize ? scrollViewVisibleHeight - indicatorSize : 1;

		return (
			<View key={item.item.chapter_number} style={{ width: screenWidth }}>
				<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
					{/* Greetings */}
					<View style={{ flex: 1 }}>
						<View style={{ flex: 1, flexDirection: 'row', padding: 15 }}>
							{/* Custom Scrollbar */}
							<View style={{ width: 4, height: '100%' }}>
								<Animated.View
									style={{
										width: 4,
										height: indicatorSize,
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

							<ScrollView nestedScrollEnabled={true}>
								<View
									style={{
										flex: 1,
										height: 140,
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Text
										style={{
											fontSize: 30,
											color: 'white',
											textAlign: 'center',
											lineHeight: textLineHeigh,
											fontFamily: fontText,
										}}
									>
										Chương {item.item.chapter_number} : {item.item.chapter_title}
									</Text>
								</View>

								<HTML
									html={item.item.chapter_content}
									tagsStyles={{
										p: {
											color: 'white',
											lineHeight: textLineHeigh,
											fontFamily: fontText,
											fontSize: textSize,
										},
									}}
								/>
							</ScrollView>
						</View>
						<View
							style={{
								flexDirection: 'row',
								marginTop: 5,
								height: 20,
								backgroundColor: '#fff',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<Text
								style={{
									fontSize: 13,
									fontWeight: 'bold',
									color: '#000',
									textAlign: 'center',
									marginLeft: 20,
								}}
							>
								Chương {item.item.chapter_number} : {item.item.chapter_title}
							</Text>
						</View>
					</View>
				</View>
			</View>
		);
	}

	function FontText({ item }) {
		return (
			<TouchableOpacity
				style={{
					height: 50,
					maxWidth: 180,
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: 10,
					margin: 5,
					backgroundColor: '#444444',
				}}
				onPress={() => setFontText(item.item.fontStyle)}
			>
				<Text
					style={{
						color: '#D9D9D9',
						margin: 15,
						fontSize: 16,
						fontFamily: item.item.fontStyle,
					}}
				>
					{item.item.name}
				</Text>
			</TouchableOpacity>
		);
	}

	function modalFontText() {
		return (
			<View>
				<Modal
					animationIn="slideInUp"
					transparent={true}
					isVisible={isModalFont}
					customBackdrop={
						<TouchableWithoutFeedback onPress={toggleModalFont} style={{ flex: 1, width: '100%' }}>
							<View style={{ flex: 1, width: '100%' }}></View>
						</TouchableWithoutFeedback>
					}
				>
					<View style={{ flex: 1, width: '100%' }}></View>
					<View
						style={{
							backgroundColor: 'rgba(0, 0, 0, 0.9)',
							borderTopLeftRadius: 20,
							borderTopRightRadius: 20,
						}}
					>
						{/* Font text */}
						<View>
							<TouchableOpacity
								style={{
									backgroundColor: '#444444',
									height: 50,
									borderTopLeftRadius: 20,
									borderTopRightRadius: 20,
									justifyContent: 'center',
									alignItems: 'center',
								}}
								onPress={toggleModalFont}
							>
								<View
									style={{
										width: 40,
										height: 5,
										borderRadius: 50,
										marginBottom: 10,
										backgroundColor: 'rgba(255, 255, 255,0.8)',
									}}
								></View>
								<Text
									style={{
										color: '#D9D9D9',
										fontSize: 18,
										fontWeight: 'bold',
									}}
								>
									Cài Đặt
								</Text>
							</TouchableOpacity>
							<Text
								style={{
									color: '#D9D9D9',
									fontSize: 16,
									margin: 5,
								}}
							>
								Font chữ
							</Text>
							<View style={{ marginRight: 10 }}>
								<FlatList
									data={fontData}
									renderItem={(item) => <FontText item={item} />}
									keyExtractor={(item) => item.id.toString()}
									horizontal
									showsHorizontalScrollIndicator={false}
								/>
							</View>
							<View
								style={{
									backgroundColor: '#D9D9D9',
									height: 1,
									margin: 5,
								}}
							></View>
						</View>

						{/* Text size */}
						<View>
							<View
								style={{
									height: 50,
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
									borderRadius: 10,
									margin: 10,
								}}
							>
								<TouchableOpacity
									style={{
										height: 45,
										width: 80,
										justifyContent: 'center',
										alignItems: 'center',
										borderRadius: 10,
										margin: 5,
										backgroundColor: '#444444',
									}}
									onPress={() => {
										if ((textSize <= 25) & (textSize > 15)) {
											setTextSize(textSize - 1);
										}
									}}
								>
									<Text
										style={{
											color: '#D9D9D9',
											fontSize: 22,
										}}
									>
										A-
									</Text>
								</TouchableOpacity>
								<Text
									style={{
										color: '#D9D9D9',
										fontSize: 25,
									}}
								>
									{textSize}
								</Text>
								<TouchableOpacity
									style={{
										height: 45,
										width: 80,
										justifyContent: 'center',
										alignItems: 'center',
										borderRadius: 10,
										margin: 5,
										backgroundColor: '#444444',
									}}
									onPress={() => {
										if ((textSize < 25) & (textSize >= 15)) {
											setTextSize(textSize + 1);
										}
									}}
								>
									<Text
										style={{
											color: '#D9D9D9',
											fontSize: 22,
										}}
									>
										A+
									</Text>
								</TouchableOpacity>
							</View>
							<View
								style={{
									backgroundColor: '#D9D9D9',
									height: 1,
									margin: 5,
								}}
							></View>
						</View>

						{/* line Height */}
						<View>
							<Text
								style={{
									color: '#D9D9D9',
									fontSize: 16,
									margin: 5,
								}}
							>
								Cách dòng
							</Text>
							<View
								style={{
									height: 60,
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
									borderRadius: 10,
									marginBottom: 10,
								}}
							>
								<TouchableOpacity
									style={{
										height: 50,
										width: 50,
										justifyContent: 'center',
										alignItems: 'center',
										borderRadius: 50,
										marginLeft: 30,
										backgroundColor: '#444444',
									}}
									onPress={() => {
										setTextLineHeight(30);
									}}
								>
									<Text
										style={{
											color: '#D9D9D9',
											fontSize: 18,
										}}
									>
										Nhỏ
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										height: 50,
										width: 50,
										justifyContent: 'center',
										alignItems: 'center',
										borderRadius: 50,
										margin: 5,
										backgroundColor: '#444444',
									}}
									onPress={() => {
										setTextLineHeight(40);
									}}
								>
									<Text
										style={{
											color: '#D9D9D9',
											fontSize: 18,
										}}
									>
										Vừa
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										height: 50,
										width: 50,
										justifyContent: 'center',
										alignItems: 'center',
										borderRadius: 50,
										marginRight: 30,
										margin: 5,
										backgroundColor: '#444444',
									}}
									onPress={() => {
										setTextLineHeight(50);
									}}
								>
									<Text
										style={{
											color: '#D9D9D9',
											fontSize: 18,
										}}
									>
										Lớn
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		);
	}

	function modalChapterList() {
		return (
			<Modal
				isVisible={isModalChapter}
				animationIn="slideInRight"
				animationOut="slideOutRight"
				transparent={true}
				customBackdrop={
					<TouchableWithoutFeedback onPress={toggleModalChapter} style={{ flex: 1, width: '100%' }}>
						<View style={{ flex: 1, width: '100%' }}></View>
					</TouchableWithoutFeedback>
				}
			>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<TouchableWithoutFeedback onPress={toggleModalChapter} style={{ flex: 1, width: '100%' }}>
						<View style={{ flex: 0.25, width: '100%' }}></View>
					</TouchableWithoutFeedback>
					<View style={{ flex: 0.75 }}>
						<View style={{ flex: 0.9 / 10, height: 70, width: '100%' }}>{bookName()}</View>
						<View
							style={{
								flex: 6 / 10,
								backgroundColor: 'rgba(0,0,0,0.85)',
								borderBottomEndRadius: 20,
								borderBottomLeftRadius: 20,
							}}
						>
							<View style={{ flex: 1, marginTop: 15, marginBottom: 10 }}>
								<FlatList
									data={chapterBookData}
									renderItem={chapterData}
									keyExtractor={(item) => item.chapter_number.toString()}
									vertical
									showsHorizontalScrollIndicator={false}
								/>
							</View>
							<View
								style={{
									height: 20,
									backgroundColor: 'rgba(33, 52, 50,6)',
									borderBottomEndRadius: 20,
									borderBottomLeftRadius: 20,
								}}
							></View>
						</View>
					</View>
				</View>
			</Modal>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
			<View style={{ height: 60 }}>{renderHeader()}</View>
			<View style={{ flex: 1, width: screenWidth, height: screenHeight }}>
				<FlatList
					data={chapterBookData}
					renderItem={(item) => <RenderDetails item={item} />}
					keyExtractor={(item) => item.chapter_number.toString()}
					horizontal
					pagingEnabled={true}
					showsHorizontalScrollIndicator={false}
					ref={(ref) => {
						listViewRef = ref;
					}}
				/>
			</View>
			{modalChapterList()}
			{modalFontText()}
		</SafeAreaView>
	);
};

export default ChapterDetail;
