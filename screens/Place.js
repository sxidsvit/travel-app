import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    Animated
} from 'react-native';

import { HeaderBar } from '../components'

import { SIZES, FONTS, COLORS, icons } from '../constants'

const Place = ({ navigation, route }) => {

    const [selectedPlace, setSelectedPlace] = useState(null)

    useEffect(() => {
        let { selectedPlace } = route.params
        setSelectedPlace(selectedPlace)
    }, [])


    const renderPlace = () => {
        return (
            <ImageBackground
                source={selectedPlace?.image}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            >
                <HeaderBar
                    title=''
                    leftOnPressed={() => navigation.goBack()}
                    right={false}
                    containerStyle={{
                        marginTop: SIZES.padding * 2
                    }}
                />

            </ImageBackground>

        )
    }


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {renderPlace()}
        </View>
    )
}

export default Place;