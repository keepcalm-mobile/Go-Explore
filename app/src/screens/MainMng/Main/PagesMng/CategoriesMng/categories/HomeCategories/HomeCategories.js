import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import s from './style';
import {ButtonOrange, OverlayLoader} from '../../../../../../../components';
import {Auth, logOut} from '../../../../../../../api/Auth';
import CinemaFilter from '../Cinema/filter';
import Header from '../../../../../../../components/Header';
import CarouselBig from '../../../../../../../components/CarouselBig';
import CarouselSmall from '../../../../../../../components/CarouselSmall';
import {screens} from '../../../../../../../constants';
import {scale} from '../../../../../../../utils/resize';
import IconFilter from '../../../../../../../../assets/topIcons/filterIcon.svg';
import {colors, windowW} from '../../../../../../../styles';
import Separator from '../../../../../../../../assets/topIcons/separator.svg';

class HomeCategories extends React.Component<Props> {
    state = {
        filterIsShow:false,
    };

    constructor(props) {
        super(props);
        console.log('>>>>> TEMPLATE : ' + JSON.stringify(props));
    }


    /***    HEADER   ***/
    onHeaderItemClick = (iId, iType) => {
        console.log('HEADER CLICK : ' + iType + ' _ id : ' + iId);
        this.props.navigation.navigate({ routeName: iType, params:{id:iId}, key:screens.ForgotTab + 'Key'});
    };


    /***    FILTER   ***/
    onFilterBtnClick = () => {
        this.setState({filterIsShow: !this.state.filterIsShow});
    };

    filterBtn = (iId) => {
        return iId !== screens.HotPicks ? (
            <TouchableOpacity onPress = {this.onFilterBtnClick} activeOpacity={0.5} style={{width: scale(38), height: scale(38), alignItems:'center', justifyContent:'center'}}>
                <IconFilter width={scale(38)} height={scale(38)}/>
            </TouchableOpacity>
        ) : null;
    };

    filterPanel = () => {
        return this.state.filterIsShow ? (
            <CinemaFilter onApplyClick={this.onFilterBtnClick}/>
        ) : null;
    };


    /***    TITLE   ***/
    curTitle = (iId) => {
        const Icon = screens.Categories[iId].icon;

        return (
            <View key={iId + 'TitleKey'} style={s.titleCnt}>
                <View style={{flexDirection:'row'}}>
                    <Icon width={scale(30)} height={scale(30)}/>
                    <Text style={s.welcome}>{screens.Categories[iId].title}</Text>
                </View>
                {this.filterBtn(iId)}
            </View>
        );
    };


    /***    ITEMS   ***/
    onItemClick = (iId, iType) => {
        console.log('ITEM CLICK : ' + iType + ' _ id : ' + JSON.stringify(iId));
        this.props.navigation.navigate({ routeName: iType, params:{id:iId}, key:screens.ForgotTab + 'Key'});
    };

    generateContent = (iData, iId) => {
        let list = [];
        for (let i = 0; i < iData.length; i++){
            list.push(iData[i].type === 'big'
                ? <CarouselBig key={iId + i.toString() + 'BigKey'} onItemClick={this.onItemClick} items={iData[i].data} title={iData[i].title}/>
                : <CarouselSmall key={iId + i.toString() + 'SmallKey'} onItemClick={this.onItemClick} items={iData[i].data} title={iData[i].title}/>);
            if (i !== iData.length - 1){
                list.push(<Separator width={windowW} style={s.separator} key={iId + i.toString() + 'SeparatorKey'}/>)
            };
        }
        return list;
    };

    render() {
        if (this.props.curCategory === '' || this.props.data[this.props.curCategory] === null) {
            return ( <View style={{flex:1, backgroundColor: colors.bgCategory}} /> );
        }

        const curCategory = this.props.curCategory;
        const {header, data} = this.props.data[curCategory];
        return (
            <ScrollView contentContainerStyle={s.container} removeClippedSubviews={false}>
                <Header key={curCategory + 'HeaderKey'} onItemClick={this.onHeaderItemClick} items={header} />
                {this.curTitle(curCategory)}
                {this.generateContent(data, curCategory)}
                {this.filterPanel()}
            </ScrollView>
        );
    }
}

export default HomeCategories;
