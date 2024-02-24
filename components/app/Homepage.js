
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Modal, FlatList, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getItem } from '../utils/asyncStorage';
import { setItem } from '../utils/asyncStorage';
import { removeItem } from '../utils/asyncStorage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect hook
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Roboto_400Regular } from '@expo-google-fonts/roboto'

const Homepage = ({ navigation }) => {
    const [checkCart, setCheckCart] = useState(false); // Set the fullName from the passed param or default to empty
    const [firstName, setFirstName] = useState(''); // Set the fullName from the passed param or default to empty
    const [address, setAddress] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [loadingScreen, setLoadingScreen] = useState(false);
    const [hasPrevCart, setHasPrevCart] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
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
    });


    const restaurants = [
        {
            name: 'Subway',
            location: 'Taft Avenue',
            image: require('../../assets/finalAssets/subway.png'), // Replace with your local image
            rating: '4.8',
        },
        {
            name: 'Thai Mango',
            location: 'Taft Avenue',
            image: require('../../assets/finalAssets/thaiMango.png'), // Replace with your local image
            rating: '4.7',
        },
        {
            name: 'Projuice',
            location: 'Taft Avenue',
            image: require('../../assets/finalAssets/projuice.png'), // Replace with your local image
            rating: '4.5',
        },

        {
            name: 'Kenny Rogers',
            location: 'Taft Avenue',
            image: require('../../assets/finalAssets/kennyRoger.png'), // Replace with your local image
            rating: '4.6',
        },
        {
            name: 'Subway',
            location: 'Taft Avenue',
            image: require('../../assets/finalAssets/subway.png'), // Replace with your local image
            rating: '4.8',
        },
        {
            name: 'Thai Mango',
            location: 'Taft Avenue',
            image: require('../../assets/finalAssets/thaiMango.png'), // Replace with your local image
            rating: '4.7',
        },
        {
            name: 'Projuice',
            location: 'Taft Avenue',
            image: require('../../assets/finalAssets/projuice.png'), // Replace with your local image
            rating: '4.5',
        },

        {
            name: 'Kenny Rogers',
            location: 'Taft Avenue',
            image: require('../../assets/finalAssets/kennyRoger.png'), // Replace with your local image
            rating: '4.6',
        },
        {
            name: 'Subway',
            location: 'Taft Avenue',
            image: require('../../assets/finalAssets/subway.png'), // Replace with your local image
            rating: '4.8',
        },
        {
            name: 'Thai Mango',
            location: 'Taft Avenue',
            image: require('../../assets/finalAssets/thaiMango.png'), // Replace with your local image
            rating: '4.7',
        },
        {
            name: 'Projuice',
            location: 'Taft Avenue',
            image: require('../../assets/finalAssets/projuice.png'), // Replace with your local image
            rating: '4.5',
        },

        {
            name: 'Kenny Rogers',
            location: 'Taft Avenue',
            image: require('../../assets/finalAssets/kennyRoger.png'), // Replace with your local image
            rating: '4.6',
        },
        {
            name: 'Subway',
            location: 'Taft Avenue',
            image: require('../../assets/finalAssets/subway.png'), // Replace with your local image
            rating: '4.8',
        },
        {
            name: 'Thai Mango',
            location: 'Taft Avenue',
            image: require('../../assets/finalAssets/thaiMango.png'), // Replace with your local image
            rating: '4.7',
        },
        {
            name: 'Projuice',
            location: 'Taft Avenue',
            image: require('../../assets/finalAssets/projuice.png'), // Replace with your local image
            rating: '4.5',
        },

        {
            name: 'Kenny Rogers',
            location: 'Taft Avenue',
            image: require('../../assets/finalAssets/kennyRoger.png'), // Replace with your local image
            rating: '4.6',
        },
        // ... more restaurants
    ];

    const saveSettings = () => {
        setModalVisible(false);
        console.log(fStyle);
        setItem('bgColor', bgColor);
        setItem('ies', ies);
        setItem('iers', iers);
        setItem('fColor', fColor);
        setItem('fSize', fSize);
        setItem('cdl', cdl);
        setItem('fStyle', fStyle);


    }

    const handleFabPress = () => {
        console.log('FAB Pressed!');
        // Handle FAB press action here
    };

    const fetchData = async () => {
        console.log("fetching");
        setTimeout(async () => {
            try {


                const bgColor1 = await getItem('bgColor');
                if (!bgColor1) {
                    console.log("no bgColor");
                } else {
                    setBgColor(bgColor1)
                }

                const fStyle1 = await getItem('fStyle');
                if (!fStyle1) {
                    console.log("no fStyle");
                } else {
                    console.log(fStyle1);
                    setFStyle(fStyle1)
                }

                const ies1 = await getItem('ies');
                if (!ies1) {
                    console.log("no ies");
                } else {
                    setIES(ies1)
                }

                const iers1 = await getItem('iers');
                if (!iers1) {
                    console.log("no iers");
                } else {
                    setIERS(iers1)
                }

                const fColor1 = await getItem('fColor');
                if (!fColor1) {
                    console.log("no fColor");
                } else {
                    setFColor(fColor1)
                }

                const fSize1 = await getItem('fSize');
                if (!fSize1) {
                    console.log("no fSize");
                } else {
                    setFSize(fSize1)
                }

                const cdl1 = await getItem('cdl');
                if (!cdl1) {
                    console.log("no cdl");
                } else {
                    setCDL(cdl1)
                }

                const fName = await getItem('firstname');
                setFirstName(fName);

                const add = await getItem('address');
                setAddress(add);

                const prevCartString = await getItem('PrevCartDetails');
                if (!prevCartString) {
                    console.log('no previous order');
                    setHasPrevCart(false);
                } else {
                    setHasPrevCart(true);
                    console.log('previous order available');
                }
                const cartString = await getItem('cartDetails');
                if (!cartString) {
                    console.log("no cart");
                    setLoadingScreen(false);
                    setCheckCart(false);
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
                    setLoadingScreen(false);

                }
            } catch (error) {
                console.log(error);
            }
        }, 2000);


    };

    useFocusEffect(
        React.useCallback(() => {
            setLoadingScreen(true);
            fetchData();
        }, [])
    );

    useEffect(() => {
        setLoadingScreen(true);
        fetchData(); // Function to fetch data
    }, []); // Run useEffect whenever navigation state changes


    const handleNavigateToRestaurant = (restaurantName) => {
        if (restaurantName == "Projuice") {
            navigation.navigate('ProjuiceScreen');
        } else if (restaurantName == "Subway") {
            navigation.navigate('SubwayPage');

        } else if (restaurantName == "Thai Mango") {
            navigation.navigate('ThaiMangoPage');

        } else if (restaurantName == "Kenny Rogers") {
            navigation.navigate('KennyRogersPage');

        }
    };

    const removeAsync = async () => {

        try {
            let cartDetailsString = await removeItem('cartDetails');
            let fetchTotalPrice = await removeItem('totalQuantity');
            let fetchTotalQuantity = await removeItem('totalPrice');
            fetchData(); // Function to fetch data
        } catch (error) {
            console.log(error)
        }
    };
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
                setItem('cartDetails', JSON.stringify([item]));

            } else {
                // Check if an item with the same name already exists in cartDetails


                let itemExists = false;
                console.log(cartDetails);
                cartDetails = cartDetails.map(existingItem => {
                    if (existingItem.name === itemName) {
                        // Update quantity and price if the item already exists
                        existingItem.quantity += quantity;

                        itemExists = true;
                    }
                    return existingItem;
                });

                // If the item doesn't exist, add it to cartDetails
                if (!itemExists) {
                    cartDetails.push(item);
                }

                // Update cartDetails in storage after stringify
                setItem('cartDetails', JSON.stringify(cartDetails));
            }



            // Store total quantity and total price in storage
            setItem('totalQuantity', `${totalQuantity}`);
            setItem('totalPrice', `${totalPrice}`);
            fetchData(); // Function to fetch data

        } catch (error) {
            console.log(error)
        }
    };


    const RestaurantCard = ({ name, location, image, rating }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleNavigateToRestaurant(name)} >
            <Image source={image} style={styles.cardImage} />
            < View style={styles.cardDetails} >
                <Text style={[styles.cardTitle, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 14 : fSize == 'Level 2' ? 16 : 18, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>{name} - {location}</Text>
                <View style={styles.cardRating}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={[styles.cardRatingText, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 14 : fSize == 'Level 2' ? 16 : 18, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>{rating}</Text>
                </View>

            </View>
        </TouchableOpacity>
    );

    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = (event) => {
        const scrollOffset = event.nativeEvent.contentOffset.y;
        setIsScrolled(scrollOffset > 0);
    };
    if (loadingScreen || !isFontStyleLoaded) {
        return <View style={styles.loadingContainer}>
            <Text style={[styles.loadingText, { color: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]}>Loading!</Text>
            <ActivityIndicator size="large" color={bgColor == 'Level 1' ? "#1D601A" : "#298825"} />
        </View>
    }


    return (
        <SafeAreaView style={styles.container}>

            {isScrolled == false && <View style={[styles.header, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", }]}>
                <Text style={[styles.titleText, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'white' : '#0000CC' }]}>Hello, Berna!</Text>
                <View style={styles.headerProgress}>

                    <Ionicons name="location-outline" size={16} color="white" marginTop={2} />
                    <Text style={[styles.progressText, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'white' : '#0000CC' }]}>Home selected</Text>

                </View>
                <TouchableOpacity style={[styles.searchContainer, { paddingVertical: ies == 'Level 2' ? 3 : 0, borderColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", }]} onPress={() => { navigation.navigate('SearchComponent'); }}>
                    <TextInput
                        placeholder="Search Restaurants."
                        style={[styles.searchInput, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}
                        editable={false}
                    />
                    {iers == 'Level 2' && <Ionicons name="search" size={20} color="#000" style={styles.searchicon} />}

                </TouchableOpacity>
            </View>}


            {isScrolled == true && <View style={[styles.headerScrolled, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", }]}>

                <TouchableOpacity style={[styles.searchContainerScrolled, { paddingVertical: ies == 'Level 2' ? 3 : 0, borderColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { navigation.navigate('SearchComponent'); }}>
                    <TextInput
                        placeholder="Search food items..."
                        style={[styles.searchInput, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}
                        editable={true}
                    />
                    {iers == 'Level 2' && <Ionicons name="search" size={20} color="#000" style={styles.searchicon} />}

                </TouchableOpacity>
            </View>}

            <ScrollView onScroll={handleScroll}
                scrollEventThrottle={0} >

                <View style={styles.HeaderOptionTopRow}>
                    <TouchableOpacity style={[styles.option, { paddingBottom: 25, paddingLeft: 15, paddingTop: 10, backgroundColor: '#E8FCE9', alignItems: 'start', justifyContent: 'start', alignContent: 'start', width: ies == 'Level 1' ? '42%' : '44%' }]} onPress={() => { if (hasPrevCart == true) { navigation.navigate('RepeatOrder1'); } }}>

                        <Text style={[styles.title2, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Repeat</Text>
                        <Text style={[styles.title2, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Last Order</Text>
                        {iers == 'Level 2' && <Image source={require('../../assets/lastMeal.png')} style={styles.image} resizeMode="contain" />}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.option, { paddingBottom: 25, paddingLeft: 15, paddingTop: 10, backgroundColor: '#FCE8FB', alignItems: 'start', justifyContent: 'start', alignContent: 'start', width: ies == 'Level 1' ? '42%' : '44%' }]} onPress={() => { navigation.navigate('ChooseCuisine'); }} >

                        <Text style={[styles.title2, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>New</Text>
                        <Text style={[styles.title2, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Dishes!</Text>
                        {iers == 'Level 2' && <Image source={require('../../assets/newDishes.png')} style={styles.image} resizeMode="contain" />}
                    </TouchableOpacity>

                </View>


                <View style={styles.HeaderOptionTopRow}>
                    <TouchableOpacity style={[styles.option, { paddingBottom: 25, paddingLeft: 15, paddingTop: 10, backgroundColor: '#E8F1FC', alignItems: 'start', justifyContent: 'start', alignContent: 'start', width: ies == 'Level 1' ? '42%' : '44%' }]} onPress={() => { navigation.navigate('ChooseRestaurant'); }} >

                        <Text style={[styles.title2, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Explore</Text>
                        <Text style={[styles.title2, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Restaurants</Text>
                        {iers == 'Level 2' && <Image source={require('../../assets/exploreRestaurants.png')} style={styles.image} resizeMode="contain" />}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.option, { paddingBottom: 25, paddingLeft: 15, paddingTop: 10, backgroundColor: '#FCF3E8', alignItems: 'start', justifyContent: 'start', alignContent: 'start', width: ies == 'Level 1' ? '42%' : '44%' }]} onPress={() => { navigation.navigate('EditDeliveryAddress'); }} >

                        <Text style={[styles.title2, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Delivery</Text>
                        <Text style={[styles.title2, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Address</Text>
                        {iers == 'Level 2' && <Image source={require('../../assets/deliveryAddress.png')} style={styles.image} resizeMode="contain" />}
                    </TouchableOpacity>

                </View>

                <Text style={[styles.Category, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 18 : fSize == 'Level 2' ? 20 : 22, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Restaurant</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollViewContainer}
                >
                    {restaurants.map((restaurant, index) => (
                        <RestaurantCard key={index} {...restaurant} />
                    ))}
                </ScrollView>
                <View style={styles.categoryTitle}>
                    <Text style={[styles.Category, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 18 : fSize == 'Level 2' ? 20 : 22, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Meals</Text>
                    <Text style={[styles.CategoryDescription, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>from Kenny Rogers!</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.OptionTopRow}>
                    <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('GPCKennyRogers'); }} >
                        <Image source={require('../../assets/finalAssets/gpc_kennyRogers.png')} style={styles.itemImage} resizeMode="cover" />
                        <TouchableOpacity style={[styles.addButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { addToCard(cdl == 'Level 1' ? "Chimichurri Grilled Pork Chop with Rice, Side Dishes, and Muffin" : 'Level 2' ? "Pork Chop with Chimichurri Sauce, Rice, Side Dishes, and Muffin" : "Grilled Marinated Pork Chop with Chimichurri Sauce, 1 Cup of Rice, 2Side Dishes, and 1 Muffin", 440, "../../assets/finalAssets/gpc_kennyRogers.png", 1) }} >
                            <Ionicons name="add" size={ies == 'Level 1' ? 18 : 'Level 2' ? 22 : 26} color="white" />
                        </TouchableOpacity>
                        <View style={styles.itemDetails}>
                            <Text style={[styles.quantity, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱440</Text>
                            {cdl == 'Level 1' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Chimichurri Grilled Pork Chop with Rice, Side Dishes, and Muffin</Text>}
                            {cdl == 'Level 2' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Pork Chop with Chimichurri Sauce, Rice, Side Dishes, and Muffin</Text>}
                            {cdl == 'Level 3' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Grilled Marinated Pork Chop with Chimichurri Sauce, 1 Cup of Rice, 2 Side Dishes, and 1 Muffin</Text>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('RcKennyRogers'); }} >
                        <Image source={require('../../assets/finalAssets/rc_kennyRogers.png')} style={styles.itemImage} resizeMode="cover" />
                        <TouchableOpacity style={[styles.addButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { addToCard(cdl == 'Level 1' ? "Roasted Chicken with Side Dish, Rice, and Muffin" : 'Level 2' ? "Classic Roasted Chicken with 1 Side Dish, Rice, and Muffin" : "1/4 Classic Roasted Chicken with 1 Regular Side Dish, 1 Cup of Rice,and 1 Muffin", 250, "../../assets/finalAssets/rc_kennyRogers.png", 1) }} >
                            <Ionicons name="add" size={ies == 'Level 1' ? 18 : 'Level 2' ? 22 : 26} color="white" />
                        </TouchableOpacity>
                        <View style={styles.itemDetails}>
                            <Text style={[styles.quantity, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱250</Text>
                            {cdl == 'Level 1' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Roasted Chicken with Side Dish, Rice, and Muffin</Text>}
                            {cdl == 'Level 2' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Classic Roasted Chicken with 1 Side Dish, Rice, and Muffin</Text>}
                            {cdl == 'Level 3' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>1/4 Classic Roasted Chicken with 1 Regular Side Dish, 1 Cup of Rice,and 1 Muffin</Text>}
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
                            <Text style={[styles.quantity, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱260</Text>
                            {cdl == 'Level 1' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Breaded Fish Fillet Sandwich</Text>}
                            {cdl == 'Level 2' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Crispy Air-Fried Breaded Fish Fillet Sandwich</Text>}
                            {cdl == 'Level 3' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Crispy Air-Fried Breaded Fish Fillet with Dill Tartar, Lettuce, and TomatoSandwich</Text>}
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.Category, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 18 : fSize == 'Level 2' ? 20 : 22, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Restaurant</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollViewContainer}
                >
                    {restaurants.map((restaurant, index) => (
                        <RestaurantCard key={index} {...restaurant} />
                    ))}
                </ScrollView>

                <View style={styles.categoryTitle}>
                    <Text style={[styles.Category, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 18 : fSize == 'Level 2' ? 20 : 22, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Meals</Text>
                    <Text style={[styles.CategoryDescription, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>from Subway!</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.OptionTopRow}>
                    <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('BLTSubway'); }} >
                        <Image source={require('../../assets/finalAssets/blt_subway.png')} style={styles.itemImage} resizeMode="cover" />
                        <TouchableOpacity style={[styles.addButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { addToCard(cdl == 'Level 1' ? "BLT Sandwich" : 'Level 2' ? "6” Bacon, Lettuce, and Tomato(BLT) Sandwich" : "6 inch Bacon, Lettuce, and Tomato(BLT) Sandwich", 245, "../../assets/finalAssets/blt_subway.png", 1) }} >
                            <Ionicons name="add" size={ies == 'Level 1' ? 18 : 'Level 2' ? 22 : 26} color="white" />
                        </TouchableOpacity>
                        <View style={styles.itemDetails}>
                            <Text style={[styles.quantity, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱245</Text>
                            {cdl == 'Level 1' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>BLT Sandwich</Text>}
                            {cdl == 'Level 2' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>6” Bacon, Lettuce, and Tomato(BLT) Sandwich</Text>}
                            {cdl == 'Level 3' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>6 inch Bacon, Lettuce, and Tomato(BLT) Sandwich</Text>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('CBSubway'); }} >
                        <Image source={require('../../assets/finalAssets/cb_subway.png')} style={styles.itemImage} resizeMode="cover" />
                        <TouchableOpacity style={[styles.addButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { addToCard(cdl == 'Level 1' ? "Chicken Breast Sandwich" : 'Level 2' ? "6” Chicken Breast Sandwich" : "6 inch Chicken Breast Sandwich", 210, "../../assets/finalAssets/cb_subway.png", 1) }} >
                            <Ionicons name="add" size={ies == 'Level 1' ? 18 : 'Level 2' ? 22 : 26} color="white" />
                        </TouchableOpacity>
                        <View style={styles.itemDetails}>
                            <Text style={[styles.quantity, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱210</Text>
                            {cdl == 'Level 1' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Chicken Breast Sandwich</Text>}
                            {cdl == 'Level 2' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>6” Chicken Breast Sandwich</Text>}
                            {cdl == 'Level 3' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>6 inch Chicken Breast Sandwich</Text>}
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={styles.OptionTopRow}>
                    <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('RBSubway'); }} >
                        <Image source={require('../../assets/finalAssets/rb_subway.png')} style={styles.itemImage} resizeMode="cover" />
                        <TouchableOpacity style={[styles.addButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { addToCard(cdl == 'Level 1' ? "Roast Beef Sandwich" : 'Level 2' ? "6” Roast beef Sandwich" : "6 inch Roast beef Sandwich", 245, "../../assets/finalAssets/rb_subway.png", 1) }} >
                            <Ionicons name="add" size={ies == 'Level 1' ? 18 : 'Level 2' ? 22 : 26} color="white" />
                        </TouchableOpacity>
                        <View style={styles.itemDetails}>
                            <Text style={[styles.quantity, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱245</Text>
                            {cdl == 'Level 1' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Roast Beef Sandwich</Text>}
                            {cdl == 'Level 2' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>6” Roast beef Sandwich</Text>}
                            {cdl == 'Level 3' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>6 inch Roast beef Sandwich</Text>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('TunaSubway'); }} >
                        <Image source={require('../../assets/finalAssets/tuna_subway.png')} style={styles.itemImage} resizeMode="cover" />
                        <TouchableOpacity style={[styles.addButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { addToCard(cdl == 'Level 1' ? "Tuna Sandwich" : 'Level 2' ? "6” Tuna Sandwich" : "6 inch Tuna Sandwich", 230, "../../assets/finalAssets/tuna_subway.png", 1) }} >
                            <Ionicons name="add" size={ies == 'Level 1' ? 18 : 'Level 2' ? 22 : 26} color="white" />
                        </TouchableOpacity>
                        <View style={styles.itemDetails}>
                            <Text style={[styles.quantity, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱230</Text>
                            {cdl == 'Level 1' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Tuna Sandwich</Text>}
                            {cdl == 'Level 2' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>6” Tuna Sandwich</Text>}
                            {cdl == 'Level 3' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>6 inch Tuna Sandwich</Text>}
                        </View>
                    </TouchableOpacity>

                </View>

                <Text style={[styles.Category, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 18 : fSize == 'Level 2' ? 20 : 22, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Restaurant</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollViewContainer}
                >
                    {restaurants.map((restaurant, index) => (
                        <RestaurantCard key={index} {...restaurant} />
                    ))}
                </ScrollView>
                <View style={styles.categoryTitle}>
                    <Text style={[styles.Category, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 18 : fSize == 'Level 2' ? 20 : 22, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Meals</Text>
                    <Text style={[styles.CategoryDescription, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>from Projuice</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.OptionTopRow}>
                    <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('LSProjuice'); }} >
                        <Image source={require('../../assets/finalAssets/ls_projuice.png')} style={styles.itemImage} resizeMode="cover" />
                        <TouchableOpacity style={[styles.addButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { addToCard(cdl == 'Level 1' ? "Watermelon, Apple, and Carrot Juice" : 'Level 2' ? "Watermelon, Apple, and Carrot Pressed Juice" : "16 oz Watermelon, Apple, and Carrot Pressed Juice", 255, "../../assets/finalAssets/ls_projuice.png", 1) }} >
                            <Ionicons name="add" size={ies == 'Level 1' ? 18 : 'Level 2' ? 22 : 26} color="white" />
                        </TouchableOpacity>
                        <View style={styles.itemDetails}>
                            <Text style={[styles.quantity, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱255</Text>
                            {cdl == 'Level 1' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Watermelon, Apple, and Carrot Juice</Text>}
                            {cdl == 'Level 2' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Watermelon, Apple, and Carrot Pressed Juice</Text>}
                            {cdl == 'Level 3' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>16 oz Watermelon, Apple, and Carrot Pressed Juice</Text>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('BCPProjuice'); }} >
                        <Image source={require('../../assets/finalAssets/bcp_projuice.png')} style={styles.itemImage} resizeMode="cover" />
                        <TouchableOpacity style={[styles.addButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { addToCard(cdl == 'Level 1' ? "Banana, Chocolate, Peanut Butter Smoothie" : 'Level 2' ? "Banana, Chocolate, Peanut Butter blended with Milk and Yogurt" : "16 oz. Banana, Chocolate, Peanut Butter blended with Skim, Low-Fat Milk, Low-Fat Yogurt", 255, "../../assets/finalAssets/bcp_projuice.png", 1) }} >
                            <Ionicons name="add" size={ies == 'Level 1' ? 18 : 'Level 2' ? 22 : 26} color="white" />
                        </TouchableOpacity>
                        <View style={styles.itemDetails}>
                            <Text style={[styles.quantity, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱255</Text>
                            {cdl == 'Level 1' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Banana, Chocolate, Peanut Butter Smoothie</Text>}
                            {cdl == 'Level 2' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Banana, Chocolate, Peanut Butter blended with Milk and Yogurt</Text>}
                            {cdl == 'Level 3' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>16 oz. Banana, Chocolate, Peanut Butter blended with Skim, Low-Fat Milk, Low-Fat Yogurt</Text>}
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={styles.OptionTopRow}>
                    <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('EQProjuice'); }} >
                        <Image source={require('../../assets/finalAssets/eq_projuice.png')} style={styles.itemImage} resizeMode="cover" />
                        <TouchableOpacity style={[styles.addButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { addToCard(cdl == 'Level 1' ? "Salad with Egg and Quinoa" : 'Level 2' ? "Salad with Egg, Quinoa, Edamame, Carrots, Cucumber, and Peanut Salad dressing" : "Slices of egg, quinoa, edamame, carrots, cucumber, and peanut salad dressing", 255, "../../assets/finalAssets/eq_projuice.png", 1) }} >
                            <Ionicons name="add" size={ies == 'Level 1' ? 18 : 'Level 2' ? 22 : 26} color="white" />
                        </TouchableOpacity>
                        <View style={styles.itemDetails}>
                            <Text style={[styles.quantity, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱255</Text>
                            {cdl == 'Level 1' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Salad with Egg and Quinoa</Text>}
                            {cdl == 'Level 2' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Salad with Egg, Quinoa, Edamame, Carrots, Cucumber, and Peanut Salad dressing</Text>}
                            {cdl == 'Level 3' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Slices of egg, quinoa, edamame, carrots, cucumber, and peanut salad dressing</Text>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('CSProjuice'); }} >
                        <Image source={require('../../assets/finalAssets/cs_projuice.png')} style={styles.itemImage} resizeMode="cover" />
                        <TouchableOpacity style={[styles.addButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { addToCard(cdl == 'Level 1' ? "Pasta with Cajun Spiced Sauce and Shrimp" : 'Level 2' ? "Pasta with Creamy Cajun Spiced Sauce and Shrimp" : "Pasta with Creamy Cajun Spiced Sauce, Shrimp, Mushroom, and Spinach Pasta", 285, "../../assets/finalAssets/cs_projuice.png", 1) }} >
                            <Ionicons name="add" size={ies == 'Level 1' ? 18 : 'Level 2' ? 22 : 26} color="white" />
                        </TouchableOpacity>
                        <View style={styles.itemDetails}>
                            <Text style={[styles.quantity, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱285</Text>
                            {cdl == 'Level 1' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Pasta with Cajun Spiced Sauce and Shrimp</Text>}
                            {cdl == 'Level 2' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Pasta with Creamy Cajun Spiced Sauce and Shrimp</Text>}
                            {cdl == 'Level 3' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Pasta with Creamy Cajun Spiced Sauce, Shrimp, Mushroom, and Spinach Pasta</Text>}
                        </View>
                    </TouchableOpacity>


                </View>

                <View style={styles.OptionTopRow}>
                    <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('TCProjuice'); }} >
                        <Image source={require('../../assets/finalAssets/tc_projuice.png')} style={styles.itemImage} resizeMode="cover" />
                        <TouchableOpacity style={[styles.addButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { addToCard(cdl == 'Level 1' ? "Chicken with Teriyaki Sauce and Quinoa" : 'Level 2' ? "Chicken with Sweet Soy, Sesame, Mirin, Quinoa, and Mixed Vegetables" : "Chicken Quarter with Sweet Soy, Sesame, Mirin, Edamame, Quinoa, and Mixed Vegetables", 355, "../../assets/finalAssets/tc_projuice.png", 1) }} >
                            <Ionicons name="add" size={ies == 'Level 1' ? 18 : 'Level 2' ? 22 : 26} color="white" />
                        </TouchableOpacity>
                        <View style={styles.itemDetails}>
                            <Text style={[styles.quantity, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱355</Text>
                            {cdl == 'Level 1' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Chicken with Teriyaki Sauce and Quinoa</Text>}
                            {cdl == 'Level 2' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Chicken with Sweet Soy, Sesame, Mirin, Quinoa, and Mixed Vegetables</Text>}
                            {cdl == 'Level 3' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Chicken Quarter with Sweet Soy, Sesame, Mirin, Edamame, Quinoa, and Mixed Vegetables</Text>}
                        </View>
                    </TouchableOpacity>

                </View>

                <Text style={[styles.Category, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 18 : fSize == 'Level 2' ? 20 : 22, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Restaurant</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollViewContainer}
                >
                    {restaurants.map((restaurant, index) => (
                        <RestaurantCard key={index} {...restaurant} />
                    ))}
                </ScrollView>
                <View style={styles.categoryTitle}>
                    <Text style={[styles.Category, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 18 : fSize == 'Level 2' ? 20 : 22, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Meals</Text>
                    <Text style={[styles.CategoryDescription, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>from Thai Mango</Text>
                </View>
                <View style={styles.OptionTopRow}>
                    <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('TSSThaiMango'); }} >
                        <Image source={require('../../assets/finalAssets/tss_thaiMango.png')} style={styles.itemImage} resizeMode="cover" />
                        <TouchableOpacity style={[styles.addButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { addToCard(cdl == 'Level 1' ? "Thai Salad with Shrimp" : 'Level 2' ? "Healthy Thai Shrimp Salad" : "Healthy Thai Shrimp Salad with toasted rice", 299, "../../assets/finalAssets/tss_thaiMango.png", 1) }} >
                            <Ionicons name="add" size={ies == 'Level 1' ? 18 : 'Level 2' ? 22 : 26} color="white" />
                        </TouchableOpacity>
                        <View style={styles.itemDetails}>
                            <Text style={[styles.quantity, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱299</Text>
                            {cdl == 'Level 1' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Thai Salad with Shrimp</Text>}
                            {cdl == 'Level 2' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Healthy Thai Shrimp Salad</Text>}
                            {cdl == 'Level 3' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Healthy Thai Shrimp Salad with toasted rice</Text>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('TFCThaiMango'); }} >
                        <Image source={require('../../assets/finalAssets/tfc_thaiMango.png')} style={styles.itemImage} resizeMode="cover" />
                        <TouchableOpacity style={[styles.addButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { addToCard(cdl == 'Level 1' ? "Thai Fried Chicken" : 'Level 2' ? "Boneless Thai Fried Chicken" : "Boneless Thai Fried Chicken Marinated in authentic Thai seasonings", 239, "../../assets/finalAssets/tfc_thaiMango.png", 1) }} >
                            <Ionicons name="add" size={ies == 'Level 1' ? 18 : 'Level 2' ? 22 : 26} color="white" />
                        </TouchableOpacity>
                        <View style={styles.itemDetails}>
                            <Text style={[styles.quantity, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱239</Text>
                            {cdl == 'Level 1' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Thai Fried Chicken</Text>}
                            {cdl == 'Level 2' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Boneless Thai Fried Chicken</Text>}
                            {cdl == 'Level 3' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Boneless Thai Fried Chicken Marinated in authentic Thai seasonings</Text>}
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={styles.OptionTopRow}>
                    <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('SPTThaiMango'); }} >
                        <Image source={require('../../assets/finalAssets/spt_thaiMango.png')} style={styles.itemImage} resizeMode="cover" />
                        <TouchableOpacity style={[styles.addButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { addToCard(cdl == 'Level 1' ? "Pad Thai with Shrimp" : 'Level 2' ? "Stir Fry Shrimp Pad Thai" : "Stir Fry Shrimp Pad Thai in special Pad Thai sauce", 289, "../../assets/finalAssets/spt_thaiMango.png", 1) }} >
                            <Ionicons name="add" size={ies == 'Level 1' ? 18 : 'Level 2' ? 22 : 26} color="white" />
                        </TouchableOpacity>
                        <View style={styles.itemDetails}>
                            <Text style={[styles.quantity, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱289</Text>
                            {cdl == 'Level 1' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Pad Thai with Shrimp</Text>}
                            {cdl == 'Level 2' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Stir Fry Shrimp Pad Thai</Text>}
                            {cdl == 'Level 3' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Stir Fry Shrimp Pad Thai in special Pad Thai sauce</Text>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('CPTThaiMango'); }} >
                        <Image source={require('../../assets/finalAssets/cpt_thaiMango.png')} style={styles.itemImage} resizeMode="cover" />
                        <TouchableOpacity style={[styles.addButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { addToCard(cdl == 'Level 1' ? "Pad Thai with Chicken" : 'Level 2' ? "Authentic or Signature Chicken Pad Thai" : "Authentic or Signature Chicken Pad Thai with special sauce", 209, "../../assets/finalAssets/cpt_thaiMango.png", 1) }} >
                            <Ionicons name="add" size={ies == 'Level 1' ? 18 : 'Level 2' ? 22 : 26} color="white" />
                        </TouchableOpacity>
                        <View style={styles.itemDetails}>
                            <Text style={[styles.quantity, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱209</Text>
                            {cdl == 'Level 1' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Pad Thai with Chicken</Text>}
                            {cdl == 'Level 2' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Authentic or Signature Chicken Pad Thai</Text>}
                            {cdl == 'Level 3' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Authentic or Signature Chicken Pad Thai with special sauce</Text>}
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={styles.OptionTopRow}>
                    <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('BPBThaiMango'); }} >
                        <Image source={require('../../assets/finalAssets/bpb_thaiMango.png')} style={styles.itemImage} resizeMode="cover" />
                        <TouchableOpacity style={[styles.addButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { addToCard(cdl == 'Level 1' ? "Thai BBQ Pork Belly" : 'Level 2' ? "Chargrilled Thai BBQ Pork Belly" : "Chargrilled Thai BBQ Pork Belly marinated in Thai spices", 229, "../../assets/finalAssets/bpb_thaiMango.png", 1) }} >
                            <Ionicons name="add" size={ies == 'Level 1' ? 18 : 'Level 2' ? 22 : 26} color="white" />
                        </TouchableOpacity>
                        <View style={styles.itemDetails}>
                            <Text style={[styles.quantity, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱229</Text>
                            {cdl == 'Level 1' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Thai BBQ Pork Belly</Text>}
                            {cdl == 'Level 2' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Chargrilled Thai BBQ Pork Belly</Text>}
                            {cdl == 'Level 3' && <Text style={[styles.title, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Chargrilled Thai BBQ Pork Belly marinated in Thai spices</Text>}
                        </View>
                    </TouchableOpacity>

                </View>


            </ScrollView>
            {
                checkCart == true && <TouchableOpacity style={[styles.addToCartButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", }]} onPress={() => { navigation.navigate('CartPageScreen1'); }} >
                    <View style={styles.firstPart} >
                        <Text style={[styles.addToCartText, { fontFamily: 'Poppins_400Regular' }]}>Basket • </Text>
                        <Text style={[styles.addToCartText, { fontFamily: 'Poppins_400Regular' }]}>{totalQuantity}</Text>
                        <Text style={[styles.addToCartText, { fontFamily: 'Poppins_400Regular' }]}> Item </Text>
                    </View>
                    <View style={styles.SecondPart} >
                        <Text style={[styles.addToCartText, { fontFamily: 'Poppins_400Regular' }]}> ₱</Text>
                        <Text style={[styles.addToCartText, { fontFamily: 'Poppins_400Regular' }]}> {totalPrice}</Text>
                    </View>
                </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => { setModalVisible(true) }} style={[styles.fab, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]}>
                <Ionicons name="settings" size={ies == 'Level 1' ? 18 : 'Level 2' ? 22 : 26} color="white" />
            </TouchableOpacity>


            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={saveSettings}
            >
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    {/* Your modal content here */}
                    <View style={{ backgroundColor: 'white', padding: 16, borderTopRightRadius: 25, borderTopLeftRadius: 25 }}>

                        <View style={styles.modalHeader}>

                            <Text style={styles.headerTitle}>Elements Settings</Text>

                        </View>
                        <View style={styles.divider} />

                        <Text style={styles.settingsTitle}>Font Size</Text>
                        <View style={styles.BottomOptionTopRow}>
                            <TouchableOpacity style={[styles.modalOptions, { backgroundColor: fSize == 'Level 1' ? bgColor == 'Level 1' ? "#1D601A" : "#298825" : 'white', borderColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", }]} onPress={() => { setFSize('Level 1') }}>

                                <Text style={[styles.title3, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', color: fSize == 'Level 1' ? 'white' : bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} >Level 1</Text>


                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalOptions, { backgroundColor: fSize == 'Level 2' ? bgColor == 'Level 1' ? "#1D601A" : "#298825" : 'white', borderColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", }]} onPress={() => { setFSize('Level 2') }}>

                                <Text style={[styles.title3, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', color: fSize == 'Level 2' ? 'white' : bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} >Level 2</Text>

                            </TouchableOpacity>

                        </View>


                        <Text style={styles.settingsTitle}>Font Style</Text>
                        <View style={styles.BottomOptionTopRow}>
                            <TouchableOpacity style={[styles.modalOptions, { backgroundColor: fStyle == 'Level 1' ? bgColor == 'Level 1' ? "#1D601A" : "#298825" : 'white', borderColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", }]} onPress={() => { setFStyle('Level 1') }}>

                                <Text style={[styles.title3, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', color: fStyle == 'Level 1' ? 'white' : bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} >Level 1</Text>


                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalOptions, { backgroundColor: fStyle == 'Level 2' ? bgColor == 'Level 1' ? "#1D601A" : "#298825" : 'white', borderColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", }]} onPress={() => { setFStyle('Level 2') }}>

                                <Text style={[styles.title3, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', color: fStyle == 'Level 2' ? 'white' : bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} >Level 2</Text>

                            </TouchableOpacity>


                        </View>


                        <Text style={styles.settingsTitle}>Icon and Element Recognition and Symbolization</Text>
                        <View style={styles.BottomOptionTopRow}>
                            <TouchableOpacity style={[styles.modalOptions, { backgroundColor: iers == 'Level 1' ? bgColor == 'Level 1' ? "#1D601A" : "#298825" : 'white', borderColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", }]} onPress={() => { setIERS('Level 1') }}>

                                <Text style={[styles.title3, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', color: iers == 'Level 1' ? 'white' : bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} >Level 1</Text>


                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalOptions, { backgroundColor: iers == 'Level 2' ? bgColor == 'Level 1' ? "#1D601A" : "#298825" : 'white', borderColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", }]} onPress={() => { setIERS('Level 2') }}>

                                <Text style={[styles.title3, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', color: iers == 'Level 2' ? 'white' : bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} >Level 2</Text>

                            </TouchableOpacity>


                        </View>

                        <Text style={styles.settingsTitle}>Icon and Element Size</Text>
                        <View style={styles.BottomOptionTopRow}>
                            <TouchableOpacity style={[styles.modalOptions, { backgroundColor: ies == 'Level 1' ? bgColor == 'Level 1' ? "#1D601A" : "#298825" : 'white', borderColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", }]} onPress={() => { setIES('Level 1') }}>

                                <Text style={[styles.title3, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', color: ies == 'Level 1' ? 'white' : bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} >Level 1</Text>


                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalOptions, { backgroundColor: ies == 'Level 2' ? bgColor == 'Level 1' ? "#1D601A" : "#298825" : 'white', borderColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", }]} onPress={() => { setIES('Level 2') }}>

                                <Text style={[styles.title3, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', color: ies == 'Level 2' ? 'white' : bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} >Level 2</Text>

                            </TouchableOpacity>


                        </View>


                        <Text style={styles.settingsTitle}>Application Themed Color</Text>

                        <View style={styles.BottomOptionTopRow}>
                            <TouchableOpacity style={[styles.modalOptions, { backgroundColor: bgColor == 'Level 1' ? bgColor == 'Level 1' ? "#1D601A" : "#298825" : 'white', borderColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", }]} onPress={() => { setBgColor('Level 1') }}>

                                <Text style={[styles.title3, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', color: bgColor == 'Level 1' ? 'white' : bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} >Level 1</Text>


                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalOptions, { backgroundColor: bgColor == 'Level 2' ? bgColor == 'Level 1' ? "#1D601A" : "#298825" : 'white', borderColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", }]} onPress={() => { setBgColor('Level 2') }}>

                                <Text style={[styles.title3, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', color: bgColor == 'Level 2' ? 'white' : bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} >Level 2</Text>

                            </TouchableOpacity>



                        </View>






                        <Text style={styles.settingsTitle}>Font Color</Text>
                        <View style={styles.BottomOptionTopRow}>
                            <TouchableOpacity style={[styles.modalOptions, { backgroundColor: fColor == 'Level 1' ? bgColor == 'Level 1' ? "#1D601A" : "#298825" : 'white', borderColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", }]} onPress={() => { setFColor('Level 1') }}>

                                <Text style={[styles.title3, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', color: fColor == 'Level 1' ? 'white' : bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} >Level 1</Text>


                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalOptions, { backgroundColor: fColor == 'Level 2' ? bgColor == 'Level 1' ? "#1D601A" : "#298825" : 'white', borderColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", }]} onPress={() => { setFColor('Level 2') }}>

                                <Text style={[styles.title3, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', color: fColor == 'Level 2' ? 'white' : bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} >Level 2</Text>

                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalOptions, { backgroundColor: fColor == 'Level 3' ? bgColor == 'Level 1' ? "#1D601A" : "#298825" : 'white', borderColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", }]} onPress={() => { setFColor('Level 3') }}>

                                <Text style={[styles.title3, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', color: fColor == 'Level 3' ? 'white' : bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} >Level 3</Text>

                            </TouchableOpacity>


                        </View>








                        <Text style={styles.settingsTitle}>Clear and Descriptive Label</Text>
                        <View style={styles.BottomOptionTopRow}>
                            <TouchableOpacity style={[styles.modalOptions, { backgroundColor: cdl == 'Level 1' ? bgColor == 'Level 1' ? "#1D601A" : "#298825" : 'white', borderColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", }]} onPress={() => { setCDL('Level 1') }}>

                                <Text style={[styles.title3, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', color: cdl == 'Level 1' ? 'white' : bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} >Level 1</Text>


                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalOptions, { backgroundColor: cdl == 'Level 2' ? bgColor == 'Level 1' ? "#1D601A" : "#298825" : 'white', borderColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", }]} onPress={() => { setCDL('Level 2') }}>

                                <Text style={[styles.title3, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', color: cdl == 'Level 2' ? 'white' : bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} >Level 2</Text>

                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalOptions, { backgroundColor: cdl == 'Level 3' ? bgColor == 'Level 1' ? "#1D601A" : "#298825" : 'white', borderColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", }]} onPress={() => { setCDL('Level 3') }}>

                                <Text style={[styles.title3, { fontFamily: fStyle == 'Level 1' ? 'Poppins_400Regular' : 'Roboto_400Regular', color: cdl == 'Level 3' ? 'white' : bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} >Level 3</Text>

                            </TouchableOpacity>

                        </View>



                        <TouchableOpacity

                            style={[
                                styles.modalButtonActivate, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", borderColor: bgColor == 'Level 1' ? "#1D601A" : "#298825", } // Apply the activeButton style if item is active
                            ]}
                            onPress={saveSettings}
                        >
                            <Text
                                style={styles.modalButtonActivateText // Apply the activeButtonText style if item is active
                                }
                            >
                                Close
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#FFFFFF',
        flex: 1,

    },
    header: {
        alignItems: 'flex-start',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingHorizontal: 18,
    }, headerScrolled: {
        alignItems: 'flex-start',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        paddingHorizontal: 18,
        paddingVertical: 20
    },
    titleText: {
        paddingTop: 20,
        paddingBottom: 5,
        fontSize: 22,
        fontWeight: 'bold',

    },

    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        borderWidth: 1,
        elevation: 2,
        marginBottom: 20,
        borderRadius: 10,
        paddingHorizontal: Platform.OS === 'ios' ? hp(1) : hp(1.5),

    },
    searchContainerScrolled: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        borderWidth: 1,
        elevation: 2,
        borderRadius: 10,
        paddingHorizontal: Platform.OS === 'ios' ? hp(1) : hp(1.5),

    },
    searchicon: {
        padding: 5,
        color: 'grey'
    },
    searchInput: {
        flex: 1,
        paddingVertical: 10,
        paddingLeft: 10,
        paddingRight: 5,
        width: 220
    },
    headerProgress: {
        flexDirection: 'row',

    },
    progressText: {
        color: "white",
        paddingLeft: 5,
        paddingBottom: 15
    },

    option: {
        marginTop: 10,
        borderRadius: 20, // Adjust the borderRadius as necessary
        flexDirection: 'column'
    },

    modalOptions: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 20, // Adjust the borderRadius as necessary
        borderWidth: 1,
        marginHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center'

    },

    image: {
        position: 'absolute', // Position the image absolutely within the 'option' view
        bottom: 5, // Align to the bottom of the container
        right: 5, // Align to the right of the container

    },
    title2: {
        fontWeight: 'bold',
    },
    title3: {

        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16, // Adjust the font size as necessary
    },
    Category: {
        marginTop: 10,
        marginLeft: 20,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    CategoryDescription: {
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 5,
    },
    categoryTitle: {

        flexDirection: 'row'
    },
    title1: {
        marginBottom: 35,
        fontWeight: 'bold',
    },
    OptionTopRow: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start'

    },
    HeaderOptionTopRow: {
        flexDirection: 'row',

        justifyContent: 'space-evenly',
        alignItems: 'space-evenly',
        alignContent: 'space-evenly'
    },
    BottomOptionTopRow: {
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start'
    },
    card: {
        width: 240, // Adjust the width of the card
        marginRight: 10, // Add spacing between cards
        borderRadius: 10, // Round the corners of the card
        overflow: 'hidden', // Hide overflow
        backgroundColor: '#fff', // Card background color
        elevation: 3, // Card shadow for Android
        shadowColor: '#000', // Card shadow for iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        marginBottom: 5
    },
    cardDetails: {
        marginVertical: 10,
        marginHorizontal: 5,
        flexDirection: 'row',
        paddingHorizontal: 5
    },
    cardImage: {
        width: '100%', // Image takes full card width
        height: 100, // Fixed height for the image
        resizeMode: 'cover', // Cover the card area with the image
    },
    cardTitle: {
        paddingVertical: 5,
        fontWeight: '500',
        width: 175,
    },
    cardRating: {
        flexDirection: 'row', // Align star and rating horizontally
        alignItems: 'center', // Center items vertically
        paddingHorizontal: 5,
    },
    cardRatingText: {
        marginLeft: 5, // Spacing between star and rating text
    },
    cardSubtitle: {
        color: 'grey',
        paddingHorizontal: 5,
        paddingBottom: 5,
    },
    scrollViewContainer: {
        marginLeft: 15, // This adds space on the left side of the ScrollView

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
        fontWeight: '600',
        color: '#000',
    },
    itemDetails: {
        flexDirection: 'column'
    },
    title: {

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
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8
    },
    modalButtonHeader: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 100

    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    settingsTitle: {
        fontSize: 16,
        paddingHorizontal: 15,
        fontWeight: 'bold',
    },
    divider: {
        borderBottomColor: '#EEEEEE',
        borderBottomWidth: 2,
        flexGrow: 1,
        marginHorizontal: 25, // Extra padding top for iOS
    },
    modalButtonActivate: {
        // White background for the active button
        borderWidth: 2, // Border to match the picture
        // Border color same as the inactive button background
        // Replace with the actual color code from the picture
        borderRadius: 25, // Adjust as needed to match the picture
        marginHorizontal: 30, // Add space between the buttons
        marginTop: 10, // Add space between the buttons


        paddingVertical: 12,
        alignItems: 'center', // Center the text inside the button
        justifyContent: 'center',
    },

    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 80,
        borderRadius: 28,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
            height: 3,
            width: 3,
        },
    },



    // Style for the text inside the active button
    modalButtonActivateText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffff', // Text color for active button to match the picture
    },


});

export default Homepage;
