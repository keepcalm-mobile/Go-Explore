import { connect } from 'react-redux';
// import { compose } from 'recompose';
import { compose } from 'redux';
import HomeScreen from './ScreenMain';

const enhance = compose(
    connect(),
);

export default enhance(HomeScreen);