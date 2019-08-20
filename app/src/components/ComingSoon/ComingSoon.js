import React from 'react';
import {View, Text} from 'react-native';
import s from './style';
import TextGradient from '../TextGradient';
import {scale} from '../../utils/resize';
import IconSoon from '../../../assets/comingSoon.svg';
import ButtonOrange from '../ButtonOrange';

const ComingSoon = (onPress) => (
    <View style={s.container}>
        <View style={s.topCnt}>
            <IconSoon width={scale(200)} height={scale(200)}/>
            <TextGradient text={'Coming soon...'} style={s.title}/>
            <Text style={s.subTitle}>{'We are working hard above\nthis page.'}</Text>
        </View>
        <ButtonOrange onPress={onPress} title={'BACK'} style={s.button}/>
    </View>
);

export default ComingSoon;
