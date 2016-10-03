import Codes from './components/scenes/Codes'
import NewCode from './components/scenes/NewCode'
import QRScan from './components/scenes/QRScan'

export default routes = {
    codes: {
        name: 'codes',
        title: 'Codes',
        component: Codes,
        icons: {
            left: 'bars',
            right: 'ellipsis-v'
        },
        handlers: {
            onRightButtonPress: (event) => {
                console.log('onRightButtonPress event: ', event);
                console.log('onRightButtonPress this: ', this);
            }
        }
    },
    newCode: {
        name: 'newCode',
        title: 'New Code',
        component: NewCode,
        icons: {
            left: 'remove',
            right: 'check'
        },
        handlers: {
            onRightButtonPress: () => {
                console.log('onRightButtonPress this: ', this);
                return () => this.props.navigator.jumpTo(routes.codes);
            }
        }
    },
    QRScan: {
        name: 'QRScan',
        title: 'QR Scan',
        component: QRScan,
        icons: {
            left: 'remove',
            right: 'check'
        },
        onRightButtonPress: () => {
                console.log('onRightButtonPress this: ', this);
                return () => this.props.navigator.jumpTo(routes.codes);
            }
    }
}