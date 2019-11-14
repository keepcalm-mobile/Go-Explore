import React from 'react';
import type {Props} from 'react-native/Libraries/Components/View/View';
import {Modal, ActivityIndicator, View, Text, StyleSheet} from 'react-native';
import {colors, fontNames, fontSizes} from '../styles';

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
      borderRadius: 10,
      alignItems: 'center',
      padding: 20,
  },
  indicator: {
      marginBottom: 15,
  },
  message: {
      color: colors.white,
      fontFamily: fontNames.bold,
      fontSize: fontSizes.heading,
      fontWeight: '400',
  },
});

const SIZES = ['small', 'large'];

// export default class OverlayLoader extends Component {
class OverlayLoader extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    visible: false,
    color: colors.white,
    indicatorSize: 'small',
    messageFontSize: fontSizes.heading,
    message: 'Loading...',
  };

  render() {
    const messageStyle = {
      color: this.props.color,
      fontSize: this.props.messageFontSize,
    };

      return (
        <Modal
          onRequestClose={() => {}}
          animationType={'fade'}
          transparent={true}
          visible={this.props.visible}
          supportedOrientations={['portrait', 'landscape']}
          onOrientationChange={
            evt => this.setState({currentOrientation: evt.nativeEvent.orientation})
          }
          >
          <View style={[styles.container]}>
            <View style={[styles.innerContainer]}>
            {
                typeof this.props.children !== 'undefined'
                    ?
                this.props.children
                    :
                <>
                    <ActivityIndicator
                        style={[styles.indicator]}
                        size={this.props.indicatorSize}
                        color={this.props.color}
                    />
                    <Text style={[styles.message, messageStyle]}>
                        {this.props.message}
                    </Text>
                </>
            }
            </View>
          </View>
        </Modal>
      );
  }
}

export default OverlayLoader;

// if (typeof this.props.children !== 'undefined') {
// } else {
//   return (
//     <Modal
//       onRequestClose={() => {}}
//       animationType={'fade'}
//       transparent={true}
//       visible={this.props.visible}
//       supportedOrientations={['portrait', 'landscape']}
//       onOrientationChange={
//         evt => this.setState({currentOrientation: evt.nativeEvent.orientation})
//       }
//       >
//       <View style={[styles.container]}>
//         <View style={[styles.innerContainer]}>
//           <ActivityIndicator
//             style={[styles.indicator]}
//             size={this.props.indicatorSize}
//             color={this.props.color}
//             />
//           <Text style={[styles.message, messageStyle]}>
//             {this.props.message}
//           </Text>
//         </View>
//       </View>
//     </Modal>
//   );
// }