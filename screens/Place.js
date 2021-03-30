import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    Animated,
    _Text
} from 'react-native';

import { HeaderBar } from '../components'
import { TextIconButton } from '../components'

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

                <View style={{
                    flex: 1,
                    paddingHorizontal: SIZES.padding,
                    justifyContent: 'flex-end',
                    marginBottom: 100
                }}>
                    {/* Name & Rating */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{
                            color: COLORS.white, ...FONTS.largeTitle
                        }}>
                            {selectedPlace?.name}
                        </Text>
                        <View
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{
                                marginRight: 5, color: COLORS.white, ...FONTS.h3
                            }}>{selectedPlace?.rate}</Text>
                            <Image
                                source={icons.star}
                                style={{
                                    width: 20,
                                    height: 20
                                }}
                            />
                        </View>

                    </View>

                    {/* Description */}
                    <Text style={{ color: COLORS.white, ...FONTS.body3, marginTop: SIZES.base }}
                    >{selectedPlace?.description}
                    </Text>
                    {/* Text Icon Button */}
                    <TextIconButton
                        label='Book of flight'
                        icon={icons.aeroplane}
                        customContainerStyle={{
                            marginTop: SIZES.padding
                        }}
                        onPress={() => {
                            console.log('Book a flight')
                        }}
                    />
                </View>


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