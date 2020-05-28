import React from "react";
import { ActivityIndicator, View } from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import * as actions from "../../actions/index";

function Login(props) {

    const navigation = useNavigation()

    React.useEffect(()=> {
        props.facebookLogin()
        if(props.token) navigation.navigate('Map')
    }, [props])

    return(
        <View style={{justifyContent: 'center', flex: 1}}>
            <ActivityIndicator size='large' color='blue' />
        </View>
    )
}

function mapStateToProps({ auth }) {
    return { token: auth.token };
}

export default connect(mapStateToProps, actions)(Login)