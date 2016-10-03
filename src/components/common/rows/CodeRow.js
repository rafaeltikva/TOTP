import React, {PropTypes} from 'react'
import {View, Text, StyleSheet, Clipboard, Vibration} from 'react-native'
import globalStyles from '../../../styles'
import Row from './Row'
import ButtonToolTip from '../ButtonToolTip'

class CodeRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showToolTip: false
        };

        this.toggleToolTip = this.toggleToolTip.bind(this);
        this.hideToolTip = this.hideToolTip.bind(this);
        this.copyCode = this.copyCode.bind(this);

        this.buttons = [
            {
                title: 'Copy',
                onPress: this.copyCode
            },
            {
                title: 'Edit'
            },
            {
                title: 'Delete'
            }
        ];
    }

    render() {
        console.log('rendering CodeRow', this.props);
        let {name, code} = this.props.children;
        let buttonToolTip = <ButtonToolTip buttons={this.buttons}/>;

        return (
            <Row style={styles.codeRow} onPress={this.hideToolTip} onLongPress={this.toggleToolTip}>
                <View style={styles.codeRowContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.code}>{code}</Text>
                </View>
                {this.state.showToolTip ? buttonToolTip : null}
                <Text style={styles.timer}>{this.props.timer}</Text>
            </Row>
        );

    }

    toggleToolTip() {
        this.setState({showToolTip: !this.state.showToolTip});
        console.log('showing toolTip');
    }

    hideToolTip() {
        this.setState({showToolTip: false});
    }

    copyCode() {
        let {code} = this.props.children;
        console.log('copying code:', code);
        Clipboard.setString(code.toString());
        Vibration.vibrate([0, 500]);
    }
}

CodeRow.propTypes = {
    timer: PropTypes.number.isRequired,
    children: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    codeRow: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: globalStyles.secondaryColor,
        padding: 16,
        justifyContent: 'space-between'
    },
    name: {
        color: globalStyles.primaryColor,
        marginBottom: 8
    },
    timer: {
        alignSelf: 'center'
    }
});

export default CodeRow;
