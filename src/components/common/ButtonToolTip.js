import React, {PropTypes} from 'react'
import {StyleSheet, View} from 'react-native'
import {TextButton, IconButton} from './buttons'
import globalStyles from '../../styles'

class ButtonToolTip extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {this.props.buttons.map((button, index) =>
                    <TextButton key={index} onPress={button.onPress} containerStyle={styles.buttonContainerStyle} style={styles.buttonContentStyle}>{button.title}</TextButton>
                )}
            </View>

        );
    }
}

ButtonToolTip.propTypes = {
    buttons: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    buttonContainerStyle: {
        padding: 8,
        borderRadius: 0,
        backgroundColor: globalStyles.colorBlack,
        borderWidth: 1,
        borderColor: globalStyles.colorWhite

    },
    buttonContentStyle: {
        fontSize: 12
    }

});

export default ButtonToolTip;