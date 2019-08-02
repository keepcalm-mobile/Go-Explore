import type {Props} from 'react-native/Libraries/Components/View/View';
import {Image, ScrollView, Text, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import s from './style';
import Rating from '../../../../../../../components/Rating';
import {scale} from '../../../../../../../utils/resize';
import Separator from '../../../../../../../../assets/serviceIcons/separator.svg';
import {windowW} from '../../../../../../../styles';
import ButtonBlack from '../../../../../../../components/ButtonBlack';
import {TextInput} from 'react-native-gesture-handler';
import ButtonOrange from '../../../../../../../components/ButtonOrange';

class Comments extends React.Component<Props> {
    static propTypes = {
        data: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            comment:'',
            showAll:false,
        };
    }

    _showAllComments = () => {
        this.setState({showAll:true});
    };

    _commentItem = (iData, iId) => {
        let list = [];
        const length = iData.length > 2 && !this.state.showAll ? 2 : iData.length;

        for (let i = 0; i < length; i++){
            const {user, date, rating, text} = iData[i];
            list.push(
                <View key={iId + i.toString()} style={s.commentItem}>
                    <View style={s.commentItemTop}>
                        <Image resizeMode={'cover'} style={s.commentImage} source={{uri: user.image}} progressiveRenderingEnabled={true}/>
                        <View>
                            <Text style={s.commentName}>{user.name}</Text>
                            <Rating editable={false} max={5} rating={rating} iconWidth={scale(16.5)} iconHeight={scale(16.5)}/>
                        </View>
                        <Text style={s.commentDate}>{date}</Text>
                    </View>
                    <Text style={s.commentText}>{text}</Text>
                </View>
            );
            if (this.state.showAll || i !== length - 1){
                list.push(<Separator width={windowW} style={s.separator} key={iId + i.toString() + 'SeparatorKey'}/>);
            }
        }

        if (iData.length > 2 && !this.state.showAll){
            list.push(<ButtonBlack key={iId} onPress={this._showAllComments} title={'VIEW ALL REVIEWS'} titleStyle={s.blackButtonTitle}/>);
        }
        return list;
    };



    _inputArea = () => {
        return (
            <View style={s.inputArea}>
                <View style={s.commentItemTop}>
                    <Image resizeMode={'cover'} style={s.commentImage} source={{uri: 'https://naxlabel.mobi/img/portfolio/cabin.png'}} progressiveRenderingEnabled={true}/>
                    <View>
                        <Text style={s.commentName}>{'Richard'}</Text>
                        <Rating editable={true} max={5} rating={this.state.rateValue} onRate={(rateValue)=>this.setState({rateValue})} iconWidth={scale(16.5)} iconHeight={scale(16.5)}/>
                    </View>
                </View>
                <View style={s.inputTextCnt} >
                    <TextInput
                        ref={(input) => { this.messageField = input; }}
                        style={s.inputText}
                        placeholder="Write a comment..."
                        placeholderTextColor={'#B7B7B7'}
                        onChangeText={(comment) => this.setState({comment})}
                        multiline={true}
                        numberOfLines={4}
                        maxLength={174}
                        value={this.state.comment}
                    />
                </View>
                <ButtonOrange onPress={this._showAllComments} title={'SUBMIT'} style={{marginHorizontal:0}}/>
            </View>
        );
    };

    render() {
        const {data} = this.props;
        return (
            <View style={s.tabCnt}>
                {/*{iData.map( (item, key) => { return this._commentItem(item, key); })}*/}
                {this._commentItem(data, 'commentItem')}
                {this._inputArea()}
            </View>
        );
    }
}

export default Comments;
