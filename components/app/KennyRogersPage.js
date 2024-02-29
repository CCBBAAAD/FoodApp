import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getItem } from '../utils/asyncStorage';
import { setItem } from '../utils/asyncStorage';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
const KennyRogersPage = ({ navigation }) => {
    const scrollRef = useRef();
    const [popularPosition, setPopularPosition] = useState(81.5);

    const [checkCart, setCheckCart] = useState(false); // Set the fullName from the passed param or default to empty
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [highlightedCategory, setHighlightedCategory] = useState('Popular');
    // Add more state for other positions as needed

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


    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = (event) => {
        const scrollOffset = event.nativeEvent.contentOffset.y;
        setIsScrolled(scrollOffset > 0);


    };

    useEffect(() => {
        setLoadingScreen(true);
        fetchData();
    }, []);

    const fetchData = async () => {
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

            const cartString = await getItem('cartDetails');
            if (!cartString) {
                console.log("no cart");
            } else {
                console.log(cartString);
                const cart = JSON.parse(cartString);
                let totalQ = 0;
                let Price = 0;
                cart.forEach(item => {
                    totalQ += item.quantity;
                    Price += (item.quantity * item.price)
                });

                setTotalPrice(Price);
                setTotalQuantity(totalQ);
                setCheckCart(true);

            }

            setLoadingScreen(false);
        } catch (error) {
            console.log(error);
        }
    }

    const addToCard = async (itemName, price, imagePath, quantity) => {

        try {


            const item = {
                "name": itemName,
                "price": price,
                "imagePath": imagePath,
                "quantity": quantity
            };

            // Get cartDetails from storage and parse it
            let cartDetailsString = await getItem('cartDetails');

            let cartDetails = cartDetailsString ? JSON.parse(cartDetailsString) : [];

            // If cartDetails doesn't exist, initialize it with an array containing the new item
            if (!cartDetailsString) {
                await setItem('cartDetails', JSON.stringify([item]));

            } else {
                // Check if an item with the same name already exists in cartDetails


                let itemExists = false;
                console.log(cartDetails);
                cartDetails = cartDetails.map(existingItem => {
                    if (existingItem.name === itemName) {
                        // Update quantity and price if the item already exists
                        existingItem.quantity += quantity;
                        existingItem.price += price;
                        itemExists = true;
                    }
                    return existingItem;
                });

                // If the item doesn't exist, add it to cartDetails
                if (!itemExists) {
                    cartDetails.push(item);
                }

                // Update cartDetails in storage after stringify
                await setItem('cartDetails', JSON.stringify(cartDetails));
            }



            fetchData();
        } catch (error) {
            console.log(error)
        }
    };


    if (loadingScreen) {
        return <View style={styles.loadingContainer}>
            <Text style={[styles.loadingText, { color: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]}>Loading!</Text>
            <ActivityIndicator size="large" color={bgColor == 'Level 1' ? "#1D601A" : "#298825"} />
        </View>
    }

    return (
        <View style={{ flex: 1 }}>
            <Image source={require('../../assets/finalAssets/kennyRoger.png')} style={styles.backgroundImage} />
            <TouchableOpacity onPress={() => { navigation.navigate('Homepage'); }} style={[styles.backButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", padding: ies == 'Level 1' ? 10 : 'Level 2' ? 11 : 12 }]}>
                <Ionicons name="chevron-back" size={14} color={fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'white' : '#0000CC'} />
                {iers == 'Level 2' && <Text style={[styles.backText, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'white' : '#0000CC' }]}>Back</Text>}
            </TouchableOpacity>
            <View style={[styles.detailsContainer, { marginTop: isScrolled ? 100 : 200 }]} >
                <View style={styles.header}>
                    <Text style={[styles.restaurantName, { color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Kenny Roger - Taft Avenue</Text>
                    <Ionicons name="star" size={14} color="#F7C942" />
                    <Text style={styles.rating}>4.8</Text>
                </View>
                {/* Categories */}
                <View style={styles.categories}>
                    <TouchableOpacity onPress={() => scrollToCategory(popularPosition, 'Popular')}>
                        <Text style={[styles.category, { borderBottomWidth: highlightedCategory == 'Popular' ? 2 : 0, borderBottomColor: highlightedCategory == 'Popular' ? '#298825' : '#EDFFEF', color: highlightedCategory == 'Popular' ? '#298825' : 'black', }]}>Popular</Text>
                    </TouchableOpacity>

                </View>
                <ScrollView ref={scrollRef} onScroll={handleScroll}
                    scrollEventThrottle={0} >
                    <Text style={[styles.sectionTitle, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}
                        onLayout={(event) => {
                            setPopularPosition(event.nativeEvent.layout.y);
                        }} >
                        Popular</Text>
                    <View style={styles.OptionTopRow}>
                        <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('RcKennyRogers'); }} >
                            <Image source={require('../../assets/finalAssets/rc_kennyRogers.png')} style={styles.itemImage} resizeMode="cover" />
                            <TouchableOpacity style={[styles.addButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { addToCard(cdl == 'Level 1' ? "Roasted Chicken with Side Dish, Rice, and Muffin" : 'Level 2' ? "Classic Roasted Chicken with 1 Side Dish, Rice, and Muffin" : "1/4 Classic Roasted Chicken with 1 Regular Side Dish, 1 Cup of Rice,and 1 Muffin", 250, "../../assets/finalAssets/rc_kennyRogers.png", 1) }} >
                                <Ionicons name="add" size={ies == 'Level 1' ? 18 : 'Level 2' ? 22 : 26} color="white" />
                            </TouchableOpacity>
                            <View style={styles.itemDetails}>
                                <Text style={[styles.quantity, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱250</Text>
                                {cdl == 'Level 1' && <Text style={[styles.title, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Roasted Chicken with Side Dish, Rice, and Muffin</Text>}
                                {cdl == 'Level 2' && <Text style={[styles.title, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Classic Roasted Chicken with 1 Side Dish, Rice, and Muffin</Text>}
                                {cdl == 'Level 3' && <Text style={[styles.title, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>1/4 Classic Roasted Chicken with 1 Regular Side Dish, 1 Cup of Rice,and 1 Muffin</Text>}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('GPCKennyRogers'); }} >
                            <Image source={require('../../assets/finalAssets/gpc_kennyRogers.png')} style={styles.itemImage} resizeMode="cover" />
                            <TouchableOpacity style={[styles.addButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { addToCard(cdl == 'Level 1' ? "Chimichurri Grilled Pork Chop with Rice, Side Dishes, and Muffin" : 'Level 2' ? "Pork Chop with Chimichurri Sauce, Rice, Side Dishes, and Muffin" : "Grilled Marinated Pork Chop with Chimichurri Sauce, 1 Cup of Rice, 2Side Dishes, and 1 Muffin", 440, "../../assets/finalAssets/gpc_kennyRogers.png", 1) }} >
                                <Ionicons name="add" size={ies == 'Level 1' ? 18 : 'Level 2' ? 22 : 26} color="white" />
                            </TouchableOpacity>
                            <View style={styles.itemDetails}>
                                <Text style={[styles.quantity, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱440</Text>
                                {cdl == 'Level 1' && <Text style={[styles.title, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Chimichurri Grilled Pork Chop with Rice, Side Dishes, and Muffin</Text>}
                                {cdl == 'Level 2' && <Text style={[styles.title, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Pork Chop with Chimichurri Sauce, Rice, Side Dishes, and Muffin</Text>}
                                {cdl == 'Level 3' && <Text style={[styles.title, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Grilled Marinated Pork Chop with Chimichurri Sauce, 1 Cup of Rice, 2Side Dishes, and 1 Muffin</Text>}
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.OptionTopRow}>
                        <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('FsKennyRogers'); }} >
                            <Image source={require('../../assets/finalAssets/fs_kenyRogers.png')} style={styles.itemImage} resizeMode="cover" />
                            <TouchableOpacity style={[styles.addButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { addToCard(cdl == 'Level 1' ? "Breaded Fish Fillet Sandwich" : 'Level 2' ? "Crispy Air-Fried Breaded Fish Fillet Sandwich" : "Crispy Air-Fried Breaded Fish Fillet with Dill Tartar, Lettuce, and TomatoSandwich", 260, "../../assets/finalAssets/fs_kenyRogers.png", 1) }} >
                                <Ionicons name="add" size={ies == 'Level 1' ? 18 : 'Level 2' ? 22 : 26} color="white" />
                            </TouchableOpacity>
                            <View style={styles.itemDetails}>
                                <Text style={[styles.quantity, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱260</Text>
                                {cdl == 'Level 1' && <Text style={[styles.title, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Breaded Fish Fillet Sandwich</Text>}
                                {cdl == 'Level 2' && <Text style={[styles.title, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Crispy Air-Fried Breaded Fish Fillet Sandwich</Text>}
                                {cdl == 'Level 3' && <Text style={[styles.title, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Crispy Air-Fried Breaded Fish Fillet with Dill Tartar, Lettuce, and TomatoSandwich</Text>}
                            </View>
                        </TouchableOpacity>
                    </View>




                </ScrollView>
                {checkCart == true && <TouchableOpacity style={[styles.addToCartButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", }]} onPress={() => { navigation.navigate('CartPageScreen1'); }} >
                    <View style={styles.firstPart} >
                        <Text style={styles.addToCartText}>Basket • </Text>
                        <Text style={styles.addToCartText}>{totalQuantity}</Text>
                        <Text style={styles.addToCartText}> Item </Text>
                    </View>
                    <View style={styles.SecondPart} >
                        <Text style={styles.addToCartText}> ₱</Text>
                        <Text style={styles.addToCartText}> {totalPrice}</Text>
                    </View>
                </TouchableOpacity>}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        aspectRatio: 2.5, // Adjust the aspect ratio based on your image
        position: 'absolute',
    },

    backButton: {
        position: 'absolute',
        top: 40, // Adjust the position as needed
        left: 10,
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
    detailsContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    restaurantName: {
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10,
    },
    rating: {
        marginLeft: 5,
        fontSize: 16
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    category: {
        fontWeight: 'bold',
        // additional styles
    },
    sectionTitle: {
        fontWeight: 'bold',

        marginLeft: 20,
        marginBottom: 5

    },
    OptionTopRow: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start'
    },
    item: {
        backgroundColor: '#F2F2F2',
        borderRadius: 20,
        width: '48%', // Two columns, adjust for spacing
        marginVertical: 10,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,

    },
    itemImage: {
        width: '100%',
        height: 140,
        borderRadius: 10,
    },
    addButton: {
        position: 'absolute',
        right: 5,
        top: 95,
        borderRadius: 100,
        padding: 8,
    },
    quantity: {
        paddingVertical: 5,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',

    },
    quantity: {
        paddingVertical: 5,
        textAlign: 'center',
        fontWeight: 'bold',

    },
    itemDetails: {
        flexDirection: 'column'
    },
    title: {
        fontWeight: 'normal',
        paddingBottom: 10,
        textAlign: 'center'
    },
    addToCartButton: {
        position: 'absolute',
        right: 20,
        bottom: 10,
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: 320,
        height: 50,
        backgroundColor: 'black',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    firstPart: {
        flexDirection: 'row'
    },
    SecondPart: {
        flexDirection: 'row'
    },
    addToCartText: {
        fontSize: 16,
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },

    loadingText: {
        paddingTop: 20,
        paddingBottom: 5,
        fontSize: 22,
        fontWeight: 'bold',

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
    // ... additional styles for dishes and other elements
});
export default KennyRogersPage;
