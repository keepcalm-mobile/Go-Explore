import {View, TouchableWithoutFeedback, Text} from 'react-native';
import React, {Component} from 'react';
import StarFull from '../../../assets/rating/starFull.svg';
import StarEmpty from '../../../assets/rating/starEmpty.svg';
import s from './style';

class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: this.props.rating ? this.props.rating : 0,
            max: this.props.max ? this.props.max : 5,
            iconWidth: this.props.iconWidth ? this.props.iconWidth : 36,
            iconHeight: this.props.iconHeight ? this.props.iconHeight : 36,
            iconSelected: this.props.iconSelected ? this.props.iconSelected : StarFull,
            iconUnselected: this.props.iconUnselected ? this.props.iconUnselected : StarEmpty,
            editable: this.props.editable != null ? this.props.editable : true,
        };
    }

    _onRate(rating) {
        this.setState({rating});
        if (this.props.onRate) {
            this.props.onRate(rating);
        }
    }

    _star = (iBool) => {
        return iBool ? <this.state.iconSelected/> : <this.state.iconUnselected/>;
    };

    render() {
        let icons = [];
        for (let i = 1; i <= this.state.max; i++) {
            icons.push(
                <TouchableWithoutFeedback
                    disabled={!this.state.editable}
                    key={i}
                    style={{height:this.state.iconHeight,width:this.state.iconWidth}}
                    onPress={()=>this._onRate(i)}
                >
                    {this._star(this.state.rating >= i)}
                </TouchableWithoutFeedback>
            );
        }
        return (
            <View style={[this.props.style,{flexDirection:'row'}]}>
                <Text style={s.ratingValue}>{this.state.rating.toFixed(1).toString()}</Text>
                {icons}
            </View>
        );
    }
}

export default Rating;

// import {StyleSheet, View, TouchableWithoutFeedback, Image, Text, TouchableOpacity} from 'react-native';
// import React, {Component} from 'react';
// import StarFull from '../../../assets/rating/starFull.svg';
// import StarEmpty from '../../../assets/rating/starEmpty.svg';
// import circleGlow from '../../../assets/rating/circleGlow.png';
// import s from './style';
//
// class RatingComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             ratingStyle: this.props.ratingStyle ? this.props.ratingStyle : 'default', // default or circle
//             rating: this.props.rating ? this.props.rating : 0,
//             max: this.props.max ? this.props.max : 5,
//             iconWidth: this.props.iconWidth ? this.props.iconWidth : 36,
//             iconHeight: this.props.iconHeight ? this.props.iconHeight : 36,
//             iconSelected: this.props.iconSelected ? this.props.iconSelected : StarFull,
//             iconUnselected: this.props.iconUnselected ? this.props.iconUnselected : StarEmpty,
//             editable: this.props.editable != null ? this.props.editable : true,
//         };
//     }
//
//     _onRate(rating) {
//         this.setState({rating});
//         if (this.props.onRate) {
//             this.props.onRate(rating);
//         }
//     }
//
//     _star = (iBool) => {
//         return iBool ? <this.state.iconSelected/> : <this.state.iconUnselected/>;
//     };
//
//     render() {
//         let icons = [];
//         let component = {};
//
//         if (this.state.ratingStyle === 'circle')
//         {
//
//             //TODO: optimize duplicated code
//             for (let i = 1; i <= this.state.max; i++) {
//
//                 if (this.state.rating != i)
//                 {
//                     icons.push(<TouchableWithoutFeedback
//                         disabled={!this.state.editable}
//                         key={i}
//                         style={{width: 44, height: 44}}
//                         onPress={()=>this._onRate(i)}
//                     >
//                         <View style={[s.ratingCircle, {marginRight: 24}]}>
//                             <Text style={s.circleRatingText}>{i.toString()}</Text>
//                             {this._star(this.state.rating == i)}
//                         </View>
//                     </TouchableWithoutFeedback>);
//                 }
//                 else
//                 {
//                     icons.push(<TouchableWithoutFeedback
//                         disabled={!this.state.editable}
//                         key={i}
//                         style={{width: 44, height: 44}}
//                         onPress={()=>this._onRate(i)}
//                     >
//                         <View style={[s.ratingCircle, {marginRight: 24, position: 'relative', borderWidth: 0}]}>
//                             <Image source={circleGlow} style={{position: 'absolute', height: 66, width: 66, left: -11, top: -12}} />
//                             <Text style={[s.circleRatingText, {color: 'black'}]}>{i.toString()}</Text>
//                             {this._star(this.state.rating == i)}
//                         </View>
//                     </TouchableWithoutFeedback>);
//                 }
//             }
//
//             component = <View style={[this.props.style, {flexDirection:'row', height: 44, alignItems: 'center', justifyContent: 'center', marginTop: 9}]}>
//                 {icons}
//             </View>;
//         }
//         else
//         {
//             for (let i = 1; i <= this.state.max; i++) {
//                 icons.push(<TouchableWithoutFeedback
//                     disabled={!this.state.editable}
//                     key={i}
//                     style={{height:this.state.iconHeight,width:this.state.iconWidth}}
//                     onPress={()=>this._onRate(i)}
//                 >
//                     {this._star(this.state.rating >= i)}
//
//                 </TouchableWithoutFeedback>);
//             }
//
//             component = <View style={[this.props.style, {flexDirection:'row', height: 30, alignItems: 'center', justifyContent: 'center', marginTop: 9}]}>
//                 <Text style={s.ratingValue}>{this.state.rating.toString()}</Text>
//                 {icons}
//             </View>;
//         }
//
//         return(
//                 component
//         );
//     }
// }
//
// export default RatingComponent;
