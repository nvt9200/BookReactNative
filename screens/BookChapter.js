import React, { useState, useEffect } from 'react'
import { 
    Text, 
    View,
    TouchableOpacity,
    Image,
    FlatList,
    SafeAreaView,
    ScrollView
} from 'react-native'

import { COLORS, SIZES, FONTS , icons, images} from '../constants';
import global from '../constants/global';



const PageNumber = ({route,navigation}) => {
    const [ChapterBookData, setChapterBookData] = useState([]);
    // const {BookChapter} = route.params;
    const axios = require('axios');
    
    var BookChapter = global.bookId;
    
    useEffect(() => {
        
        var link1 = 'http://myebookapp.000webhostapp.com//api_chapter.php?book_id=' + BookChapter[0].id;
        
        axios.get(link1)
            .then(function (response) {
                setChapterBookData(response.data.EBOOK_APP)
            })
            .catch(function (err) {
                console.log(err);
            })
    }, []);

    console.log(ChapterBookData);

    function bookName(){
        return (
            <View style={{ 
                flexDirection: 'row', 
                width : '100%', 
                height : '100%',
                backgroundColor: COLORS.darkGreen,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomEndRadius :20 , borderBottomLeftRadius :20
            }}>
                <TouchableOpacity
                        style={{ marginLeft: 20, }}
                        onPress={() => navigation.goBack()}
                    >
                    <Image
                        source={icons.back_arrow_icon}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: 'white'
                        }}
                    />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ ...FONTS.h2, color: 'white',textAlign: 'center' }}>{BookChapter[0].book_title}</Text>
                </View>
            </View>
        )
    }

    function pageData(){

        const chapterItem = ({ item }) => {
            return (
                <View style={{ flex : 1,flexDirection: 'row', }}>
                    
                    <TouchableOpacity
                        style={{  flex : 1,height : 65,backgroundColor: "white",borderRadius : SIZES.radius,marginLeft :10, marginRight: 10}}
                        onPress={() => navigation.navigate("ChapterDetail", {
                            readDetail : item
                        })}
                    >
                        <View style={{ height: 5, backgroundColor: COLORS.black,}}></View>
                        <View style={{ 
                            flex: 1,
                            marginLeft : 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Text style={{ ...FONTS.h2, color: 'black' }}>Chương {item.chapter_number} : </Text>
                            <Text style={{ ...FONTS.h2, color: 'black' }}>{item.chapter_title}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            
            <FlatList
                data={ChapterBookData}
                renderItem={chapterItem}
                keyExtractor={item => `${item.id}`}
                vertical
                showsHorizontalScrollIndicator={false}
            />
            
        )
    }

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black,width : '100%', height : '100%'}}>
            <View style={{ backgroundColor: COLORS.black }}>
                
                <View style={{ height: 70,width : '100%',}}>
                    {bookName()}
                </View>

                <ScrollView>
                    <View style={{ marginTop: SIZES.padding,marginBottom:70}}>
                        {pageData()}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
        
    )


}

export default PageNumber;