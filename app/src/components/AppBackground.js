import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const AuthBackground = () => (
    <LinearGradient
        colors={['#F8DF8D', '#FF9E18']}
        start={{ x: 0, y: 0, }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFill}
    />
);


export default AuthBackground;

// export default class AppBackground extends React.PureComponent {
//     render() {
//         return (
//             <LinearGradient
//                 colors={['#F8DF8D', '#FF9E18']}
//                 start={{ x: 0, y: 0, }}
//                 end={{ x: 1, y: 0 }}
//                 style={StyleSheet.absoluteFill}
//             />
//         )
//     }
// }

// const styles = StyleSheet.create({
//     background: {
//         ...StyleSheet.absoluteFill,
//     },
// });