import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator, createSwitchNavigator} from 'react-navigation';
import {screens} from '../../../../../constants';
import Home from './categories/HomeCategories';
import Cinema from './categories/Cinema';
import Attraction from './categories/Attraction';
import Travel from './categories/Travel';
import Shopping from './categories/Shopping';
import Dining from './categories/Dining';
import HealthBeauty from './categories/HealthBeauty';
import {colors} from "../../../../../styles";
import {OverlayLoader} from "../../../../../components";


const CategoriesNavi = createStackNavigator({
        [screens.HotPicks]  : { screen: Home},
        [screens.Cinema]  : { screen: Cinema},
        [screens.Attraction]  : { screen: Attraction},
        [screens.Travel]  : { screen: Travel},
        [screens.Shopping]  : { screen: Shopping},
        [screens.Dining]  : { screen: Dining},
        [screens.HealthBeauty]  : { screen: HealthBeauty},
    },{
        initialRouteName: screens.HotPicks,
        initialRouteKey: screens.HotPicks + 'Key',
        headerMode: 'none',
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
        console.log('________ CATEG MNG : ' + JSON.stringify(props));
    }

    render() {
        const { navigation } = this.props;
        const isLoading = (this.props.curCategory === '' || this.props.data[this.props.curCategory] === null);

        return (
            <View style={{flex:1, backgroundColor: colors.bgCategory}}>
                <CategoriesNavi navigation={navigation}/>
                <OverlayLoader visible={isLoading} message="Loading..." />
            </View>
        );
    }
}

export default CategoriesMng;
