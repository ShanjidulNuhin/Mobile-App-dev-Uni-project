import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { colors } from '../../../ui/theme';
export default function RoleTabs(){return <Tabs screenOptions={{headerShown:false,tabBarActiveTintColor:colors.primary,tabBarInactiveTintColor:colors.muted,tabBarStyle:{backgroundColor:colors.white,height:64,paddingTop:5,paddingBottom:7}}}>
    <Tabs.Screen name="index" options={{title:"Dashboard",tabBarIcon:({color,size})=><Ionicons name="grid-outline" size={size} color={color}/>}}/>
    <Tabs.Screen name="verification" options={{title:"Verify",tabBarIcon:({color,size})=><Ionicons name="shield-checkmark-outline" size={size} color={color}/>}}/>
    <Tabs.Screen name="reports" options={{title:"Reports",tabBarIcon:({color,size})=><Ionicons name="flag-outline" size={size} color={color}/>}}/>
    <Tabs.Screen name="history" options={{title:"History",tabBarIcon:({color,size})=><Ionicons name="time-outline" size={size} color={color}/>}}/>
</Tabs>}
