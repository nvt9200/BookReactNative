import React from 'react'
import { 
    Text, 
    View , 
    Image, 
    SafeAreaView,
    ScrollView
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import logo from '../assets/images/logo.jpg'
import Hr from "react-native-hr-component";
import global from '../constants/global';

import { COLORS, SIZES, FONTS , icons, images} from '../constants';


const LineDivider = () => {
    return (
        <View style={{ width :100, paddingHorizontal: 18 }}>
            <View style={{ flex: 1, borderLeftColor: COLORS.white, borderLeftWidth: 1 }}></View>
        </View>
    )
}


const Setting = ({navigation}) => {

    console.log(global.userInfo);

    

    function SettingHeader(){
        return (
            <View style={{ backgroundColor :'#444444',alignItems: 'center',justifyContent: 'center',width: '100%',height: '100%'}}>

                <View
                    style={{ 
                        width : 110,
                        height: 110,
                        borderWidth : 1,
                        borderRadius : 100,
                        borderColor: '#009688',
                        color : 'white',
                        backgroundColor: "'#444444'",
                        marginTop: 30,
                    
                    }}>
                    <Image 
                    source={{uri : "http://myebookapp.000webhostapp.com/images/user_images/" + global.userInfo.user_image}}
                    style={{ 
                        
                        width: "100%" ,
                        height: "100%", 
                        borderRadius : 100,
                        borderColor: '#009688',
                        }}
                    />

                    
                    
                </View>
                
                <View style={{ padding: 10}}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>{global.userInfo.name}</Text>
                </View>
                
                <View >
                    <Text style={{ ...FONTS.h5, color: COLORS.white }}>Ngày tham gia : {global.userInfo.dt_register}</Text>
                    
                </View>
            </View>
        
        )
        
    }


    function settingBody(){
        return(
            <View>
                
                <TouchableOpacity
                    style={{  height : 60, flexDirection : 'row',borderRadius: 10, alignItems: 'center', backgroundColor : '#444444'}}
                    onPress={() => console.log("Build a habit")}
                >
                    <Image
                        source={icons.bell}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            margin : 20,
                            tintColor: '#D9D9D9',
                        }}
                    />
                    <Text style={{ color: 'white',fontSize: 16,}}>
                        Build a habit
                    </Text>
                </TouchableOpacity>
                    
                <View >
                    <Hr lineColor = "#fff"/>
                    
                </View>
                <TouchableOpacity
                    style={{  height : 60, flexDirection : 'row',borderRadius: 10, alignItems: 'center', backgroundColor : '#444444'}}
                    onPress={() => console.log("Developer favors")}
                >
                    <Image
                        source={icons.like}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            margin : 20,
                            tintColor: '#D9D9D9',
                        }}
                    />
                    <Text style={{ color: 'white',fontSize: 16,}}>
                        Developer favors
                    </Text>
                </TouchableOpacity>

                <View >
                    <Hr lineColor = "#fff"/>
                    
                </View>

                <TouchableOpacity
                    style={{  height : 60, flexDirection : 'row',borderRadius: 10, alignItems: 'center', backgroundColor : '#444444'}}
                    onPress={() => console.log("Change language and interface")}
                >
                    <Image
                        source={icons.language}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            margin : 20,
                            tintColor: '#D9D9D9',
                        }}
                    />
                    <Text style={{ color: 'white',fontSize: 16,}}>
                        Change language and interface
                    </Text>
                </TouchableOpacity>

                
                
            </View>
            
            
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            
            <View style={{ flex: 1,height: '100%', backgroundColor : COLORS.black}}>

                <View style={{ flex: 1}}>
                    {SettingHeader()}
                </View>
                <ScrollView style={{ flex: 1,marginTop: SIZES.radius }}>    
                    <View style={{ flex: 1}}>
                        {settingBody()}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
        
        
    )

}

export default Setting;
