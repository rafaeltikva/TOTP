/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Navigator,
    StatusBar,
    ListView,
    View
} from 'react-native';
import {Provider} from 'react-redux'
import {bindActionCreators} from 'redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import globalStyles from './src/styles'
import routes from './src/routes'
import configureStore from './src/store/configureStore'
import {initializeCodes} from './src/actions/codesActions'
import * as codesActions from './src/actions/codesActions'


class TOTP extends Component {
    constructor(props) {
        super(props);

        this.goBack = this.goBack.bind(this);
        this.goTo = this.goTo.bind(this);
        this.renderScene = this.renderScene.bind(this);
        this.navigationBarRouteMapper = this.navigationBarRouteMapper.bind(this);

    }

    componentWillMount() {
        console.log('mounting TOTP');
        this.store = configureStore();
        this.store.dispatch(initializeCodes());
        this.bindedActionsCreators = bindActionCreators(codesActions, this.store.dispatch);
    }

    render() {
        console.log('rendering TOTP', this.props);
        return (
            <Provider store={this.store}>
                <Navigator initialRoute={routes.codes}
                           navigationBar={<Navigator.NavigationBar routeMapper={this.navigationBarRouteMapper()} style={styles.navBar} />}
                           sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}
                           renderScene={this.renderScene}
                    />
            </Provider>

        );
    }

    navigationBarRouteMapper() {
        return {
            LeftButton: (route, navigator, id, navState) => {
                return (
                    <Icon.Button name={route.icons.left} size={24} color={globalStyles.colorWhite}
                                 backgroundColor='transparent' onPress={this.goBack(navigator)}/>
                );
            },
            RightButton: (route, navigator, id, navState) => {
                console.log('RightButton stuff: ', {route, navigator, id, navState});
                return (
                    <Icon.Button name={route.icons.right} size={24} color={globalStyles.colorWhite}
                                 backgroundColor='transparent'/>
                );

            },
            Title: (route, navigator, id, navState) => {
                return (
                    <Text style={styles.navBarItem}>{route.title}</Text>
                );

            },
        }
    }

    goTo(route, navigator) {
        return () => navigator.push(route);

    }

    goBack(navigator) {
        return () => navigator.pop();
    }

    renderScene(route, navigator) {
        console.log('rendering scene: ', route.title);
        let {goTo, goBack} = this;
        return React.createElement(routes[route.name].component, {route, navigator, goTo, goBack});
    }
}

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: globalStyles.primaryColor,

    },
    navBarItem: {
        color: globalStyles.colorWhite,
        padding: 8,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16

    }
});

AppRegistry.registerComponent('TOTP', () => TOTP);

