import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, TextInput, ActivityIndicator, FlatList, Image } from 'react-native';
import { getItem, setItem } from '../utils/asyncStorage';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { removeItem } from '../utils/asyncStorage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect hook


const CartPageScreen2 = ({ navigation }) => {
    const methodImages = {
        'VISA': require('../../assets/Visa.png'),
        'cash': require('../../assets/Cash.png'),
        'Mastercard': require('../../assets/Mastercard.png'),

    };
    const foodImages = {
        '../../assets/finalAssets/gpc_kennyRogers.png': require('../../assets/finalAssets/gpc_kennyRogers.png'),
        '../../assets/finalAssets/rc_kennyRogers.png': require('../../assets/finalAssets/rc_kennyRogers.png'),
        '../../assets/finalAssets/fs_kenyRogers.png': require('../../assets/finalAssets/fs_kenyRogers.png'),
        '../../assets/finalAssets/blt_subway.png': require('../../assets/finalAssets/blt_subway.png'),
        '../../assets/finalAssets/cb_subway.png': require('../../assets/finalAssets/cb_subway.png'),
        '../../assets/finalAssets/rb_subway.png': require('../../assets/finalAssets/rb_subway.png'),
        '../../assets/finalAssets/tuna_subway.png': require('../../assets/finalAssets/tuna_subway.png'),
        '../../assets/finalAssets/bcp_projuice.png': require('../../assets/finalAssets/bcp_projuice.png'),
        '../../assets/finalAssets/cs_projuice.png': require('../../assets/finalAssets/cs_projuice.png'),
        '../../assets/finalAssets/eq_projuice.png': require('../../assets/finalAssets/eq_projuice.png'),
        '../../assets/finalAssets/ls_projuice.png': require('../../assets/finalAssets/ls_projuice.png'),
        '../../assets/finalAssets/tc_projuice.png': require('../../assets/finalAssets/tc_projuice.png'),
        '../../assets/finalAssets/bpb_thaiMango.png': require('../../assets/finalAssets/bpb_thaiMango.png'),
        '../../assets/finalAssets/cpt_thaiMango.png': require('../../assets/finalAssets/cpt_thaiMango.png'),
        '../../assets/finalAssets/spt_thaiMango.png': require('../../assets/finalAssets/spt_thaiMango.png'),
        '../../assets/finalAssets/tfc_thaiMango.png': require('../../assets/finalAssets/tfc_thaiMango.png'),
        '../../assets/finalAssets/tss_thaiMango.png': require('../../assets/finalAssets/tss_thaiMango.png'),
    };

    const renderItem = ({ item }) => <OrderItem item={item} />;
    const [address, setAddress] = useState(''); // Set the fullName from the passed param or default to empty
    const [label, setLabel] = useState('');
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("Visa");
    const [paymentImage, setPaymentImage] = useState("Visa");
    const [totalPrice, setTotalPrice] = useState(0);
    const [voucher, setVoucher] = useState("");
    const [discount, setDiscount] = useState("");
    const [finalPrice, setFinalPrice] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0);

    const [bgColor, setBgColor] = useState('Level 1');
    const [ies, setIES] = useState('Level 1');
    const [iers, setIERS] = useState('Level 1');
    const [fColor, setFColor] = useState('Level 1');
    const [fSize, setFSize] = useState('Level 1');
    const [cdl, setCDL] = useState('Level 1');
    const [loadingScreen, setLoadingScreen] = useState(false);

    const fetchData = async () => {

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
                setAddress(add);

                const lat = await getItem('latitude');
                const long = await getItem('longitude');

                const vouch = await getItem('voucherApplied');
                setVoucher(vouch);

                const disc = await getItem('voucherDiscount');
                setDiscount(disc);

                const cartString = await getItem('cartDetails');
                if (!cartString) {
                    console.log("no cart");
                } else {
                    const cartJson = JSON.parse(cartString);
                    setCart(cartJson);
                    console.log(cartJson);
                    let totalP = 0;
                    cartJson.forEach(item => {
                        const itemPrice = parseFloat(item.price) * parseInt(item.quantity);
                        totalP += itemPrice;
                    });

                    console.log(
                        `fetchin ${totalP}`
                    );
                    const finalP = totalP + 20;
                    let discount = disc;
                    const finaldiscount = parseFloat(finalP) * parseFloat(`0.${discount}`);
                    const finalAmount = parseFloat(finalP) - finaldiscount;
                    setDiscountPrice(finalAmount);
                    setFinalPrice(finalP);
                    setTotalPrice(totalP);
                }

                const methodString = await getItem('paymentMethod');
                setPaymentImage(methodString);
                setPaymentMethod(methodString);


                setLatitude(parseFloat(lat));
                setLongitude(parseFloat(long));
                setLoadingScreen(false);
            } catch (error) {
                console.error('Failed to load data', error);
                setLoadingScreen(false);
            }
        }, 100);


    };


    useFocusEffect(
        React.useCallback(() => {
            setLoadingScreen(true);
            fetchData();
        }, [])
    );


    useEffect(() => {
        setLoadingScreen(true);
        fetchData();
    }, []);



    const removeAsync = () => {

        try {
            setItem('PrevCartDetails', JSON.stringify(cart));
            removeItem('cartDetails');
            removeItem('totalQuantity');
            removeItem('totalPrice');
            removeItem('voucherApplied');
            removeItem('voucherDiscount');
            navigation.navigate('Homepage');
        } catch (error) {
            console.log(error)
        }
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

    const OrderItem = ({ item }) => {
        const [isSelectorVisible, setSelectorVisible] = useState(false);
        const [quantity, setQuantity] = useState(item.quantity);
        const [price, sePrice] = useState(item.price);
        const [itemName, setItemName] = useState(item.name);
        const total = parseFloat(price) * parseInt(quantity);
        return (
            <View style={styles.itemContainer}>

                <TouchableOpacity style={[styles.quantityContainer, { width: ies == 'Level 1' ? 42 : ies == 'Level 2' ? 46 : 50, height: ies == 'Level 1' ? 31 : ies == 'Level 2' ? 33 : 35 }]} onPress={() => {

                    if (isSelectorVisible) {
                        const newCart = cart.map((item) => {
                            if (item.name === itemName) {
                                return { ...item, quantity: quantity };
                            }
                            return item;
                        });
                        let newTotal = newCart.reduce((acc, item) => acc + item.quantity * item.price, 0);
                        const finaldiscount = parseFloat(newTotal) * parseFloat(`0.${discount}`);
                        const finalAmount = parseFloat(newTotal) - finaldiscount;
                        setDiscountPrice(finalAmount + 20);
                        console.log(newCart);
                        setCart(newCart);
                        setTotalPrice(newTotal);
                        setFinalPrice(newTotal + 20);


                    }

                    setSelectorVisible(!isSelectorVisible)


                }} >
                    <Text style={[styles.quantityText, { fontSize: ies == 'Level 1' ? 12 : ies == 'Level 2' ? 14 : 16 }]}>{quantity}</Text>
                    <Ionicons name="chevron-down-outline" size={ies == 'Level 1' ? 12 : ies == 'Level 2' ? 14 : 16} color="red" />
                </TouchableOpacity>
                {isSelectorVisible && (
                    <QuantitySelector quantity={quantity} setQuantity={setQuantity} price={item.name} />
                )}
                <Image source={foodImages[item.imagePath]} style={styles.itemImage} />
                <Text style={[styles.itemName, { fontSize: fSize == 'Level 1' ? 12 : fSize == 'Level 2' ? 14 : 16, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>{item.name}</Text>
                <Text style={[styles.itemPrice, { fontSize: fSize == 'Level 1' ? 12 : fSize == 'Level 2' ? 14 : 16, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>{`₱${total.toFixed(2)}`}</Text>
            </View >
        );
    };

    const QuantitySelector = ({ quantity, setQuantity, name }) => {
        return (
            <View style={styles.quantitySelector}>

                <TouchableOpacity onPress={() => {

                    setQuantity(Math.max(1, quantity - 1))


                }} style={styles.quantityButton}>
                    <Ionicons name="remove-outline" size={20} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    setQuantity(Math.max(1, quantity + 1))

                }} style={styles.quantityButton}>
                    <Ionicons name="add-outline" size={20} color="black" />
                </TouchableOpacity>
            </View>
        );
    };


    const renderFooter = () => (

        <View>
            <View style={styles.OrderSummaryHeader}>
                <Text style={[[styles.subtotal, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }], { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Subtotal</Text>
                <TouchableOpacity >
                    <Text style={[[styles.subtotal, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }], { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱{totalPrice}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.OrderSummaryHeader}>
                <Text style={[[styles.subtotal, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }], { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Voucher Discount</Text>
                <TouchableOpacity >
                    <Text style={[[styles.subtotal, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }], { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>{discount}%</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.OrderSummaryHeader}>
                <Text style={[[styles.subtotal, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }], { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Delivery Fee</Text>
                <TouchableOpacity >
                    <Text style={[[styles.subtotal, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }], { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱20</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            <View style={styles.OrderSummaryHeader}>
                <Text style={[styles.DeliveryTitle, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Payment Details</Text>
                <TouchableOpacity onPress={() => { navigation.navigate('PaymentMethod'); }} >
                    <Text style={[styles.addItemsTitlle, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? '#AD0202' : '#0000CC' }]}>Change Payment</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.itemContainer1}>

                <Image source={methodImages[paymentImage]} style={styles.paymentImage} />
                <Text style={[styles.paymentName, { fontSize: fSize == 'Level 1' ? 16 : fSize == 'Level 2' ? 18 : 20 }]}>{paymentMethod}</Text>

            </View>


        </View>
    );


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
                <Text style={styles.titleText}>Cart Page</Text>
            </View>
            <View style={styles.content}>
                <Text style={[styles.DeliveryTitle, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Delivery address</Text>
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
                    onPress={() => { navigation.navigate('EditDeliveryAddress'); }} // Add this onPress event handler
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

                <Text style={[styles.DeliveryTitle, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Apply Voucher</Text>
                <View style={styles.divider} />
                <TouchableOpacity style={[styles.locationButton, { borderColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} >
                    <Text style={[styles.locationButtonText, { paddingVertical: ies == 'Level 2' ? 4 : 0, color: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]}>{voucher}</Text>
                </TouchableOpacity>
                <View style={styles.OrderSummaryHeader}>
                    <Text style={[styles.DeliveryTitle, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Order Summary</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('Homepage') }}>
                        <Text style={[styles.addItemsTitlle, { fontSize: fSize == 'Level 1' ? 12 : 14, }]}>Add Items</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={cart}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name}
                    style={styles.list}
                    ListFooterComponent={renderFooter}

                />



            </View>

            <View style={styles.placeOrder}>
                <Text style={[styles.origPrice, { fontSize: fSize == 'Level 1' ? 12 : fSize == 'Level 2' ? 14 : 16, color: 'grey' }]}>₱{finalPrice}</Text>
                <View style={styles.OrderSummaryHeader1}>
                    <Text style={[styles.totalTitle, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Total</Text>
                    <TouchableOpacity >
                        <Text style={[styles.bill, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱{discountPrice}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.agreeButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={removeAsync} >
                    <Text style={[styles.agreeButtonText, {
                        paddingVertical: ies == 'Level 1' ? 8 : ies == 'Level 2' ? 10 : 12,
                        paddingHorizontal: ies == 'Level 1' ? 22 : ies == 'Level 2' ? 26 : 30,
                        fontSize: ies == 'Level 1' ? 16 : ies == 'Level 2' ? 18 : 20,
                        color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'white' : '#0000CC'
                    }]}>Place Order</Text>
                </TouchableOpacity>
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
    OrderSummaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',

        paddingBottom: 5,

    },
    OrderSummaryHeader1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingHorizontal: 10
    },
    map: {
        width: '100%',
        height: '22%',
        marginBottom: 15,
    },
    list: {
        // Style for FlatList
        flexGrow: 1, // Ensures that the container can grow to fit the content
        height: 200

    },
    DeliveryTitle: {
        paddingVertical: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black', // Adjust the font color to match the design
    },
    VoucherTitle: {
        paddingVertical: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black', // Adjust the font color to match the design
    },
    titleText: {
        paddingVertical: 20,


        fontSize: 26,
        fontWeight: 'bold',
        color: 'white', // Adjust the font color to match the design
    },
    orderSummaryTitile: {

        fontSize: 16,
        fontWeight: 'bold',
        color: 'black', // Adjust the font color to match the design
    },
    subtotal: {

        fontSize: 16,
        fontWeight: 'bold',
        color: 'black', // Adjust the font color to match the design
    },
    origPrice: {
        fontSize: 12,
        fontWeight: 'normal',
        paddingRight: 10,
        textDecorationLine: 'line-through',
        textAlign: 'right',
        color: 'grey', // Adjust the font color to match the design
    },
    bill: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black', // Adjust the font color to match the design
    },
    totalTitle: {

        fontSize: 18,
        fontWeight: 'normal',
        color: 'black', // Adjust the font color to match the design
    },
    addItemsTitlle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#AD0202', // Adjust the font color to match the design
    },
    content: {
        paddingHorizontal: 20,


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
        borderRadius: 10,
        paddingVertical: 5,
        width: '85%',

        borderWidth: 2,
        alignSelf: 'center',
        marginVertical: 10,

    },
    agreeButton: {

        marginHorizontal: 40,
        marginVertical: 10,
        borderRadius: 25,

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
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    locationButtonText: {
        fontSize: 18,
        color: '#D00202', // Adjust the font color to match the design
        textAlign: 'center',
    },
    divider: {
        borderBottomColor: '#EEEEEE',
        borderBottomWidth: 3,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: '#F5F5F5',
        borderRadius: 15,
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
    filterIcon: {
        padding: 5,
        color: '#9E9E9E'
    },
    itemContainer: {
        // Style for each order item container
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    quantitySelector: {
        flexDirection: 'row',

        marginLeft: 10,


    },
    quantityContainer: {
        // Style for the quantity container
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        padding: 5,
        width: 50,
        alignContent: 'center',
        justifyContent: 'center',
        height: 35,
        elevation: 3,
        backgroundColor: 'white'
    },
    quantityButton: {
        // Style for the quantity container

        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        padding: 5,
        width: 35,
        alignContent: 'center',
        justifyContent: 'center',
        height: 35,
        elevation: 3,
        backgroundColor: 'white'
    },
    quantityText: {
        // Style for the quantity text
        marginRight: 5

    },
    itemName: {
        // Style for the item name
        width: 125,
        fontSize: 14,
        marginRight: 20
    },
    paymentName: {
        // Style for the item name
        width: 125,
        fontSize: 16,

    },
    itemPrice: {
        // Style for the item price
    },
    itemImage: {
        // Style for the item image
        width: 50, // Adjust the size accordingly
        height: 50, // Adjust the size accordingly
        borderRadius: 15, // If you want rounded corners
        marginLeft: 10,
        marginRight: 10
    },
    paymentImage: {
        // Style for the item image
        width: 35, // Adjust the size accordingly
        height: 35, // Adjust the size accordingly

        marginLeft: 10,
        marginRight: 10
    },
    placeOrder: {
        flexDirection: 'column',

        paddingHorizontal: 14,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e2e2e2',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    loadingText: {
        paddingTop: 20,
        paddingBottom: 5,
        fontSize: 22,
        fontWeight: 'bold',

    },

    itemContainer1: {
        // Style for each order item container
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        marginTop: 5,
        marginBottom: 40

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

export default CartPageScreen2;
