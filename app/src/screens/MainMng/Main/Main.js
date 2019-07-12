import React from 'react';
import {View} from "react-native";
import MenuBottom from "./Menu";
import Map from "./Map";
import PagesMng from "./PagesMng";

class Main extends React.Component<Props> {
    state = {

    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <PagesMng/>
                <Map/>
                <MenuBottom />
            </View>
        );
    }
}

export default Main;
