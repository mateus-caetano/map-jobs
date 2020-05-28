import React from "react";
import {
    ScrollView,
    View,
    Text,
    Button,
    StyleSheet,
    Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SLIDE_DATA = [
    { text: 'Welcome to JobApp', color: '#03A9F4' },
    { text: 'Use this to get a job', color: '#009688' },
    { text: 'Set your location, then swipe away', color: '#03A9F4' }
  ];

export default function Welcome() {
    const navigation = useNavigation()

    return(
        <ScrollView
            pagingEnabled
            horizontal
        >
            {SLIDE_DATA.map((slide, index) => (
                <View
                    key={index}
                    style={[{backgroundColor: slide.color}, styles.slide]}
                >
                    <Text style={styles.slideMainText}>{slide.text}</Text>
                    <Text style={[styles.slideMainText, styles.slideTextSwipe]}>Swipe -></Text>
                    {index === SLIDE_DATA.length - 1 ?
                        (<View style={styles.button}>
                            <Button
                                title='Get started'
                                onPress={() => navigation.navigate('Login')}
                            />
                        </View>):
                        null
                    }
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    slide: {
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center'
    },

    slideMainText: {
        color: '#fff',
        fontSize: 22
    },

    slideTextSwipe: {
        fontSize: 18,
        position: 'absolute',
        bottom: 20,
        right: 20
    },

    button: {
        marginTop: 15
    }
})