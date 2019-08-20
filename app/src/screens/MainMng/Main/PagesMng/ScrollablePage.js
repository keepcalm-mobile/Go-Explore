import React from 'react';

class ScrollablePage extends React.Component<Props> {
    constructor(props) {
        super(props);

        this._scrollOffset = 0;
        props.setScrollOffset(this._scrollOffset);
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', this.componentDidFocusHandler);
    }

    componentDidFocusHandler = () => {
        this.props.setScrollOffset(this._scrollOffset);
    };

    componentWillUnmount() {
        this.focusListener.remove();
    }

    onScroll = (e) => {
        this._scrollOffset = e.nativeEvent.contentOffset.y;
        this.props.setScrollOffset(this._scrollOffset);
    };
}

export default ScrollablePage;
