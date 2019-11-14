import React from 'react';
import {ScrollView, View} from 'react-native';
import s from './style';
import ScrollablePage from '../../../ScrollablePage';
import {screens} from '../../../../../../../constants';
import ItemHeader from '../../subTabs/ItemHeader';
import {indent, windowW} from '../../../../../../../styles';
import {TabBar, TabView} from 'react-native-tab-view';
import colors from '../../../../../../../styles/colors';
import {CinemaGallery, SimilarItems, StandardOverview} from '../../subTabs';
import Separator from '../../../../../../../../assets/serviceIcons/separator.svg';
import CarouselSmall from '../../../../../../../components/CarouselSmall';

class Event extends ScrollablePage {
    constructor(props) {
        const itemId = props.navigation.state.params.itemId;
        props.getItem(itemId, screens.Event);

        super(props);

        this.state = {
            curId: itemId,
            index: 0,
            routes: [
                {key: 'overview', title: 'OVERVIEW'},
                {key: 'gallery', title: 'GALLERY'},
            ],
        };
    }

    onDirectionPress = () => {
        this.props.setMapTarget(parseFloat(this.props.data.location[0]), parseFloat(this.props.data.location[1]), true);
    };

    onItemClick = (iId, iType = screens.Attraction) => {
        this.props.navigation.navigate({ routeName: iType, params:{itemId:iId}, key:screens.DataPages + iType + iId + 'Key'});
    };

    renderScene = ({ route }) => {
        switch (route.key) {
            case 'overview':
                return <StandardOverview data={this.props.data.overview} onDirectionPress={this.onDirectionPress}/>;
            case 'gallery':
                return <CinemaGallery data={this.props.data.gallery.image} showTitle={false}/>;
            default:
                return null;
        }
    };

    render() {
        if (!this.props.data) {
            return ( <View style={s.containerEmpty} /> );
        }

        const { type, header, related} = this.props.data;

        return (
            <ScrollView contentContainerStyle={s.container} onScroll={this.onScroll}>
                <ItemHeader type={type} data={header} onPress={this.onDirectionPress}/>
                <TabView
                    navigationState={this.state}
                    renderScene={this.renderScene}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: windowW }}
                    renderTabBar = {props =>
                        <TabBar
                            {...props}
                            style={{ backgroundColor: 'transparent' }}
                            labelStyle = {s.tabLabel}
                            indicatorStyle={{ backgroundColor: colors.darkMain, paddingHorizontal:indent}}
                        />
                    }
                />
                <SimilarItems onItemPress={this.onItemClick} data={related} title={'Check other'}/>
            </ScrollView>
        );
    }
}

export default Event;
