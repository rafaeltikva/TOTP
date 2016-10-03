import React, {PropTypes} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Camera from 'react-native-camera'

class QRScan extends React.Component {

    constructor(props) {
        super(props);

        this.readQR = this.readQR.bind(this);

    }

    render() {
        console.log('rendering QRScan', this.props);
        return (
            <View>
                <Camera ref={element => {this.camera = element}} style={styles.camera}
                        onBarCodeRead={this.readQR}>
                    <Text>This is the camera</Text>
                </Camera>
            </View>
        );
    }

    readQR(data, bounds) {
        console.log('reading barcode with data & bounds:', {data, bounds});
    }
}

QRScan.propTypes = {
    //myProp: PropTypes.string.isRequired
};

const styles = StyleSheet.create({});

export default QRScan;