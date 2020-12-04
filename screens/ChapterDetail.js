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
    Animated,

} from 'react-native'

import { COLORS, SIZES, FONTS , icons, images} from '../constants';
import HTML from 'react-native-render-html';

const LineDivider = () => {
    return (
        <View style={{ width: 1, paddingVertical: 2 }}>
            <View style={{ flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1 }}></View>
        </View>
    )
}

const ChapterDetail = ({route , navigation}) => {

    const [scrollViewWholeHeight, setScrollViewWholeHeight] = useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = useState(0);
    const indicator = new Animated.Value(0);
    const {readDetail} = route.params;
    const [prev, setPrev] = useState();
    useEffect(() => {
        if (readDetail.chapter_number < 1.1 ){
            setPrev(true)
        } else {
            setPrev(false)
        }
    }, []);


    function renderHeader() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent:'space-between' ,paddingHorizontal: SIZES.padding, alignItems: 'center' }}>
                <View style={{  flexDirection: 'row',  alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ marginLeft: 5, }}
                        onPress={() => navigation.navigate("BookDetail")}
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
                    <TouchableOpacity
                        style={{ marginLeft: 30 ,marginTop : 5}}
                        onPress={() => navigation.navigate("ChapterList")}
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
                
                    
                <View >

                    <TouchableOpacity
                        style={{ marginRight: 10, }}
                        onPress={() => console.log("font text")}
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
                </View>
               
            </View>
        )
    }

    function renderDetails() {
        const indicatorSize = scrollViewWholeHeight > scrollViewVisibleHeight ? scrollViewVisibleHeight * scrollViewVisibleHeight / scrollViewWholeHeight : scrollViewVisibleHeight

        const difference = scrollViewVisibleHeight > indicatorSize ? scrollViewVisibleHeight - indicatorSize : 1;

        const touchShowPrev = (

            <View >

                <TouchableOpacity
                    style={{ width : 80 , height : 50, flexDirection : 'row',borderRadius: 10,justifyContent: 'center', alignItems: 'center', backgroundColor : '#444444'}}
                    onPress={() => console.log("font text")}
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
                    <Text style={{ color :'#D9D9D9', marginLeft : 10, }}>Prev</Text>
                </TouchableOpacity>
            </View>
        );
        const touchHidePrev = (

            <View >
            </View>
        );

        const showPrev  = prev ? touchHidePrev : touchShowPrev;

        



        return (
            <View style={{ flex: 1, flexDirection: 'row',paddingHorizontal: 5, alignItems: 'center' }}>
                
                {/* Greetings */}
                <View style={{ flex: 1, flexDirection: 'row', padding: 15 }}>
                    {/* Custom Scrollbar */}
                    <View style={{ width: 4, height: '100%' }}>
                        <Animated.View
                            style={{
                                width: 4,
                                height: indicatorSize,
                                transform: [{
                                    translateY: Animated.multiply(indicator, scrollViewVisibleHeight / scrollViewWholeHeight).interpolate({
                                        inputRange: [0, difference],
                                        outputRange: [0, difference],
                                        extrapolate: 'clamp'
                                    })
                                }]
                            }}
                        />
                    </View>

                    {/* Description */}
                    
                    <ScrollView

                        // Style={{backgroundColor: 'pink',
                        // marginHorizontal: 20,}}
                        contentContainerStyle={{ paddingLeft: SIZES.padding2 }}
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={16}
                        onContentSizeChange={(width, height) => {
                            setScrollViewWholeHeight(height)
                        }}
                        onLayout={({ nativeEvent: { layout: { x, y, width, height } } }) => {
                            setScrollViewVisibleHeight(height)
                        }}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: indicator } } }],
                            { useNativeDriver: false }
                        )}
                    >
                        <View style={{ flex: 1,height:140, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize : 30,fontWeight: 'bold',color : 'white', textAlign: 'center', lineHeight: 35}}>Chương {readDetail.chapter_number} : {readDetail.chapter_title}</Text>
                        </View>
                
                        
                        <HTML html={readDetail.chapter_content} 
                            tagsStyles={{
                                p: {  color:'white', lineHeight: 20,fontSize : 18}
                            }
                        } />

                        <View style={{flex : 1,flexDirection: 'row',marginTop : 50,marginBottom : 20,justifyContent : 'space-between'}}>
                            { showPrev }
                            <View >
                                
                                <TouchableOpacity
                                    style={{ width : 80 , height : 50, flexDirection : 'row',borderRadius: 10,justifyContent: 'center', alignItems: 'center', backgroundColor : '#444444'}}
                                    onPress={() => console.log("font text")}
                                >

                                    <Text style={{ color :'#D9D9D9', marginRight : 10, }}>Next</Text>

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
        )
    }

    

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            
            <View style={{ height: 60 , backgroundColor: '#444444' }}>
                {renderHeader()}
            </View>

            <View style={{ flex: 1}}>
                {renderDetails()}
            </View>
            
        </SafeAreaView>
    )

}

export default ChapterDetail;
