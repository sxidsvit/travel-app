import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Animated,
    ScrollView,
    Platform,
    TouchableOpacityBase
} from 'react-native';

import { dummyData, icons, images, theme, COLORS, SIZES, FONTS } from '../constants'

const COUNTRIES_ITEM_SIZE = SIZES.width / 3

const Dashboard = ({ navigation }) => {

    const countryScrollX = useRef(new Animated.Value(0)).current

    const [countries, setCountries] = useState([{ id: -1 }, ...dummyData.countries, { id: -2 }])

    const rendereHeader = () => {
        return (
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.base,
                alignItems: 'center',
                // backgroundColor: '#fff'
            }}
            >
                {/* Side Drawer */}
                <TouchableOpacity
                    style={{
                        width: 45,
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => console.log('Side Drawer')}
                >
                    <Image
                        source={icons.side_drawer}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.white
                        }} />


                </TouchableOpacity>
                {/* Label/Title */}
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.h3
                        }}>ASIA</Text>
                </View>

                {/* Profile */}
                <TouchableOpacity
                    onPress={() => console.log('Profile')}
                >
                    <Image
                        source={images.profile_pic}
                        resizeMode='contain'
                        style={{
                            width: 45,
                            height: 45,
                            borderRadius: 30
                        }}
                    />
                </TouchableOpacity>

            </View>
        )

    }

    const renderCountries = () => {
        return (
            <Animated.FlatList
                horizontal
                pagingEnabled
                snapToAlignment='center'
                snapToInterval={COUNTRIES_ITEM_SIZE}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                decelerationRate={0}
                data={countries}
                keyExtractor={item => `${item.id}`}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: countryScrollX } } }],
                    { useNativeDriver: false })}
                renderItem={({ item, index }) => {
                    const opacity = countryScrollX.interpolate({
                        inputRange: [
                            (index - 2) * COUNTRIES_ITEM_SIZE,
                            (index - 1) * COUNTRIES_ITEM_SIZE,
                            (index - 0) * COUNTRIES_ITEM_SIZE
                        ],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp'
                    })

                    const mapSize = countryScrollX.interpolate({
                        inputRange: [
                            (index - 2) * COUNTRIES_ITEM_SIZE,
                            (index - 1) * COUNTRIES_ITEM_SIZE,
                            (index - 0) * COUNTRIES_ITEM_SIZE
                        ],
                        outputRange: [25, Platform.OS === 'ios' ? 80 : 60, 25],
                        extrapolate: 'clamp'
                    })

                    const fontSize = countryScrollX.interpolate({
                        inputRange: [
                            (index - 2) * COUNTRIES_ITEM_SIZE,
                            (index - 1) * COUNTRIES_ITEM_SIZE,
                            (index - 0) * COUNTRIES_ITEM_SIZE
                        ],
                        outputRange: [15, 25, 15],
                        extrapolate: 'clamp'
                    })

                    if (index == 0 || index == countries.length - 1) {
                        return (
                            <View
                                style={{
                                    width: COUNTRIES_ITEM_SIZE
                                }}
                            />
                        )
                    } else {
                        return (
                            <View>
                                <Text style={{ color: COLORS.white }}>
                                    {item.name}</Text>
                            </View>
                        )
                    }
                }}
            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            {rendereHeader()}
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: Platform.OS === 'ios' ? 40 : 0,
                }}>

                <View style={{ height: 700 }}>

                    {/* Countries */}
                    <View>
                        {renderCountries()}
                    </View>

                    {/* Places */}

                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default Dashboard;