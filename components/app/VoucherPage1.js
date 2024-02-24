import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getItem, setItem } from '../utils/asyncStorage';
import { Ionicons } from '@expo/vector-icons';
const VoucherPage1 = ({ navigation }) => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [bgColor, setBgColor] = useState('Level 1');
    const [ies, setIES] = useState('Level 1');
    const [iers, setIERS] = useState('Level 1');
    const [fColor, setFColor] = useState('Level 1');
    const [fSize, setFSize] = useState('Level 1');
    const [cdl, setCDL] = useState('Level 1');
    const [loadingScreen, setLoadingScreen] = useState(false);

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


    };

    const selectMethod = (method) => {
        setSelectedMethod(method);
    };

    const vouchers = [
        { id: '1', title: '50% Exclusive promo', vouchersLeft: 2, minimumPurchase: 800, discount: 50 },
        { id: '2', title: '20% Senior Discount', vouchersLeft: 2, minimumPurchase: 800, discount: 20 },
        { id: '3', title: '5% Exclusive promo', vouchersLeft: 2, minimumPurchase: 800, discount: 5 },
        // ... more voucher data ...
    ];

    const SaveVoucher = async (updatedCart, discount) => {
        setItem('voucherApplied', `${updatedCart}`);
        setItem('voucherDiscount', `${discount}`);
        navigation.navigate('RepeatOrder2');
    };


    const VoucherItem = ({ title, vouchersLeft, minimumPurchase, discount }) => (
        <TouchableOpacity style={styles.card} onPress={() => SaveVoucher(title, discount)}>
            <View style={styles.iconContainer}>
                <Image source={require('../../assets/voucher.png')} style={styles.paymentIcon} />
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.title, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>{title}</Text>
                <Text style={[styles.details, { fontSize: fSize == 'Level 1' ? 14 : fSize == 'Level 2' ? 16 : 20, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>
                    <Ionicons name="alarm-outline" size={fSize == 'Level 1' ? 18 : fSize == 'Level 2' ? 20 : 22} color="#F4D03F" /> {vouchersLeft} vouchers left
                </Text>
                <Text style={[styles.details, { fontSize: fSize == 'Level 1' ? 14 : fSize == 'Level 2' ? 16 : 20, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>With minimum purchase of {minimumPurchase} pesos blah blah</Text>
            </View>
        </TouchableOpacity>
    );




    const handleContinue = () => {

        setItem('VoucherPage', selectedMethod);

        navigation.goBack();
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
                <TouchableOpacity onPress={() => { navigation.goBack(); }} style={[styles.backButton, { backgroundColor: 'white', padding: ies == 'Level 1' ? 10 : 'Level 2' ? 11 : 12 }]}>
                    {iers == <Ionicons name="chevron-back" size={ies == 'Level 1' ? 14 : 'Level 2' ? 16 : 18} color={bgColor == 'Level 1' ? "#1D601A" : "#298825"} />}
                    <Text style={[styles.backText, { fontSize: ies == 'Level 1' ? 12 : 'Level 2' ? 14 : 16, color: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.titleText}>Available Voucher</Text>
            </View>
            <Text style={[styles.DeliveryTitle, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Apply Voucher</Text>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.searchContainer} >

                <TextInput
                    placeholder="Search Voucher"
                    style={styles.searchInput}
                    readOnly={true}
                />

                <Ionicons name="ticket" size={20} color="#000" style={styles.filterIcon} />

            </TouchableOpacity>
            <FlatList
                data={vouchers}
                renderItem={({ item }) => <VoucherItem {...item} />}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
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
        paddingLeft: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black', // Adjust the font color to match the design
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
        width: 80, // Set the width as needed
        height: 80, // Set the height as needed
        marginRight: 10, // Add some spacing between the icon and the text
    },
    agreeButtonText: {
        fontSize: 18,
        color: '#fff', // Adjust the font color to match the design
        textAlign: 'center',
    },
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        marginVertical: 5,
        marginHorizontal: 15,
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 2,
        marginHorizontal: 15,
        borderColor: 'grey',
        borderRadius: 10,
        paddingHorizontal: 10,

        marginVertical: 5,
        justifyContent: 'space-between',

    },
    searchInput: {
        flex: 1,
        paddingVertical: 5,
        paddingLeft: 10,
        paddingRight: 5,
        fontSize: 14,
        color: 'black',
        width: '100%',
    },
    searchicon: {
        padding: 5,
        color: 'grey'
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 8,
        elevation: 1, // for Android shadow
        shadowColor: '#000', // for iOS shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    iconContainer: {
        // Styling for the icon container if needed
        marginRight: 16,
        alignContent: 'center',
        justifyContent: 'center',

    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    details: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,

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

export default VoucherPage1;
