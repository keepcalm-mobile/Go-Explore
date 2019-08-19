import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import s from './style';
import CinemaFilter from '../categories/Cinema/filter';
import Header from '../../../../../../components/Header';
import CarouselBig from '../../../../../../components/CarouselBig';
import CarouselSmall from '../../../../../../components/CarouselSmall';
import {screens} from '../../../../../../constants';
import {scale} from '../../../../../../utils/resize';
import IconFilter from '../../../../../../../assets/serviceIcons/filterIcon.svg';
import {colors, windowW} from '../../../../../../styles';
import Separator from '../../../../../../../assets/serviceIcons/separator.svg';

class HomeCategories extends React.Component<Props> {
    state = {
        filterIsShow:false,
    };

    constructor(props) {
        super(props);
        console.log('>>>>> TEMPLATE : ' + JSON.stringify(props));

        const catId = props.navigation.state.params.categoryId;

        //if(this.props.data[catId] === null)
        props.setCurCategory(catId);
        this._scrollOffset = 0;
        props.setScrollOffset(this._scrollOffset);
    }

    // componentDidUpdate(prevProps): void {
    //     console.log('!!!!!! COMPONENT DID Update : ' + prevProps.isFocused);
    //     // if (prevProps.isFocused !== this.props.isFocused) {
    //     // }
    // }

    componentDidMount() {
        const { navigation } = this.props;
        console.log('!!!!!! COMPONENT DID MOUNT : ' + navigation);
        this.focusListener = navigation.addListener('didFocus', this.componentDidFocusHandler);
    }

    componentDidFocusHandler = () => {
        this.props.setScrollOffset(this._scrollOffset);
    };

    componentWillUnmount() {
        this.focusListener.remove();
    }

    onScroll = (e) => {
        this._scrollOffset = e.nativeEvent.contentOffset.y;
        this.props.setScrollOffset(this._scrollOffset);
        // console.log(e.nativeEvent.contentOffset.y);
    };



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
            <TouchableOpacity onPress = {this.onFilterBtnClick} activeOpacity={0.5} style={{width: scale(40), height: scale(40), alignItems:'center', justifyContent:'center'}}>
                <IconFilter width={scale(40)} height={scale(40)}/>
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
                list.push(<Separator width={windowW} style={s.separator} key={iId + i.toString() + 'SeparatorKey'}/>);
            }
        }
        return list;
    };


    render() {
        const curCategory = this.props.navigation.state.params.categoryId;

        if (this.props.data[curCategory] === null) {
            return ( <View style={s.containerEmpty} /> );
        }

        const {header, data} = this.props.data[curCategory];
        return (
            <ScrollView contentContainerStyle={s.container} removeClippedSubviews={false} onScroll={this.onScroll} scrollEventThrottle={500}>
                <Header key={curCategory + 'HeaderKey'} onItemClick={this.onHeaderItemClick} items={header} />
                {this.curTitle(curCategory)}
                {this.generateContent(data, curCategory)}
                {this.filterPanel()}
            </ScrollView>
        );
    }
}

export default HomeCategories;
