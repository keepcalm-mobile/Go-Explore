import React from 'react';
import type {Props} from 'react-native/Libraries/Components/View/View';
import PropTypes from 'prop-types';
import Svg, {Defs, LinearGradient, Stop, Text} from 'react-native-svg';
import {scale} from '../utils/resize';
import {colors, fontNames, fontSizes} from '../styles';

class TextGradient extends React.Component<Props> {
    static propTypes = {
        text: PropTypes.string.isRequired,
        lineHeight: PropTypes.number,
        fontSize: PropTypes.number,
        fontFamily: PropTypes.string,
        fontWeight: PropTypes.string,
    };

    static defaultProps = {
        lineHeight: scale(36),
        fontSize: fontSizes.heading,
        fontFamily: fontNames.bold,
        fontWeight: 'bold',
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {text, lineHeight, fontSize, fontFamily, fontWeight, style} = this.props;
        const width = text.length * (fontSize * 0.64);//0.56
        return (
            <Svg style={style} viewBox={'0 0 ' + width.toString() + ' ' + lineHeight.toString()} width={width} height={lineHeight.toString()} >
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2={(width * 0.5).toString()} y2="0">
                        <Stop offset="0" stopColor={colors.darkMain} stopOpacity="1" />
                        <Stop offset="1" stopColor={colors.lightMain} stopOpacity="1" />
                    </LinearGradient>
                </Defs>
                <Text fill="url(#grad)"
                      fontFamily={fontFamily}
                      fontWeight={fontWeight}
                      fontSize={fontSize}
                      lineHeight={lineHeight}
                      x="0"
                      y={fontSize}>
                    {text}
                </Text>
            </Svg>
        );
    }
}

export default TextGradient;
