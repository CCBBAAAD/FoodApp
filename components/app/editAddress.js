import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { getItem, setItem } from '../utils/asyncStorage';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { PROVIDER_GOOGLE } from 'react-native-maps';

const EditDeliveryAddress = ({ navigation }) => {
    const [address, setAddress] = useState(''); // Set the fullName from the passed param or default to empty
    const [label, setLabel] = useState('');
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bgColor, setBgColor] = useState('Level 1');
    const [ies, setIES] = useState('Level 1');
    const [iers, setIERS] = useState('Level 1');
    const [fColor, setFColor] = useState('Level 1');
    const [fSize, setFSize] = useState('Level 1');
    const [cdl, setCDL] = useState('Level 1');
    const [loadingScreen, setLoadingScreen] = useState(false);
    const [permissionsGranted, setPermissionsGranted] = useState(false);

    useEffect(() => {
        setLoadingScreen(true);
        checkPermissionsAndFetchData();
    }, []);

    const checkPermissionsAndFetchData = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                setPermissionsGranted(true);
                await getCurrentLocation();
                await fetchData();

            } else {
                alert('Permission to access location was denied');
                setLoadingScreen(false);
            }
        } catch (error) {
            console.error('An error occurred while fetching data', error);
            setLoadingScreen(false);
        }
    };




    const fetchData = async () => {
        console.log("fetching");
        setTimeout(async () => {
            try {
                const bgColor1 = await getItem('bgColor');
                if (!bgColor1) {
                    console.log("no bgColor");
                } else {

                    setBgColor(bgColor1);
                }

                const ies1 = await getItem('ies');
                if (!ies1) {
                    console.log("no ies");
                } else {

                    setIES(ies1);
                }

                const iers1 = await getItem('iers');
                if (!iers1) {
                    console.log("no iers");
                } else {

                    setIERS(iers1);
                }

                const fColor1 = await getItem('fColor');
                if (!fColor1) {
                    console.log("no fColor");
                } else {

                    setFColor(fColor1);
                }

                const fSize1 = await getItem('fSize');
                if (!fSize1) {
                    console.log("no fSize");
                } else {

                    setFSize(fSize1);
                }

                const cdl1 = await getItem('cdl');
                if (!cdl1) {
                    console.log("no cdl");
                } else {

                    setCDL(cdl1);
                }

                const add = await getItem('address');


                const lat = await getItem('latitude');
                const long = await getItem('longitude');



                if (!lat && !long) {

                    console.log("No Save address");
                } else {
                    setAddress(add);
                    setLatitude(parseFloat(lat));
                    setLongitude(parseFloat(long));
                }

                setLoadingScreen(false);

            } catch (error) {
                console.log(error);
            }
        }, 100);

        console.log(fSize);
    };

    const handleContinue = () => {

        setItem('address', address);
        setItem('latitude', latitude.toString());
        setItem('longitude', longitude.toString());
        setItem('label', label);

        navigation.goBack();
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
        console.log(latitude);
        console.log(longitude);

        // Reverse geocode the coordinates to get address
        const addressResponse = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
        });

        if (addressResponse.length > 0) {
            const { city, region, country } = addressResponse[0];
            let fullAddress = '';

            if (city) fullAddress += `${city}, `;
            if (region) fullAddress += `${region}, `;

            if (country) fullAddress += country;


            setAddress(fullAddress);
        }
    };

    if (loadingScreen && !latitude) {
        return <View style={styles.loadingContainer}>
            <Text style={[styles.loadingText, { color: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]}>Loading!</Text>
            <ActivityIndicator size="large" color={bgColor == 'Level 1' ? "#1D601A" : "#298825"} />
        </View>
    }


    return (
        <SafeAreaView style={styles.container}>

            <View style={[styles.header, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]}>
                <TouchableOpacity onPress={() => { navigation.navigate('Homepage'); }} style={[styles.backButton, { backgroundColor: 'white', padding: ies == 'Level 1' ? 10 : 'Level 2' ? 11 : 12 }]}>
                    {iers == 'Level 2' && <Ionicons name="chevron-back" size={ies == 'Level 1' ? 14 : 'Level 2' ? 16 : 18} color={bgColor == 'Level 1' ? "#1D601A" : "#298825"} />}
                    <Text style={[styles.backText, { fontSize: ies == 'Level 1' ? 12 : 'Level 2' ? 14 : 16, color: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.titleText}>Delivery Address</Text>
            </View>
            <View style={styles.content}>
                <MapView
                    showsMyLocationButton={true}
                    showsUserLocation={true}
                    style={styles.map}

                    provider={PROVIDER_GOOGLE}

                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
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
                    <Text style={[styles.bodyText, { fontSize: fSize == 'Level 1' ? 18 : fSize == 'Level 2' ? 20 : 22, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}> Enter your delivery address</Text>

                    <TextInput
                        style={styles.input}
                        onChangeText={setAddress}
                        value={address}
                        placeholder=""
                    />
                    <Text style={[styles.bodyText, { fontSize: fSize == 'Level 1' ? 18 : fSize == 'Level 2' ? 20 : 22, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}> label </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setLabel}
                        value={label}
                        placeholder="Home"
                    />
                    <TouchableOpacity style={[styles.locationButton, { borderColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", width: ies == 'Level 1' ? '70%' : 'Level 2' ? '80%' : '80%' }]} onPress={getCurrentLocation}>
                        <Text style={[styles.locationButtonText, { paddingVertical: ies == 'Level 2' ? 2 : 0, color: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]}>Use Current Location</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.agreeButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", width: ies == 'Level 1' ? '70%' : 'Level 2' ? '80%' : '80%' }]} onPress={handleContinue}>
                        <Text style={[styles.agreeButtonText, { paddingVertical: ies == 'Level 2' ? 2 : 0, }]}>Confirm</Text>
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
        justifyContent: 'center',
        paddingHorizontal: 60,
        PaddingTop: 5,
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
        marginLeft: 15,

        fontSize: 20,
        fontWeight: 'bold',
        color: 'white', // Adjust the font color to match the design
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
        lineHeight: 24,
        fontWeight: 'bold',
        textAlign: 'justify'
    },

    locationButton: {
        backgroundColor: 'white', // Adjust the button color to match the design
        borderRadius: 25,
        paddingVertical: 10,
        borderWidth: 2,
        alignSelf: 'center',
        marginTop: 20,

    },
    agreeButton: {
        borderRadius: 25,
        paddingVertical: 10,
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
    loadingText: {
        paddingTop: 20,
        paddingBottom: 5,
        fontSize: 22,
        fontWeight: 'bold',

    },

    backButton: {
        position: 'absolute',
        top: 18, // Adjust the position as needed
        left: 20,
        zIndex: 10, // Ensure the button is above all other content
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        marginLeft: 5,
        fontWeight: 'bold',
        color: 'white'
    },


    loadingContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'White', // Semi-transparent background
    },
});

export default EditDeliveryAddress;
