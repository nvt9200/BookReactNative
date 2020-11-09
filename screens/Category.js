import React from 'react'
import { Text,
    View,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Dimensions

} from 'react-native'

import { COLORS, SIZES, FONTS , icons, images} from '../constants';


const Category = ({navigation}) => {


    const categoriesBookData = [
        {
            id: 1,
            categorydataName: "Huyền Huyễn",
            categoryIcon : icons.fantasy,
        },
        {
            id: 2,
            categorydataName: "Kiếm Hiệp",
            categoryIcon : icons.sword,
        },
        {
            id: 3,
            categorydataName: "Lịch Sử",
            categoryIcon : icons.history,
        },
        {
            id: 4,
            categorydataName: "Ngôn Tình",
            categoryIcon : icons.affection,
        },
        {
            id: 5,
            categorydataName: "Tiên Hiệp",
            categoryIcon : icons.Dragon,
        },
        {
            id: 6,
            categorydataName: "Dị Giới",
            categoryIcon : icons.moon
        },
        {
            id: 7,
            categorydataName: "Đô Thị",
            categoryIcon : icons.city_icon
        },
        {
            id:8,
            categorydataName: "Huyền Ảo",
            categoryIcon : icons.fanciful
        },
        {
            id: 9,
            categorydataName: "Cổ Đại",
            categoryIcon : icons.antique
        },
        {
            id: 10,
            categorydataName: "Hệ Thống",
            categoryIcon : icons.yin_yang
        },
    ];

    const [categories, setCategories] = React.useState(categoriesBookData);
    const { width } = Dimensions .get("window");
    function CategoryShow() {

        const categoryItem = ({ item }) => {
            return (
                
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ListBook", {
                                categoriesBookData: item
                            })}
                        >
                            <View style={{ 
                                width: (width / 2) - 20,
                                height : 50 ,
                                backgroundColor : COLORS.white, 
                                borderRadius : SIZES.radius,
                                padding: 10,
                                margin:10,
                                flexDirection: 'row',
                                }}>
                            {/* Book Cover */}
                            <Image
                                source={item.categoryIcon}
                                
                                style={{
                                    width: 35,
                                    height: 35,
                                    padding : 5,
                                    marginRight : 8
                                    
                                }}
                            />

                            <View>
                                <Text style={{ ...FONTS.h3, color: COLORS.black }}>{item.categorydataName}</Text>
                            </View>
                            </View>
                        </TouchableOpacity>  
                    


            )
        }

        return (
            
                <FlatList
                    data={categories}
                    showsVerticalScrollIndicator={false}
                    renderItem={categoryItem}
                    keyExtractor={item => `${item.id}`}
                    contentContainerStyle={{ flexDirection: 'column'}}
                    numColumns={2}
                />
            
        )
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            <View style={{  backgroundColor: COLORS.black }}>
                
                <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 80, backgroundColor: COLORS.darkGreen, alignItems: 'center', borderBottomEndRadius :20 , borderBottomLeftRadius :20 }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ ...FONTS.h1 , color: COLORS.white }}>Category</Text>
                    </View>
                </View>

                <ScrollView>
                    <View style={{ marginTop: SIZES.padding,
                        flexDirection: 'row',
                        flexWrap : 'wrap',

                        }}>
                        {CategoryShow()}
                    </View>
                            
                
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Category;