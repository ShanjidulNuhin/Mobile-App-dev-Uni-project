import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { colors } from '../../../ui/theme';
export default function RoleTabs(){return <Tabs screenOptions={{headerShown:false,tabBarActiveTintColor:colors.primary,tabBarInactiveTintColor:colors.muted,tabBarStyle:{backgroundColor:colors.white,height:64,paddingTop:5,paddingBottom:7}}}>
    <Tabs.Screen name="index" options={{title:"Tuition Board",tabBarIcon:({color,size})=><Ionicons name="search-outline" size={size} color={color}/>}}/>
    <Tabs.Screen name="applications" options={{title:"Applications",tabBarIcon:({color,size})=><Ionicons name="file-tray-full-outline" size={size} color={color}/>}}/>
    <Tabs.Screen name="profile" options={{title:"Profile",tabBarIcon:({color,size})=><Ionicons name="person-outline" size={size} color={color}/>}}/>
</Tabs>}
