import React from 'react';
import CategoriesMng from "./CategoriesMng";
import {View} from "react-native";

class PagesMng extends React.Component<Props> {
    state = {

    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <CategoriesMng />
            </View>
        );
    }
}

export default PagesMng;
