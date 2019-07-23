import React from 'react';
import {Text, View} from 'react-native';
import s from './style';
import {ButtonOrange} from '../../../../../../../components';
import {Auth, logOut} from '../../../../../../../api/Auth';
import Header from '../../../../../../../components/Header';

const headerArr = [
    {
        id : '0001',
        image : 'https://naxlabel.mobi/img/portfolio/cabin.png',
        title : 'Avengers: Endgame',
        subTitle : 'Action, PG 13, English | 3h 2m',
        rating : 3.5,
        tags : ['PG 13', 'Action', '3 h 2 m'],
        url : 'https://youtu.be/TcMBFSGVi1c',
        type : 'cinema',
    },
    {
        id : '0002',
        image : 'https://naxlabel.mobi/img/portfolio/cake.png',
        title : 'CHI,  The SPA',
        subTitle : 'CHI, The SPA, the only luxury',
        rating : 5.0,
        tags : ['SPA', 'Health', 'Luxury'],
        url : 'https://youtu.be/TcMBFSGVi1c',
        type : 'health',
    },
    {
        id : '0003',
        image : 'https://naxlabel.mobi/img/portfolio/submarine.png',
        title : 'The Lalit Golf & Spa Resort',
        subTitle : '1.1 km from Fatread Beach',
        rating : 1.25,
        tags : ['Resort', 'SPA', 'City Center'],
        url : 'https://youtu.be/TcMBFSGVi1c',
        type : 'cinema',
    },
];

class HotPicks extends React.Component<Props> {
    state = {

    };

    constructor(props) {
        super(props);
    }

    onHeaderItemClick = () => {
      console.log('HEADER CLICK');
    };

    render() {
        return (
            <View style={s.container}>
                <Header onItemClick={this.onHeaderItemClick} items={headerArr} />
                {/*<Text style={s.welcome}>Hot Picks coming soon</Text>*/}
                {/*<ButtonOrange onPress={this._logOut} title={'LOGOUT'}/>*/}
            </View>
        );
    }

    _logOut = async () => {
        const resp = await logOut();
        if (Auth.AUTH_LOGOUT === resp) {
            this.props.navigation.navigate('Auth');
        }
        // await AsyncStorage.clear();
    };
}

export default HotPicks;
