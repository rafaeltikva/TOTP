import React, {PropTypes} from 'react'
import {AppRegistry, StyleSheet, ListView, View, StatusBar, Text} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import reactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'
import * as codesActions from '../../actions/codesActions'
import CodeRow from '../common/rows/CodeRow'
import {IconButton} from '../common/buttons'
import {randomString} from '../../include/helpers'
import TOTP from '../../include/TOTP'
import {TOTP_INTERVAL} from '../../include/config'
import status from '../../constants/statuses'
import routes from '../../routes'

class Codes extends React.Component {

    constructor(props) {

        super(props);

        this.ds = new ListView.DataSource({
            getRowData: this.getRowData,
            getSectionData: this.getSectionData,
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            timer: TOTP_INTERVAL
        };

        this.renderRow = this.renderRow.bind(this);

    }

    componentWillMount() {

        this.interval = this.setInterval(() => {
            let {codes, actions} = this.props;
            let timerInitialized = false;
            let timer = this.state.timer - 1;

            console.log(`timer: ${timer}. the codes: `, codes);

            if (timer % TOTP_INTERVAL === 0) {
                timer = TOTP_INTERVAL;
                timerInitialized = true;
                let newCodes = codes.data.map((code) => {
                    console.log('replacing code: ', code);
                    let newOTPObj = new TOTP(code.name, code.secret);
                    return newOTPObj.getOTPData();
                });
                console.log('storing new codes', newCodes);
                actions.storeCodes(newCodes);

            }

            this.setState({timer});

        }, 1000);

    }

    componentWillUnmount() {
        this.clearInterval(this.interval);
    }

    render() {
        const {codes, route, navigator, goTo, goBack} = this.props;
        const {setCodes, getCodes} = this;
        console.log('rendering Codes', this.props);
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <ListView removeClippedSubviews={false} initialListSize={1} enableEmptySections={true} dataSource={this.ds.cloneWithRows(codes.data)}
                          renderRow={this.renderRow}/>

                <IconButton onPress={goTo(routes.newCode, navigator)}/>
            </View>
        );

    }

    getRowData(dataBlob, sectionID, rowID) {
        console.log('the rowData:', {dataBlob, sectionID, rowID});
        return dataBlob[sectionID][rowID]; // this is actually the default return value
    }

    getSectionData(dataBlob, sectionID) {
        return dataBlob[sectionID];
    }

    renderRow(rowData) {
        return (
            <CodeRow timer={this.state.timer}>{rowData}</CodeRow>
        );
    }


}

// ES6 mixin workaround
reactMixin(Codes.prototype, TimerMixin);

Codes.propTypes = {
    //myProp: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

function mapStateToProps(state, ownProps) {
    return {
        codes: state.codes
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(codesActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Codes);
