import React from 'react';
import {Text, View} from 'react-native';
import ButtonOrange from '../../components/ButtonOrange';
import {Auth, logOut} from '../../api/Auth';
import s from './style';
import Drawer from "./Drawer";
import Main from "./Main";
import Search from "./Search";

class MainMng extends React.Component{
    state = {

    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={s.container}>
                <Drawer/>
                <Main/>
                <Search/>
            </View>
        );
    }
}

export default MainMng;
