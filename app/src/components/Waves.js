import React, { Component } from 'react';
import styled from 'styled-components/native';
import WavesSvg from "../../assets/waves.svg";

const WaveSt = styled(WavesSvg)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  top: 25%;
`;

export default class Waves extends Component {
    render() {
        return (
            // <Wave width={330} height={54} 
            <WaveSt />
        )
    }
}