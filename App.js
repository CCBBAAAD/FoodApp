import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentMethod from './components/app/PaymentMethod';
import DeliveryAddress from './components/app/DeliveryAddress';
import IdValidation from './components/app/IdValidation';
import ChooseCuisine from './components/app/chooseCuisine';
import ChooseDish from './components/app/chooseDish';
import ChooseRestaurant from './components/app/chooseRestaurant';
import Homepage from './components/app/Homepage';
import ProjuiceScreen from './components/app/ProjuiceScreen';
import SubwayPage from './components/app/SubwayPage';
import KennyRogersPage from './components/app/KennyRogersPage';
import ThaiMangoPage from './components/app/ThaiMangoPage';
import EditDeliveryAddress from './components/app/editAddress';
import CartPageScreen1 from './components/app/CartPage1';
import VoucherPage from './components/app/VoucherPage';
import CartPageScreen2 from './components/app/CartPage2';
import SearchComponent from './components/app/searchScreen';
import FsKennyRogers from './components/app/KennyRogers/fs_kennyRogers';
import RcKennyRogers from './components/app/KennyRogers/rc_kennyRogers';
import GPCKennyRogers from './components/app/KennyRogers/gpc_kennyRogers';
import BCPProjuice from './components/app/Projuice/bcp_projuice';
import CSProjuice from './components/app/Projuice/cs_projuice';
import EQProjuice from './components/app/Projuice/eq_projuice';
import LSProjuice from './components/app/Projuice/ls_projuice';
import TCProjuice from './components/app/Projuice/tc_projuice';
import BLTSubway from './components/app/Subway/blt_subway';
import CBSubway from './components/app/Subway/cb_subway';
import RBSubway from './components/app/Subway/rb_subway';
import TunaSubway from './components/app/Subway/tuna_subway';
import BPBThaiMango from './components/app/ThaiMango/bpb_thaiMango';
import CPTThaiMango from './components/app/ThaiMango/cpt_thaiMango';
import SPTThaiMango from './components/app/ThaiMango/spt_thaiMango';
import TFCThaiMango from './components/app/ThaiMango/tfc_thaiMango';
import TSSThaiMango from './components/app/ThaiMango/tss_thaiMango';
import RepeatOrder1 from './components/app/RepeartOrder';
import RepeatOrder2 from './components/app/RepeartOrder2';
import VoucherPage1 from './components/app/VoucherPage1';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Roboto_400Regular } from '@expo-google-fonts/roboto'
import { ActivityIndicator } from 'react-native';
const Stack = createStackNavigator();

export default function App() {
  let [isFontStyleLoaded] = useFonts({
    Roboto_400Regular,
    Poppins_400Regular,
  });

  if (!isFontStyleLoaded) {
    return <ActivityIndicator size="large" color="#298825" />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
          <Stack.Screen name="PaymentMethod" component={PaymentMethod} options={{ headerShown: false }} />
          <Stack.Screen name="DeliveryAddress" component={DeliveryAddress} options={{ headerShown: false }} />
          <Stack.Screen name="EditDeliveryAddress" component={EditDeliveryAddress} options={{ headerShown: false }} />
          <Stack.Screen name="IdValidation" component={IdValidation} options={{ headerShown: false }} />
          <Stack.Screen name="ChooseCuisine" component={ChooseCuisine} options={{ headerShown: false }} />
          <Stack.Screen name="ChooseDish" component={ChooseDish} options={{ headerShown: false }} />
          <Stack.Screen name="ChooseRestaurant" component={ChooseRestaurant} options={{ headerShown: false }} />
          <Stack.Screen name="ProjuiceScreen" component={ProjuiceScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SubwayPage" component={SubwayPage} options={{ headerShown: false }} />
          <Stack.Screen name="KennyRogersPage" component={KennyRogersPage} options={{ headerShown: false }} />
          <Stack.Screen name="ThaiMangoPage" component={ThaiMangoPage} options={{ headerShown: false }} />
          <Stack.Screen name="CartPageScreen1" component={CartPageScreen1} options={{ headerShown: false }} />
          <Stack.Screen name="VoucherPage" component={VoucherPage} options={{ headerShown: false }} />
          <Stack.Screen name="CartPageScreen2" component={CartPageScreen2} options={{ headerShown: false }} />
          <Stack.Screen name="SearchComponent" component={SearchComponent} options={{ headerShown: false }} />
          <Stack.Screen name="FsKennyRogers" component={FsKennyRogers} options={{ headerShown: false }} />
          <Stack.Screen name="RcKennyRogers" component={RcKennyRogers} options={{ headerShown: false }} />
          <Stack.Screen name="GPCKennyRogers" component={GPCKennyRogers} options={{ headerShown: false }} />
          <Stack.Screen name="BCPProjuice" component={BCPProjuice} options={{ headerShown: false }} />
          <Stack.Screen name="CSProjuice" component={CSProjuice} options={{ headerShown: false }} />
          <Stack.Screen name="EQProjuice" component={EQProjuice} options={{ headerShown: false }} />
          <Stack.Screen name="LSProjuice" component={LSProjuice} options={{ headerShown: false }} />
          <Stack.Screen name="TCProjuice" component={TCProjuice} options={{ headerShown: false }} />
          <Stack.Screen name="BLTSubway" component={BLTSubway} options={{ headerShown: false }} />
          <Stack.Screen name="CBSubway" component={CBSubway} options={{ headerShown: false }} />
          <Stack.Screen name="RBSubway" component={RBSubway} options={{ headerShown: false }} />
          <Stack.Screen name="TunaSubway" component={TunaSubway} options={{ headerShown: false }} />
          <Stack.Screen name="BPBThaiMango" component={BPBThaiMango} options={{ headerShown: false }} />
          <Stack.Screen name="CPTThaiMango" component={CPTThaiMango} options={{ headerShown: false }} />
          <Stack.Screen name="SPTThaiMango" component={SPTThaiMango} options={{ headerShown: false }} />
          <Stack.Screen name="TFCThaiMango" component={TFCThaiMango} options={{ headerShown: false }} />
          <Stack.Screen name="TSSThaiMango" component={TSSThaiMango} options={{ headerShown: false }} />
          <Stack.Screen name="RepeatOrder1" component={RepeatOrder1} options={{ headerShown: false }} />
          <Stack.Screen name="RepeatOrder2" component={RepeatOrder2} options={{ headerShown: false }} />
          <Stack.Screen name="VoucherPage1" component={VoucherPage1} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}