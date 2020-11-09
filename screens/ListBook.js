import React from 'react'
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

    const Books = [
        {
            id: 1,
            bookName: "Dị Thế triệu hoán văn thần mãnh tướng",
            bookCover: images.dtthvtmt,
            rating: 4.5,
            language: "Việt Nam",
            pageNo: 341,
            author: "Tửu Trì Túy",
            genre: [
                "Tiên Hiệp"
            ],
            readed: "12k",
            description: "Jude never thought she’d be leaving her beloved older brother and father behind, all the way across the ocean in Syria. But when things in her hometown start becoming volatile, Jude and her mother are sent to live in Cincinnati with relatives. At first, everything in America seems too fast and too loud. The American movies that Jude has always loved haven’t quite prepared her for starting school in the US—and her new label of 'Middle Eastern,' an identity she’s never known before. But this life also brings unexpected surprises—there are new friends, a whole new family, and a school musical that Jude might just try out for. Maybe America, too, is a place where Jude can be seen as she really is.",
            backgroundColor: "rgba(240,240,232,0.9)",
            navTintColor: "#000"
        },
        {
            id: 2,
            bookName: "Hắc Tây du",
            bookCover: images.hactaydu,
            rating: 4.1,
            language: "Eng",
            pageNo: 272,
            author: "Seith Fried",
            genre: [
                "Tiên Hiệp", "Kiếm Hiệp"
            ],
            readed: "13k",
            description: "In Metropolis, the gleaming city of tomorrow, the dream of the great American city has been achieved. But all that is about to change, unless a neurotic, rule-following bureaucrat and an irreverent, freewheeling artificial intelligence can save the city from a mysterious terrorist plot that threatens its very existence. Henry Thompson has dedicated his life to improving America's infrastructure as a proud employee of the United States Municipal Survey. So when the agency comes under attack, he dutifully accepts his unexpected mission to visit Metropolis looking for answers. But his plans to investigate quietly, quickly, and carefully are interrupted by his new partner: a day-drinking know-it-all named OWEN, who also turns out to be the projected embodiment of the agency's supercomputer. Soon, Henry and OWEN are fighting to save not only their own lives and those of the city's millions of inhabitants, but also the soul of Metropolis. The Municipalists is a thrilling, funny, and touching adventure story, a tour-de-force of imagination that trenchantly explores our relationships to the cities around us and the technologies guiding us into the future.",
            backgroundColor: "rgba(247,239,219,0.9)",
            navTintColor: "#000"
        },
        {
            id: 3,
            bookName: "Hiệp khách hành",
            bookCover: images.hiepkhachhanh,
            rating: 3.5,
            language: "Eng",
            pageNo: 110,
            author: "Ana C Bouvier",
            genre: 
            [
                "Kiếm Hiệp", "Tiên Hiệp", "Ngôn Tình"
            ],
            readed: "13k",
            description: "This sketchbook for kids is the perfect tool to improve your drawing skills! Designed to encourage kids around the world to express their uniqueness through drawing, sketching or doodling, this sketch book is filled with 110 high quality blank pages for creations. Add some fun markers, crayons, and art supplies and you have the perfect, easy gift for kids!",
            backgroundColor: "rgba(119,77,143,0.9)",
            navTintColor: "#FFF"
        }
    ]

    React.useEffect(() => {
        let { categoriesBookData } = route.params;
    },[])
    
    function categoriesName(){
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
                    <Text style={{ ...FONTS.h2, color: 'white', paddingRight:10}}>dfsjdf</Text>
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
                            book: item
                        })}
                    >
                        {/* Book Cover */}
                        <Image
                            source={item.bookCover}
                            resizeMode="cover"
                            style={{ width: 100, height: 150, borderRadius: 10 }}
                        />

                        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                            {/* Book name and author */}
                            <View>
                                <Text style={{ paddingRight: SIZES.padding, ...FONTS.h2, color: COLORS.white }}>{item.bookName}</Text>
                                <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>{item.author}</Text>
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
                                <Text style={{ ...FONTS.body4, color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>{item.pageNo}</Text>

                                <Image
                                    source={icons.read_icon}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.lightGray
                                    }}
                                />
                                <Text style={{ ...FONTS.body4, color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>{item.readed}</Text>
                            </View>

                            {/* Genre */}
                            <View style={{ flexDirection: 'row', marginTop: SIZES.base }}>
                                {
                                    item.genre.includes("Adventure") &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkGreen, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.lightGreen }}>Adventure</Text>
                                    </View>
                                }
                                {
                                    item.genre.includes("Ngôn Tình") &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkRed, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.lightRed }}>Ngôn Tình</Text>
                                    </View>
                                }
                                {
                                    item.genre.includes("Kiếm Hiệp") &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkBlue, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.lightBlue }}>Kiếm Hiệp</Text>
                                    </View>
                                }
                                {
                                    item.genre.includes("Tiên Hiệp") &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkGreen, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.lightGreen }}>Tiên Hiệp</Text>
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
                    data={Books}
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
                    // onChangeText={(text) => searchFilterFunction(text)}
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
                    {categoriesName()}
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
