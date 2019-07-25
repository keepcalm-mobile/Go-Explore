import IconNotifGray from '../../assets/bottomIcons/iconNotifGray.svg';
import IconNotifColor from '../../assets/bottomIcons/iconNotifColor.svg';
import IconCalendarGray from '../../assets/bottomIcons/iconCalendarGray.svg';
import IconCalendarColor from '../../assets/bottomIcons/iconCalendarColor.svg';
import IconMainGray from '../../assets/bottomIcons/iconMainGray.svg';
import IconMainColor from '../../assets/bottomIcons/iconMainColor.svg';
import IconBookmarkGray from '../../assets/bottomIcons/iconBookmarkGray.svg';
import IconBookmarkColor from '../../assets/bottomIcons/iconBookmarkColor.svg';
import IconArGray from '../../assets/bottomIcons/iconArGray.svg';
import IconArColor from '../../assets/bottomIcons/iconArColor.svg';

import IconHotPicks from '../../assets/categoriesIcons/iconHotPicks.svg';
import IconCinema from '../../assets/categoriesIcons/iconCinema.svg';
import IconAttractions from '../../assets/categoriesIcons/iconAttractions.svg';
import IconTravel from '../../assets/categoriesIcons/iconTravel.svg';
import IconShopping from '../../assets/categoriesIcons/iconShopping.svg';
import IconDining from '../../assets/categoriesIcons/iconDining.svg';
import IconHealthBeauty from '../../assets/categoriesIcons/iconHealth.svg';

import IconSettings from '../../assets/topIcons/settingsIcon.svg';

export default class {
    static InitialSetup = 'InitialSetup';
    static AuthMng = 'AuthMng';
        static LoginTab = 'LoginTab';
        static SignUpTab = 'SignUpTab';
        static ForgotTab = 'ForgotTab';
        static OtpTab = 'OtpTab';
        static TermsTab = 'TermsTab';
    static App = 'App';
        static Notifications = 'Notifications';
        static Calendar = 'Calendar';
        static Bookmarks = 'Bookmarks';
        static VirtualReality = 'VirtualReality';
        static UserProfile = 'UserProfile';
        static Settings = 'Settings';
        static DataPages = 'DataPages';
            static HotPicks = 'HotPicks';
            static Cinema = 'Cinema';
            static Attraction = 'Attraction';
            static Travel = 'Travel';
            static Shopping = 'Shopping';
            static Dining = 'Dining';
            static HealthBeauty = 'HealthBeauty';

    static SubMenu = 'SubMenu';

    static AppPages = {
        [this.Notifications]:{iconG:IconNotifGray, iconC:IconNotifColor},
        [this.Calendar]:{iconG:IconCalendarGray, iconC:IconCalendarColor},
        [this.DataPages]:{iconG:IconMainGray, iconC:IconMainColor},
        [this.Bookmarks]:{iconG:IconBookmarkGray, iconC:IconBookmarkColor},
        [this.VirtualReality]:{iconG:IconArGray, iconC:IconArColor},
    };

    static Categories = {
        [this.HotPicks]:{icon:IconHotPicks, title:'Hot Picks'},
        [this.Cinema]:{icon:IconCinema, title:'Cinema'},
        [this.Attraction]:{icon:IconAttractions, title:'Attractions'},
        [this.Travel]:{icon:IconTravel, title:'Travel'},
        [this.Shopping]:{icon:IconShopping, title:'Shopping'},
        [this.Dining]:{icon:IconDining, title:'Dining'},
        [this.HealthBeauty]:{icon:IconHealthBeauty, title:'Health & Beauty'},// & Beauty
    };

    static Drawer = {
        [this.DataPages]:{title:'Home'},
        [this.UserProfile]:{title:'My Profile'},
        [this.Notifications]:{title:'Notifications'},
        [this.Calendar]:{title:'Plans'},
        [this.VirtualReality]:{title:'AR'},
        [this.Bookmarks]:{title:'Bookmarks'},
        [this.SubMenu]:{title:'Categories'},
        [this.Settings]:{icon:IconSettings, title:'Settings'},
    };
}
