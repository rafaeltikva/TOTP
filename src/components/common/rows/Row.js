import React, {PropTypes} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import globalStyles from '../../../styles'

class Row extends React.Component {
    render() {
        console.log('rendering Row', this.props);
        let row = (
            <View style={[styles.row, this.props.style]}>
                {this.props.children}
            </View>
        );
        let touchableContainer = (
            <TouchableHighlight style={{marginTop: 8}} underlayColor={globalStyles.secondaryColor} onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
                {row}
            </TouchableHighlight>
        );
        let output = (this.props.onPress || this.props.onLongPress ? touchableContainer : row);
        console.log('returning output: ', output);
        return (output);

    }
}

Row.propTypes = {
    children: PropTypes.any.isRequired,
    style: PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.object, React.PropTypes.array]),
    onPress: PropTypes.func,
    onLongPress: PropTypes.func
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

export default Row;
