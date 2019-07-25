import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator, createSwitchNavigator} from 'react-navigation';
import {screens} from '../../../../../constants';
import HotPicks from './categories/HotPicks';
import Cinema from './categories/Cinema';
import Attraction from './categories/Attraction';
import Travel from './categories/Travel';
import Shopping from './categories/Shopping';
import Dining from './categories/Dining';
import HealthBeauty from './categories/HealthBeauty';


const CategoriesNavi = createSwitchNavigator({
        [screens.HotPicks]  : { screen: HotPicks},
        [screens.Cinema]  : { screen: Cinema},
        [screens.Attraction]  : { screen: Attraction},
        [screens.Travel]  : { screen: Travel},
        [screens.Shopping]  : { screen: Shopping},
        [screens.Dining]  : { screen: Dining},
        [screens.HealthBeauty]  : { screen: HealthBeauty},
    },{
        initialRouteName: screens.HotPicks,
        initialRouteKey: screens.HotPicks + 'Key',
        backBehavior:'history',
        defaultNavigationOptions: {
            gesturesEnabled: true,
        },
        cardShadowEnabled: false,
    }
);

class CategoriesMng extends React.Component<Props> {
    static router = CategoriesNavi.router;

    constructor(props) {
        super(props);
        console.log('________ PAGES MNG : ' + JSON.stringify(props));
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={{flex:1}}>
                <CategoriesNavi navigation={navigation}/>
            </View>
        );
    }
}

export default CategoriesMng;
