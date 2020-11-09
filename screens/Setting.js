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

import { COLORS, SIZES, FONTS , icons, images} from '../constants';


const LineDivider = () => {
    return (
        <View style={{ width :100, paddingHorizontal: 18 }}>
            <View style={{ flex: 1, borderLeftColor: COLORS.white, borderLeftWidth: 1 }}></View>
        </View>
    )
}


const Setting = ({navigation}) => {

    const profileData = {
        name: 'Username',
        point: 200,
        dateTG : 10102020,
    }


    const [profile, setProfile] = React.useState(profileData);
    function SettingHeader(profile){
        return (

            <View style={{ backgroundColor : 'blue',alignItems: 'center',justifyContent: 'center',width: '100%',height: '100%'}}>

                <View
                    style={{ 
                        width : 110,
                        height: 110,
                        borderWidth : 1,
                        borderRadius : 100,
                        borderColor: '#009688',
                        color : 'white',
                        backgroundColor: "rgba(169,169,169,0.1)",
                        marginTop: 30,
                    
                    }}>
                    <Image source={logo}
                    style={{ 
                        
                        width: "100%" ,
                        height: "100%", 
                        borderRadius : 100,
                        borderColor: '#009688',
                        }}
                    />

                    
                    
                </View>
                
                <View style={{ padding: 10}}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>{profile.name}</Text>
                </View>
                
                <View >
                    <Text style={{ ...FONTS.h5, color: COLORS.white }}>Ngày tham gia : {profile.dateTG}</Text>
                </View>
            </View>
        
        )
        
    }


    function settingBody(){
        return(
            <View>
                <View style={{flex: 1,height:60,backgroundColor: COLORS.white, justifyContent: 'center'}}>
                    <Text style={{ color: 'red'}}>
                        Test1
                    </Text>
                    
                </View>
                <View >
                    <Hr lineColor = "#fff"/>
                    
                </View>

                
                
            </View>
            
            
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            
            <View style={{ flex: 1,height: '100%', backgroundColor : COLORS.black}}>

                <View style={{ flex: 1}}>
                    {SettingHeader(profile)}
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
