import React from "react";
import {SafeAreaView} from "react-navigation";
import {Text} from "react-native";
import s from "../../AuthLoader/styles";


const OptTab = ({ action }) => (
    <SafeAreaView forceInset={{ horizontal: 'always', top: 'always' }}>
        <Text style={s.welcome}>OPT Tab</Text>
    </SafeAreaView>
);

export default OptTab;