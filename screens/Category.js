import React, { useState, useEffect } from 'react'
import { Text,
    View,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Dimensions

} from 'react-native';


import { COLORS, SIZES, FONTS , icons, images} from '../constants';
import global from '../constants/global';


const Category = ({navigation}) => {
    const axios = require('axios')
    const [categories, setCategories] = useState([]);
    const { width } = Dimensions .get("window");

    useEffect(() => {
        axios.get('http://myebookapp.000webhostapp.com//api.php?cat_list')
            .then((res) => {
                setCategories(res.data.EBOOK_APP);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    function CategoryShow() {

        const categoryItem = ({ item }) => {
            return (
                <TouchableOpacity
                    onPress={() => navigation.navigate("ListBook", {
                        categoryData: item
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
                        
                        source={{ uri : "http://myebookapp.000webhostapp.com/images/cat_images/" + item.cat_image}}
                        style={{
                            width: 35,
                            height: 35,
                            padding : 5,
                            marginRight : 8,
                            
                        }}
                    />

                        <View>
                            <Text style={{ ...FONTS.h3, color: COLORS.black }}>{item.category_name}</Text>
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