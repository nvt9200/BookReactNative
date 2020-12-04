import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    SafeAreaView,
    FlatList,
    ScrollView,
} from 'react-native';
import global from '../constants/global';
import { COLORS, SIZES, FONTS, icons, images } from '../constants';

const LineDivider = () => {
    return (
        <View style={{ width: 1, paddingVertical: 18 }}>
            <View style={{ flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1 }}></View>
        </View>
    )
}

const Home = ({ navigation }) => {
    const [featureBooks, setFeatureBooks] = useState([]);
    const [latestBooks, setLatestBooks] = useState([]);
    const [PopularBook, setPopularBook] = useState([]);
    
    const axios = require('axios');

    useEffect(() => {
        
        var link1 = 'http://myebookapp.000webhostapp.com//api.php?home';
        
        axios.get(link1)
            .then(function (response) {
                setFeatureBooks(response.data.EBOOK_APP.featured_books);
                setLatestBooks(response.data.EBOOK_APP.latest_books);
                setPopularBook(response.data.EBOOK_APP.popular_books);
            })
            .catch(function (err) {
                console.log(err);
            })
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
                        paddingLeft: 3,
                        paddingRight: SIZES.radius,
                        borderRadius: 40,
                        marginRight : 15,
                    }}
                    onPress={() => { console.log("Point") }}
                >
                        <Image
                        
                            source={{ uri : "http://myebookapp.000webhostapp.com/images/user_images/" + global.userInfo.user_image}}
                            resizeMode="cover"
                            style={{
                                flex: 1,
                                borderRadius: 5
                            }}
                        />                    
                </TouchableOpacity>
                
                <LineDivider />
                
                {/* Greetings */}
                <View style={{ flex: 1 , marginLeft : 15 }}>
                    <View style={{ marginRight: SIZES.padding }}>
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>Hello</Text>
                        <Text style={{ ...FONTS.h2, color: COLORS.white }}>{global.userInfo.name}</Text>
                    </View>
                </View>
            </View>
        )
    }


    function renderFeatureBook(featureBooks) {

        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        marginLeft: index == 0 ? SIZES.padding : 0,
                        marginRight: SIZES.radius
                    }}
                    onPress={() => {navigation.navigate("BookDetail", {
                        books: item
                    });
                }}
                >
                    {/* Book Cover */}
                    <Image
                        source={{ uri : "http://myebookapp.000webhostapp.com/images/book_images/book_cover_img/" + item.book_cover_img}}
                        resizeMode="cover"
                        style={{
                            width: 130,
                            height: 200,
                            borderRadius: 5
                        }}
                    />
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Feature Book</Text>

                </View>

                {/* Books */}
                <View style={{ flex: 1, marginTop: SIZES.padding }}>
                    <FlatList
                        data={featureBooks}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        )
    }


    function renderPopularBook(PopularBook) {

        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        marginLeft: index == 0 ? SIZES.padding : 0,
                        marginRight: SIZES.radius
                    }}
                    onPress={() => {navigation.navigate("BookDetail", {
                        books: item
                    });
                }}
                >
                    {/* Book Cover */}
                    <Image
                        source={{ uri : "http://myebookapp.000webhostapp.com/images/book_images/book_cover_img/" + item.book_cover_img}}
                        resizeMode="cover"
                        style={{
                            width: 130,
                            height: 200,
                            borderRadius: 5
                        }}
                    />
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Popular Book</Text>

                </View>

                {/* Books */}
                <View style={{ flex: 1, marginTop: SIZES.padding }}>
                    <FlatList
                        data={PopularBook}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        )
    }



    function renderLateBook() {

        const renderItem = ({ item }) => {
            return (
                <View style={{ marginVertical: SIZES.base }}>
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row' }}
                        onPress={() => navigation.navigate("BookDetail", {
                            books: item
                        })}
                    >
                        {/* Book Cover */}
                        <Image
                            source={{ uri : "http://myebookapp.000webhostapp.com/images/book_images/book_cover_img/" + item.book_cover_img}}
                            resizeMode="cover"
                            style={{ width: 100, height: 150, borderRadius: 10 }}
                        />

                        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                            {/* Book name and author */}
                            <View>
                                <Text style={{ paddingRight: SIZES.padding, ...FONTS.h2, color: COLORS.white }}>{item.book_title}</Text>
                                <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>{item.author_name}</Text>
                            </View>

                            {/* Book Info */}
                            <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
                                <Image
                                    source={icons.rate}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.lightGray
                                    }}
                                />
                                <Text style={{ ...FONTS.body4, color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>{item.rate_avg}</Text>

                                <Image
                                    source={icons.read_icon}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.lightGray
                                    }}
                                />
                                <Text style={{ ...FONTS.body4, color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>{item.book_views}</Text>
                            </View>

                            {/* Genre */}
                            <View style={{ flexDirection: 'row', marginTop: SIZES.base }}>
                                {
                                    item.category_name &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkGreen, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.lightGreen }}>{item.category_name}</Text>
                                    </View>
                                }

                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Bookmark Button */}
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 5, right: 15 }}
                        onPress={() => console.log("Bookmark")}
                    >
                        <Image
                            source={icons.bookmark_icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.lightGray
                            }}
                        />
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={{ flex: 1, marginTop: SIZES.radius, paddingLeft: SIZES.padding }}>
                <FlatList
                    data={latestBooks}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            {/* Header Section */}
            <View style={{ height: 80, paddingTop: 15 }}>
                {renderHeader()}
            </View>

            <View>
            </View>

            {/* Body Section */}
            <ScrollView style={{ marginTop: SIZES.radius }}>
                {/* Books Section */}
                <View>
                    {renderFeatureBook(featureBooks)}
                </View>
                
                <View>
                    {renderPopularBook(PopularBook)}
                </View>

                {/* Categories Section */}
                <View style={{ marginTop: SIZES.padding }}>
                    <Text style={{ ...FONTS.h1, color: COLORS.white, marginLeft: 20 }}>Latest Book</Text>
                    <View>
                        {renderLateBook()}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;