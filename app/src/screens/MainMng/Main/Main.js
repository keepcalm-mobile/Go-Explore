import React from 'react';
import {Dimensions, Platform, View, Text} from "react-native";
import MenuBottom from "./Menu";
import Map from "./Map";
import PagesMng from "./PagesMng";
import SlidingUpPanel from 'rn-sliding-up-panel';
import {doubleIndent} from "../../../styles";
import LinearGradient from "react-native-linear-gradient";
import {getStatusBarHeight} from "react-native-status-bar-height";


const barH = (Platform.OS === 'android') ? getStatusBarHeight() : 0;
const windowH = Dimensions.get('window').height - barH;

class Main extends React.Component {
    state = {

    };

    constructor(props) {
        super(props);
    }

    _openPanel = () => {
        console.log("OPEN PANEL!! : " + this._panel);
        this._panel.show();
    };

    render() {
        return (
            <View style={{flex:1}}>
                <PagesMng/>
                <Map/>
                <MenuBottom openPanel={this._openPanel}/>
                <SlidingUpPanel ref={c => this._panel = c}>
                    <View style={{flex:1, backgroundColor:'#000000', alignItems: 'center', justifyContent: 'center'}}>
                        {/*<LinearGradient colors={['#00000000', '#000000']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{height:(windowH*.8), width:'100%'}} />*/}
                        <Text>Here is the content inside panel</Text>
                    </View>
                </SlidingUpPanel>
            </View>
        );
    }
}

export default Main;
