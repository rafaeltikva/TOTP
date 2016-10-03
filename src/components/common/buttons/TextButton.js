import React, {PropTypes} from 'react'
import {StyleSheet} from 'react-native'
import Button from 'react-native-button'
import globalStyles, {buttonContainer} from '../../../styles'

class TextButton extends React.Component {
    render() {
        console.log('rendering TextButton', this.props);
        return (
            <Button disabled={this.props.disabled}
                    containerStyle={[buttonContainer, styles.textButtonContainer, this.props.containerStyle]}
                    style={[styles.textButtonContent, this.props.style]}
                    onPress={this.props.onPress}>{this.props.children}</Button>
        );
    }
}

TextButton.propTypes = {
    children: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    style: PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.object]),
    containerStyle: PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.object])
};

const styles = StyleSheet.create({
    textButtonContainer: {
        alignSelf: 'center'
    },
    textButtonContent: {
        textAlign: 'center',
        color: globalStyles.colorWhite
    }

});

export default TextButton;