import React from 'react';
import {Animated, Easing, View} from 'react-native';
import NotificationsScreen from './Notifications';
import CalendarScreen from './Calendar';
import CategoriesMng from './CategoriesMng';
import BookmarksScreen from './Bookmarks';
import ArgRealScreen from './ArgReal';
import {createBottomTabNavigator} from 'react-navigation';
import {screens} from '../../../../constants';


const TabsNavi = createBottomTabNavigator({
        [screens.Notifications]  : { screen: NotificationsScreen},
        [screens.Calendar] : { screen: CalendarScreen},
        [screens.DataPages] : { screen: CategoriesMng},
        [screens.Bookmarks]    : { screen: BookmarksScreen},
        [screens.VirtualReality]  : { screen: ArgRealScreen},
    },{
        initialRouteName: screens.DataPages,
        initialRouteKey: screens.DataPages + 'Key',
    // transparentCard: true,
    defaultNavigationOptions: {
        gesturesEnabled: true,
        tabBarVisible: false,
    },
    cardShadowEnabled: false,
    }
);



class PagesMng extends React.Component<Props> {
    static router = TabsNavi.router;

    constructor(props) {
        super(props);
        console.log('________ PAGES MNG : ' + JSON.stringify(props));
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={{flex:1}}>
                <TabsNavi navigation={navigation}/>
            </View>
        );
    }
}

export default PagesMng;
