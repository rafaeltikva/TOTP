import React, {PropTypes} from 'react'
import {StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from 'react-native-button'
import globalStyles from '../../../styles'

class IconButton extends React.Component {
    render() {
        let {onPress} = this.props;
        return (
            <Button containerStyle={styles.iconButtonContainer} onPress={onPress}>
                <Icon style={styles.iconButtonIcon} name="plus"/>
            </Button>
        )

    }
}

IconButton.propTypes = {
    //myProp: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    iconButtonContainer: {
        position: 'absolute',
        bottom: 10,
        right: 8,
        padding: 16,
        borderRadius: 50,
        backgroundColor: globalStyles.accentColor,
        width: 48,
        height: 48
    },
    iconButtonIcon: {
        textAlign: 'center',
        color: globalStyles.colorWhite,
        fontSize: 16

    }

});

export default IconButton;
