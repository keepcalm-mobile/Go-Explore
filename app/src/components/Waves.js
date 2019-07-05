import React, { Component } from 'react';
// import styled from 'styled-components/native';
import WavesSvg from "../../assets/waves.svg";
import {StyleSheet} from "react-native";
import {verticalScale} from "../utils/resize";

// const WaveSt = styled(WavesSvg)`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   top: 25%;
// `;
//
// export default class Waves extends Component {
//     render() {
//         return (
//             // <Wave width={330} height={54}
//             <WaveSt />
//         )
//     }
// }

const WavesBackground = () => (
    <WavesSvg style={[StyleSheet.absoluteFill, {marginTop: verticalScale(196)}]} />//{top: "25%"}
);

export default WavesBackground;