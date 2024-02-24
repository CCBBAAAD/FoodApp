import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { getItem, setItem } from '../utils/asyncStorage';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { PROVIDER_GOOGLE } from 'react-native-maps';

const DeliveryAddress = ({ navigation }) => {
    const [address, setAddress] = useState(''); // Set the fullName from the passed param or default to empty
    const [label, setLabel] = useState('');
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        (async () => {
            try {
                const add = await getItem('address');
                setAddress(add);

                const lat = await getItem('latitude');
                const long = await getItem('longitude');

                setLatitude(parseFloat(lat));
                setLongitude(parseFloat(long));
                setLoading(false);
            } catch (error) {
                console.error('Failed to load data', error);
                setLoading(false); // Ensure loading is set to false even if there's an error
            }
        })();
    }, []);

    const handleContinue = () => {

        setItem('address', address);
        setItem('latitude', latitude.toString());
        setItem('longitude', longitude.toString());
        setItem('label', label);

        navigation.navigate('IdValidation');
    };

    const handleMapClick = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setLatitude(latitude);
        setLongitude(longitude);
        getNewLocation();
    };

    // Function to update location based on latitude and longitude
    const getNewLocation = async () => {
        // Reverse geocode the coordinates to get address
        const addressResponse = await Location.reverseGeocodeAsync({
            latitude: latitude,
            longitude: longitude,
        });

        if (addressResponse.length > 0) {
            console.log(addressResponse[0]);
            const { city, region, postalCode, country, district } = addressResponse[0];
            let fullAddress = '';
            if (district) fullAddress += `${district}, `;
            if (city) fullAddress += `${city}, `;
            if (region) fullAddress += `${region}, `;
            if (postalCode) fullAddress += `${postalCode}, `;
            if (country) fullAddress += country;

            setAddress(fullAddress);
        }


    };
    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        setLatitude(latitude);
        setLongitude(longitude);

        // Reverse geocode the coordinates to get address
        const addressResponse = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
        });

        if (addressResponse.length > 0) {
            const { city, region, postalCode, country, district } = addressResponse[0];
            let fullAddress = '';
            if (district) fullAddress += `${district}, `;
            if (city) fullAddress += `${city}, `;
            if (region) fullAddress += `${region}, `;
            if (postalCode) fullAddress += `${postalCode}, `;
            if (country) fullAddress += country;


            setAddress(fullAddress);
        }
    };

    if (loading) {
        // Render a loading spinner or some placeholder content
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#f0e68c" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Ionicons name="chevron-back-circle-outline" size={60} color="black" />
                <Text style={styles.titleText}>Delivery Address</Text>
            </View>
            <View style={styles.content}>
                <MapView
                    showsMyLocationButton
                    showsUserLocation
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.00922,
                        longitudeDelta: 0.00421,
                    }}
                    onPress={handleMapClick} // Add this onPress event handler
                >
                    {/* Marker with current location */}
                    <Marker
                        coordinate={{
                            latitude: latitude,
                            longitude: longitude,
                        }}
                        title="Your Location"
                        description={address}
                    />
                </MapView>

                <ScrollView>
                    <Text style={styles.bodyText}> Enter your delivery address</Text>

                    <TextInput
                        style={styles.input}
                        onChangeText={setAddress}
                        value={address}
                        placeholder=""
                    />
                    <Text style={styles.bodyText}> label </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setLabel}
                        value={label}
                        placeholder="Home"
                    />
                    <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
                        <Text style={styles.locationButtonText}>Use Current Location</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.agreeButton} onPress={handleContinue}>
                        <Text style={styles.agreeButtonText}>Confirm</Text>
                    </TouchableOpacity>
                </ScrollView>

            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Adjust the background color to match the design
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'start',
        paddingHorizontal: 10,
        PaddingTop: 5,
        backgroundColor: '#298825',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    map: {
        width: '100%',
        height: '40%',
        marginBottom: 25,
    },
    titleText: {
        paddingVertical: 20,
        marginLeft: 30,
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black', // Adjust the font color to match the design
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 10,

    },
    methodOption: {
        padding: 15,

        flexDirection: 'row',
        alignItems: 'center',
        // Rest of your styling
    },
    selectedMethod: {
        backgroundColor: '#f0e68c'
        // Rest of your styling
    },
    input: {
        height: 50,

        marginVertical: 15,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        borderRadius: 15,
        paddingHorizontal: 15,

        backgroundColor: '#F5F5F5'
    },
    bodyText: {
        fontSize: 18,
        color: 'black', // Adjust the font color to match the design
        lineHeight: 24,
        fontWeight: 'bold',
        textAlign: 'justify'
    },

    locationButton: {
        backgroundColor: 'white', // Adjust the button color to match the design
        borderRadius: 25,
        paddingVertical: 10,
        width: '85%',
        borderColor: '#298825',
        borderWidth: 2,
        alignSelf: 'center',
        marginTop: 20,

    },
    agreeButton: {
        backgroundColor: '#298825', // Adjust the button color to match the design
        borderRadius: 25,
        paddingVertical: 10,
        width: '85%',

        alignSelf: 'center',
        marginTop: 20,

    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    paymentIcon: {
        width: 30, // Set the width as needed
        height: 30, // Set the height as needed
        marginRight: 10, // Add some spacing between the icon and the text
    },
    agreeButtonText: {
        fontSize: 18,
        color: '#fff', // Adjust the font color to match the design
        textAlign: 'center',
    },
    locationButtonText: {
        fontSize: 18,
        color: '#298825', // Adjust the font color to match the design
        textAlign: 'center',
    },
    divider: {
        borderBottomColor: '#EEEEEE',
        borderBottomWidth: 3,
        flexGrow: 1,
        marginBottom: 10,
    },
});

export default DeliveryAddress;
