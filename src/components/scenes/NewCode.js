import React, {PropTypes} from 'react'
import {StyleSheet, View,Picker, Text, TextInput} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as codesActions from '../../actions/codesActions'
import Row from '../common/rows/Row'
import {TextButton} from '../common/buttons'
import globalStyles from '../../styles'
import TOTP from '../../include/TOTP'
import {randomString} from '../../include/helpers'

class NewCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            secret: '',
            showSourceButtonsRow: 0
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSecret = this.onChangeSecret.bind(this);
        this.focusOnSecret = this.focusOnSecret.bind(this);
        this.toggleRow = this.toggleRow.bind(this);
        this.submitCode = this.submitCode.bind(this);
        this.generateSecret = this.generateSecret.bind(this);
    }

    render() {
        console.log('rendering NewCode', this.props);
        let {navigator, goBack, goTo} = this.props;

        return (
            <View style={styles.container}>
                <Row>
                    <TextInput ref={element => {this.nameInput = element}} style={styles.input}
                               placeholder={'Name'} autoFocus={true}
                               onChangeText={this.onChangeName}
                               onSubmitEditing={this.focusOnSecret}/>
                </Row>
                <Row>
                    <TextInput ref={element => {this.secretInput = element}} style={styles.input}
                               placeholder={'Secret Key'}
                               onFocus={this.toggleRow}
                               onBlur={this.toggleRow}
                               onChangeText={this.onChangeSecret}
                               value={this.state.secret}
                        />
                </Row>
                <Row ref={element => {this.sourceButtonsRow = element}}
                     style={[styles.newCodeRow, { justifyContent: 'space-around', opacity: this.state.showSourceButtonsRow}]}>
                    <TextButton containerStyle={styles.sourceButtonContainer}
                                disabled={!this.state.showSourceButtonsRow}
                                onPress={this.generateSecret}>Generate</TextButton>
                    <TextButton containerStyle={styles.sourceButtonContainer} onPress={goTo(routes.QRScan, navigator)}>QR Scan</TextButton>
                </Row>
                <Row style={[styles.newCodeRow, {justifyContent: 'center' }]}>
                    <TextButton containerStyle={{width: 200, marginTop: 8}}
                                onPress={this.submitCode}>Submit</TextButton>
                </Row>
            </View>
        );
    }

    onChangeName(name) {
        this.setState({name});

    }

    onChangeSecret(secret) {
        this.setState({secret});

    }

    focusOnSecret() {
        this.secretInput.focus();
    }

    toggleRow(element) {
        console.log('toggling element');
        let toggledRow = !this.state.showSourceButtonsRow ? 1 : 0;
        this.setState({showSourceButtonsRow: toggledRow});

    }

    generateSecret() {
        let secret = randomString();
        this.onChangeSecret(secret);
    }

    submitCode() {
        console.log('submitting new code');
        let {codes, actions, goBack,goTo, navigator} = this.props;
        let newCodeObj = new TOTP(this.state.name, this.state.secret).getOTPData();
        codes.data.push(newCodeObj);
        actions.storeCodes(codes.data).then(codes => {
            goBack(navigator)();
        });
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    newCodeRow: {
        marginTop: 8,
        marginBottom: 8
    },
    input: {
        padding: 16,
        margin: 8,
        flex: 1,
        height: 48,
        borderRadius: 10,
        borderColor: globalStyles.primaryColor,
        borderWidth: 1
    },
    sourceButtonContainer: {
        backgroundColor: globalStyles.primaryColor,
        padding: 8,
        borderRadius: 0

    }
});

NewCode.propTypes = {
    //myProp: PropTypes.string.isRequired
};


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

export default connect(mapStateToProps, mapDispatchToProps)(NewCode);
