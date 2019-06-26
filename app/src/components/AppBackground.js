import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

const Background = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default class AppBackground extends Component {
    render() {
        return (
            <Background
                colors={['#F8DF8D', '#FF9E18']}
                start={{ x: 0, y: 0, }}
                end={{ x: 1, y: 0 }}
            />
        )
    }
}