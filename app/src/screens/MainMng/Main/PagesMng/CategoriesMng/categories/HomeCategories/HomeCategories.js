import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import s from './style';
import {ButtonOrange, OverlayLoader} from '../../../../../../../components';
import {Auth, logOut} from '../../../../../../../api/Auth';
import Header from '../../../../../../../components/Header';
import CarouselBig from '../../../../../../../components/CarouselBig';
import CarouselSmall from '../../../../../../../components/CarouselSmall';
import {screens} from '../../../../../../../constants';
import {scale} from '../../../../../../../utils/resize';
import IconFilter from '../../../../../../../../assets/topIcons/filterIcon.svg';
import {colors} from '../../../../../../../styles';

class HomeCategories extends React.Component<Props> {
    state = {

    };

    constructor(props) {
        super(props);
        console.log('>>>>> TEMPLATE : ' + JSON.stringify(props));
    }

    onHeaderItemClick = () => {
      console.log('HEADER CLICK');
    };

    onFilterBtnClick = () => {

    };

    filterBtn = (iId) => {
        return iId !== screens.HotPicks ? (
            <TouchableOpacity onPress = {this.onFilterBtnClick} activeOpacity={0.5} style={{width: scale(38), height: scale(38), alignItems:'center', justifyContent:'center'}}>
                <IconFilter width={scale(38)} height={scale(38)}/>
            </TouchableOpacity>
        ) : null;
    };

    curTitle = (iId) => {
        const Icon = screens.Categories[iId].icon;

        return (
            <View style={s.titleCnt}>
                <View style={{flexDirection:'row'}}>
                    <Icon width={scale(30)} height={scale(30)}/>
                    <Text style={s.welcome}>{screens.Categories[iId].title}</Text>
                </View>
                {this.filterBtn(iId)}
            </View>
        );
    };

    generateContent = (iData) => {
        let list = [];
        for (let i = 0; i < iData.length; i++){
            list.push(iData[i].type === 'big'
                ? <CarouselBig onItemClick={this.onHeaderItemClick} items={iData[i].data} title={iData[i].title}/>
                : <CarouselSmall onItemClick={this.onHeaderItemClick} items={iData[i].data} title={iData[i].title}/>);
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
                <Header onItemClick={this.onHeaderItemClick} items={header} />
                {this.curTitle(curCategory)}
                {this.generateContent(data)}
            </ScrollView>
        );
    }
}

export default HomeCategories;
