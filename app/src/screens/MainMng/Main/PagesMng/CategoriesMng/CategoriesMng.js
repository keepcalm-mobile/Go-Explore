import React from 'react';
import {createStackNavigator, createSwitchNavigator} from 'react-navigation';
import {screens} from '../../../../../constants';
import Home from './HomeCategories';
import Cinema from './categories/Cinema';
import Attraction from './categories/Attraction';
import Travel from './categories/Travel';
import Shopping from './categories/Shopping';
import Dining from './categories/Dining';
import HealthBeauty from './categories/HealthBeauty';
import BookTicket from './categories/Cinema/BookTicket';


const CategoriesNavi = createStackNavigator({
        [screens.HotPicks]  : { screen: Home},
        [screens.Cinema]  : { screen: Cinema},
        [screens.Attraction]  : { screen: Attraction},
        [screens.Travel]  : { screen: Travel},
        [screens.Shopping]  : { screen: Shopping},
        [screens.Dining]  : { screen: Dining},
        [screens.HealthBeauty]  : { screen: HealthBeauty},
        [screens.BookTickets]  : { screen: BookTicket},
    },{
        initialRouteName: screens.HotPicks,
        initialRouteKey: screens.DataPages + screens.HotPicks + 'Key',
        initialRouteParams:{categoryId:screens.HotPicks},
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
        console.log('MNG CATEGORIES CONSTRUCT : ' + JSON.stringify(props));
    }

    render() {
        const { navigation } = this.props;

        return (
            <CategoriesNavi navigation={navigation}/>
        );
    }
}

export default CategoriesMng;
