import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setItem, getItem } from '../utils/asyncStorage';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
const PaymentMethod = ({ navigation }) => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [loadingScreen, setLoadingScreen] = useState(false);

    const [bgColor, setBgColor] = useState('Level 1');
    const [ies, setIES] = useState('Level 1');
    const [iers, setIERS] = useState('Level 1');
    const [fColor, setFColor] = useState('Level 1');
    const [fSize, setFSize] = useState('Level 1');
    const [cdl, setCDL] = useState('Level 1');
    const [fStyle, setFStyle] = useState('Level 1');
    let [isFontStyleLoaded] = useFonts({
        Roboto_400Regular,
        Poppins_400Regular,
        Poppins_700Bold,
        Roboto_700Bold
    });
    const selectMethod = (method) => {
        setSelectedMethod(method);
    };


    const handleContinue = () => {

        setItem('paymentMethod', selectedMethod);

        navigation.goBack();
    };


    useEffect(() => {
        setLoadingScreen(true);
        fetchData(); // Function to fetch data
    }, []); // Run useEffect whenever navigation state changes

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

                setLoadingScreen(false);

            } catch (error) {
                console.log(error);
            }
        }, 100);

        console.log(fSize);
    };

    if (loadingScreen) {
        return <View style={styles.loadingContainer}>
            <Text style={[styles.loadingText, { color: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]}>Loading!</Text>
            <ActivityIndicator size="large" color={bgColor == 'Level 1' ? "#1D601A" : "#298825"} />
        </View>
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.header, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]}>
                <TouchableOpacity onPress={() => { navigation.goBack(); }} style={[styles.backButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]}>
                    <Ionicons name="chevron-back" size={14} color={fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'white' : '#0000CC'} />
                    {iers == 'Level 2' && <Text style={[styles.backText, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'white' : '#0000CC' }]}>Back</Text>}
                </TouchableOpacity>
                <Text style={styles.titleText}>Payment Method</Text>
            </View>
            <Text style={[styles.DeliveryTitle, { fontSize: fSize == 'Level 1' ? 18 : fSize == 'Level 2' ? 22 : 24, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Payment Details</Text>
            <ScrollView style={styles.content}>
                {/* Credit Card Option */}
                <TouchableOpacity
                    style={[
                        styles.methodOption,
                        { backgroundColor: selectedMethod === 'Mastercard' ? bgColor == 'Level 1' ? "#1D601A" : "#298825" : 'white' },
                    ]}
                    onPress={() => selectMethod('Mastercard')}>
                    <Image source={require('../../assets/Mastercard.png')} style={[styles.paymentIcon, { width: ies == 'Level 1' ? 30 : ies == 'Level 2' ? 33 : 36, height: ies == 'Level 1' ? 30 : ies == 'Level 2' ? 33 : 36 }]} />

                    <Text style={{ fontSize: fSize == 'Level 1' ? 18 : fSize == 'Level 2' ? 22 : 24, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }}>Mastercard</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity
                    style={[
                        styles.methodOption,
                        { backgroundColor: selectedMethod === 'cash' ? bgColor == 'Level 1' ? "#1D601A" : "#298825" : 'white' },
                    ]}
                    onPress={() => selectMethod('Cash')}>
                    <Image source={require('../../assets/Cash.png')} style={[styles.paymentIcon, { width: ies == 'Level 1' ? 30 : ies == 'Level 2' ? 33 : 36, height: ies == 'Level 1' ? 30 : ies == 'Level 2' ? 33 : 36 }]} />
                    <Text style={{ fontSize: fSize == 'Level 1' ? 18 : fSize == 'Level 2' ? 22 : 24, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }}>Cash On Delivery</Text>
                </TouchableOpacity>
                {/* Mobile Payment Option */}

                <View style={styles.divider} />

                {/* Cash On Delivery Option */}
                <TouchableOpacity
                    style={[
                        styles.methodOption,
                        { backgroundColor: selectedMethod === 'VISA' ? bgColor == 'Level 1' ? "#1D601A" : "#298825" : 'white' },
                    ]}
                    onPress={() => selectMethod('Visa')}>
                    <Image source={require('../../assets/Visa.png')} style={[styles.paymentIcon, { width: ies == 'Level 1' ? 30 : ies == 'Level 2' ? 33 : 36, height: ies == 'Level 1' ? 30 : ies == 'Level 2' ? 33 : 36 }]} />
                    <Text style={{ fontSize: fSize == 'Level 1' ? 18 : fSize == 'Level 2' ? 22 : 24, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }}>VISA</Text>
                </TouchableOpacity>
                <View style={styles.divider} />

            </ScrollView>
            <TouchableOpacity style={[styles.agreeButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={handleContinue} >
                <Text style={[styles.agreeButtonText, {
                    paddingVertical: ies == 'Level 1' ? 8 : ies == 'Level 2' ? 10 : 12,
                    paddingHorizontal: ies == 'Level 1' ? 22 : ies == 'Level 2' ? 26 : 30,
                    fontSize: ies == 'Level 1' ? 16 : ies == 'Level 2' ? 18 : 20,
                    color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'white' : '#0000CC'
                }]}>Confirm</Text>
            </TouchableOpacity>
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
    DeliveryTitle: {
        paddingTop: 15,
        paddingLeft: 30,
        fontWeight: 'bold',
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

    agreeButton: {
        backgroundColor: '#D00202', // Adjust the button color to match the design
        borderRadius: 25,
        paddingVertical: 10,
        width: '85%',

        alignSelf: 'center',
        marginTop: 20,

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
        top: 25, // Adjust the position as needed
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

export default PaymentMethod;
