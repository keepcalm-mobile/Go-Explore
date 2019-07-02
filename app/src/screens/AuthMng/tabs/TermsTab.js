import React from "react";
import {SafeAreaView} from "react-navigation";
import {Text} from "react-native";
import s from "../../AuthLoader/styles";


const TermsTab = ({ text, action }) => (
    <SafeAreaView forceInset={{ horizontal: 'always', top: 'always' }}>
        <Text style={s.welcome}>Terms Tab</Text>
    </SafeAreaView>
);

export default TermsTab;