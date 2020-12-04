import React, { useState, useEffect } from 'react'
import { 
    Text, 
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    FlatList,
    Animated

} from 'react-native'


import { COLORS, SIZES, FONTS , icons, images} from '../constants';

const LineDivider = () => {
    return (
        <View style={{ width: 1, paddingVertical: 2 }}>
            <View style={{ flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1 }}></View>
        </View>
    )
}


const ListBook = ({ route, navigation}) => {
    const [books, setBooks] = useState([]);
    const {categoryData} = route.params;
    const axios = require('axios');

    useEffect(() => {
        var link = 'http://myebookapp.000webhostapp.com//api.php?cat_id=' + categoryData.cid;
        
        axios.get(link)
            .then(function (response) {
                setBooks(response.data.EBOOK_APP);
                console.log(response);
            })
            .catch(function (err) {
                console.log(err);
            })
    },[]);
    
    

    function categoriesName(categoryData){

            return (
                <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: SIZES.padding, alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ marginLeft: SIZES.base }}
                        onPress={() => navigation.goBack()}
                    >
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
                    <View style={{ flex: 1.8, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ ...FONTS.h2, color: 'white', paddingRight:10}}>{categoryData.category_name}</Text>
                    </View>
                </View>
            )

    }

    

    function renderCategoryData() {

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
                                    source={icons.page_filled_icon}
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
                    data={books}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }


    function searchButton(){
        return (

            <TextInput
                style={{
                    
                    height: 50,
                    borderWidth: 1,
                    borderRadius : 30,
                    paddingLeft: 20,
                    fontSize : 15,
                    margin: 15,
                    alignItems : 'center',
                    borderColor: '#009688',
                    color : 'white',
                    backgroundColor: "rgba(169,169,169,0.1)",
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 30,
                }}
                    onChangeText={(text) => searchFilterFunction(text)}
                    // value={search}
                    underlineColorAndroid="transparent"
                    placeholder="Search Here..."
                    placeholderTextColor='rgb(255, 255, 255)' >
            </TextInput>
                
        )
    }


    

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>

            <View style={{ height: 70, paddingTop: 30 }}>
                    {categoriesName(categoryData)}
            </View>

            <View>
                    {searchButton()}
            </View>

            <ScrollView style={{backgroundColor: COLORS.blue}}>

                
                <View >
                    {renderCategoryData()}
                    
                </View>
            </ScrollView>
            
        </SafeAreaView>
    )

}

export default ListBook;
