import React from 'react';
import {Text, View} from 'react-native';
import {createSwitchNavigator} from 'react-navigation';
import {screens} from '../../../../../constants';
import HotPicks from './categories/HotPicks';
import Cinema from './categories/Cinema/Cinema';
import Attraction from './categories/Attraction/Attraction';
import Travel from './categories/Travel/Travel';
import Shopping from './categories/Shopping/Shopping';
import Dining from './categories/Dining/Dining';
import HealthBeauty from './categories/HealthBeauty/HealthBeauty';


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
