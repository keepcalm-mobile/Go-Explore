import React from 'react';
import {Dimensions, Platform, Text, View} from "react-native";
import {scale} from "../../../../utils/resize";
import {doubleIndent, indent} from "../../../../styles";
import {getStatusBarHeight} from "react-native-status-bar-height";
import SwipeUpDown from 'react-native-swipe-up-down-fix';
import MapView from 'react-native-maps';

const startY = (Platform.OS === 'android') ? 0 : getStatusBarHeight();
const barH = (Platform.OS === 'android') ? getStatusBarHeight() : 0;
const windowH = Dimensions.get('window').height - barH;
const windowW = Dimensions.get('window').width - doubleIndent;

class Map extends React.Component<Props> {
    state = {

    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SwipeUpDown
                itemMini={<View style={{width:50, height:7, backgroundColor:'#000000', borderRadius:5, alignSelf:'center' , marginTop:-12}}/>}
                itemFull={ <View style={{backgroundColor:'#D0D0D0' }}>
                    <MapView
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                </View>}
                style={{marginLeft:indent, width:windowW}}
                animation="easeInEaseOut"
                swipeHeight={75}
            />
        );
    }
}
//marginTop:windowH - 70, paddingBottom:10, height:'70%',
export default Map;
