import React, {forwardRef} from 'react';
import {View} from 'react-native';
import MenuBottom from './Menu';
import Map from './Map';
import PagesMng from './PagesMng';
import {getCurrentRoute} from '../../../utils/navHelper';
import {screens} from '../../../constants';
import SectionsMenu from './SectionsMenu';

// const ThisWillWork = forwardRef((props, ref) => {
//     return <button ref={ref}>Text</button>
// });

class Main extends React.Component {
    constructor(props) {
        super(props);
        console.log('________ NAVI MAIN : ' + JSON.stringify(props));
    }

    componentDidUpdate(prevProps, prevState) {
        const newRouteName = getCurrentRoute(this.props.navigation.state);
        console.log('________ NAVI MAIN NEW ROUTE : ' + newRouteName);
        this._bottom.changeIcon(newRouteName);
    }


    _openTab = (iTabId) => {
        console.log('OPEN TAB!! : ' + iTabId);
        if (iTabId === screens.DataPages){
            this._panel.show();
        } else {
            this.props.navigation.navigate(iTabId);
            this._bottom.changeIcon(iTabId);
        }

        this._map.hide();
    };

    _openSection = (iSectionId) => {
        console.log('OPEN SECTION!! : ' + iSectionId);
        this._panel.hide();
        this.props.navigation.navigate(screens.DataPages);
        this._bottom.changeIcon(screens.DataPages);
    };


    render() {
        const { navigation } = this.props;

        return (
            <View style={{flex:1, overflow: 'hidden'}}>
                <PagesMng navigation={navigation}/>
                <Map ref={c => this._map = c}/>
                <MenuBottom ref={c => this._bottom = c} onButtonPress={this._openTab}/>
                <SectionsMenu ref={c => this._panel = c} onButtonPress={this._openSection}/>
            </View>
        );
    }
}

export default Main;
