import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    Animated
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { HeaderBar, TextIconButton } from '../components'
import { SIZES, FONTS, COLORS, icons } from '../constants'

import { MapStyle } from '../styles'

const Place = ({ navigation, route }) => {

    const [selectedPlace, setSelectedPlace] = useState(null)
    const [selectedHotel, setSelectedHotel] = useState(null)

    let _panel = useRef(null)

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

    const renderMap = () => {
        return (
            <SlidingUpPanel
                ref={c => (_panel = c)}
                draggableRange={{ top: SIZES.height + 120, bottom: 120 }}
                showBackdrop={false}
                snappingPoints={[SIZES.height + 120]}
                height={SIZES.height + 120}
                friction={0.7}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'transparent'
                }}>
                    {/* Panel Header */}
                    <View style={{
                        height: 120,
                        backgroundColor: 'transparent',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image
                            source={icons.up_arrow}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.white
                            }}
                        />
                        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                            SWIPE FOR DETAILS
                        </Text>
                    </View>

                    {/* Panel Detail */}
                    <View style={{
                        flex: 1,
                        backgroundColor: COLORS.white,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <MapView
                            style={{
                                flex: 1,
                                width: '100%',
                                height: '100%',
                            }}
                            customMapStyle={MapStyle}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={selectedPlace?.mapInitialRegion}
                        >
                            {
                                selectedPlace?.hotels.map((hotel, index) => (
                                    <Marker
                                        key={index}
                                        coordinate={hotel.latlng}
                                        identifier={hotel.id}
                                        onPress={() => {
                                            setSelectedHotel(hotel)
                                        }}
                                    >
                                        <Image
                                            source={
                                                selectedHotel?.id === hotel.id
                                                    ? icons.bed_on : icons.bed_off}
                                            resizeMode='contain'
                                            style={{
                                                width: 50,
                                                height: 50
                                            }}
                                        />

                                    </Marker>
                                ))
                            }
                        </MapView>
                    </View>
                </View>

            </SlidingUpPanel>


        )
    }




    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {renderPlace()}
            {renderMap()}
        </View>
    )
}

export default Place;