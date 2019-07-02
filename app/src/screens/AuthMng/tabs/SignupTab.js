import React from "react";
import {SafeAreaView} from "react-navigation";
import {Button, Text} from "react-native";
import s from "../styles";

class SignupTab extends React.Component<Props> {
    constructor(props){
        super(props);
        console.log("SignupTab : " + JSON.stringify(props));
    }
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView forceInset={{ horizontal: 'always', top: 'always' }}>
                <Text style={s.welcome}>SignupScreen</Text>
                <Button
                    title="Go to static count screen"
                    onPress={() => this.props.dispatch({ type: 'LOADER_COMPLETE', text: 'some texts' })}
                />
            </SafeAreaView>
        );
    }
}

export default SignupTab;