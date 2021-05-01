import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	SafeAreaView,
	Image,
	TouchableOpacity,
	ScrollView,
	FlatList,
	Animated,
	Modal,
	TouchableWithoutFeedback,
} from 'react-native';

import { COLORS, SIZES, icons } from '../../constants';
import HTML from 'react-native-render-html';

const ChapterDetail = ({ route, navigation }) => {
	const [scrollViewWholeHeight, setScrollViewWholeHeight] = useState(1);
	const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = useState(0);
	const [fontText, setFontText] = useState('Roboto-Bold');

	const indicator = new Animated.Value(0);
	const { readDetail } = route.params;

	const [prev, setPrev] = useState();
	const [isModalFont, setModalFont] = useState(false);

	const fontData = [
		{
			id: 1,
			name: 'Literata',
		},
		{
			id: 2,
			name: 'Architecture',
		},
		{
			id: 3,
			name: 'Palatino',
		},
		{
			id: 4,
			name: 'Roboto',
		},
		{
			id: 5,
			name: 'ProductSans',
		},
		{
			id: 6,
			name: 'Traveling',
		},
		{
			id: 7,
			name: 'ColusRegular',
		},
		{
			id: 8,
			name: 'MuseoSansCyrl',
		},
	];

	useEffect(() => {
		if (readDetail.chapter_number < 1.1) {
			setPrev(true);
		} else {
			setPrev(false);
		}
	}, []);

	const toggleModalFont = () => {
		setModalFont(!isModalFont);
	};

	function renderHeader() {
		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					paddingHorizontal: SIZES.padding,
					alignItems: 'center',
					backgroundColor: '#444444',
				}}
			>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<TouchableOpacity style={{ marginLeft: 5 }} onPress={() => navigation.navigate('BookDetail')}>
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
					<TouchableOpacity
						style={{ marginLeft: 30, marginTop: 5 }}
						onPress={() => navigation.navigate('ChapterList')}
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

				{/* Greetings */}

				<View>
					<TouchableOpacity style={{ marginRight: 10 }} onPress={toggleModalFont}>
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
				</View>
			</View>
		);
	}

	function renderDetails() {
		const indicatorSize =
			scrollViewWholeHeight > scrollViewVisibleHeight
				? (scrollViewVisibleHeight * scrollViewVisibleHeight) / scrollViewWholeHeight
				: scrollViewVisibleHeight;

		const difference = scrollViewVisibleHeight > indicatorSize ? scrollViewVisibleHeight - indicatorSize : 1;

		const touchShowPrev = (
			<View>
				<TouchableOpacity
					style={{
						width: 80,
						height: 50,
						flexDirection: 'row',
						borderRadius: 10,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#444444',
					}}
					onPress={() => console.log('font text')}
				>
					<Image
						source={icons.arrow_left}
						resizeMode="contain"
						style={{
							width: 20,
							height: 20,
							tintColor: '#D9D9D9',
						}}
					/>
					<Text style={{ color: '#D9D9D9', marginLeft: 10 }}>Prev</Text>
				</TouchableOpacity>
			</View>
		);
		const touchHidePrev = <View></View>;

		const showPrev = prev ? touchHidePrev : touchShowPrev;

		return (
			<View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 5, alignItems: 'center' }}>
				{/* Greetings */}
				<View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
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

					<ScrollView
						showsVerticalScrollIndicator={false}
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
						<View style={{ flex: 1, height: 140, justifyContent: 'center', alignItems: 'center' }}>
							<Text
								style={{
									fontSize: 30,
									fontWeight: 'bold',
									color: 'white',
									textAlign: 'center',
									lineHeight: 35,
								}}
							>
								Chương {readDetail.chapter_number} : {readDetail.chapter_title}
							</Text>
						</View>

						<HTML
							html={readDetail.chapter_content}
							tagsStyles={{
								p: { color: 'white', lineHeight: 20, fontSize: 18 },
							}}
						/>

						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								marginTop: 50,
								marginBottom: 20,
								justifyContent: 'space-between',
							}}
						>
							{showPrev}
							<View>
								<TouchableOpacity
									style={{
										width: 80,
										height: 50,
										flexDirection: 'row',
										borderRadius: 10,
										justifyContent: 'center',
										alignItems: 'center',
										backgroundColor: '#444444',
									}}
									onPress={() => console.log('font text')}
								>
									<Text style={{ color: '#D9D9D9', marginRight: 10 }}>Next</Text>

									<Image
										source={icons.arrow_right}
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
					</ScrollView>
				</View>
			</View>
		);
	}

	function FontText({ item }) {
		return (
			<TouchableOpacity
				style={{
					height: 50,
					width: 100,
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: 10,
					margin: 5,
					backgroundColor: '#444444',
				}}
			>
				<Text
					style={{
						color: '#D9D9D9',
					}}
				>
					{item.item.name}
				</Text>
			</TouchableOpacity>
		);
	}

	function editFontText() {
		return (
			<View>
				<Modal
					animationType="slide"
					transparent={true}
					visible={isModalFont}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}
				>
					<TouchableWithoutFeedback onPress={toggleModalFont} style={{ flex: 1, width: '100%' }}>
						<View style={{ flex: 1, width: '100%' }}></View>
					</TouchableWithoutFeedback>
					<View style={{ marginTop: 10, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
						<FlatList
							data={fontData}
							renderItem={(item) => <FontText item={item} />}
							contentContainerStyle={{ paddingLeft: 10 }}
							keyExtractor={(item) => item.id}
							horizontal
							showsHorizontalScrollIndicator={false}
						/>
					</View>
				</Modal>
			</View>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
			<View style={{ height: 60 }}>{renderHeader()}</View>
			{/* <View style={{ flex: 1 }}>{renderDetails()}</View> */}
			{editFontText()}
		</SafeAreaView>
	);
};

export default ChapterDetail;
