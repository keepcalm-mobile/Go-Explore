import React from 'react';
import ComingSoon from '../../../../../components/ComingSoon';
import ScrollablePage from '../ScrollablePage';

class Calendar extends ScrollablePage {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onBackPress = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <>
                {ComingSoon(this.onBackPress)}
            </>
        );
    }
}

export default Calendar;
