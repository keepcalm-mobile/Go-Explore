import React from "react";
import {SafeAreaView} from "react-navigation";
import {Text, Button} from "react-native";
import s from "../styles";

class ForgotTab extends React.Component<Props> {
    constructor(props){
        super(props);
        console.log(JSON.stringify(props));
    }
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView forceInset={{ horizontal: 'always', top: 'always' }}>
                <Text style={s.welcome}>ForgotScreen</Text>
                <Button
                    title="Go to static count screen"
                    onPress={() => this.props.dispatch({ type: 'LOADER_COMPLETE', text: 'some texts' })}
                />
            </SafeAreaView>
        );
    }
}

export default ForgotTab;