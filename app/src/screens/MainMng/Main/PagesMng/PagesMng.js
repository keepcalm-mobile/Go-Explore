import React from 'react';
import NotificationsScreen from './Notifications';
import CalendarScreen from './Calendar';
import CategoriesMng from './CategoriesMng';
import BookmarksScreen from './Bookmarks';
import ArgRealScreen from './ArgReal';
import {createBottomTabNavigator} from 'react-navigation';
import {screens} from '../../../../constants';
import s from './style';


const TabsNavi = createBottomTabNavigator({
        [screens.Notifications]  : { screen: NotificationsScreen},
        [screens.Calendar] : { screen: CalendarScreen},
        [screens.DataPages] : { screen: CategoriesMng},
        [screens.Bookmarks]    : { screen: BookmarksScreen},
        [screens.VirtualReality]  : { screen: ArgRealScreen},
    },{
        initialRouteName: screens.DataPages,
        initialRouteKey: screens.DataPages + 'Key',
        backBehavior:'history',
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
        console.log('MNG PAGES CONSTRUCT : ' + JSON.stringify(props));
    }

    render() {
        const { navigation } = this.props;

        return (
            <TabsNavi navigation={navigation} style={s.container}/>
        );
    }
}

export default PagesMng;
