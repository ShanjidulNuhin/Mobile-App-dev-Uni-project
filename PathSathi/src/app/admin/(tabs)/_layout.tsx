import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { colors } from '../../../ui/theme';
export default function RoleTabs(){return <Tabs screenOptions={{headerShown:false,tabBarActiveTintColor:colors.primary,tabBarInactiveTintColor:colors.muted,tabBarStyle:{backgroundColor:colors.white,height:64,paddingTop:5,paddingBottom:7}}}>
    <Tabs.Screen name="index" options={{title:"Dashboard",tabBarIcon:({color,size})=><Ionicons name="grid-outline" size={size} color={color}/>}}/>
    <Tabs.Screen name="users" options={{title:"Users",tabBarIcon:({color,size})=><Ionicons name="people-outline" size={size} color={color}/>}}/>
    <Tabs.Screen name="moderators" options={{title:"Moderators",tabBarIcon:({color,size})=><Ionicons name="shield-outline" size={size} color={color}/>}}/>
    <Tabs.Screen name="escalations" options={{title:"Cases",tabBarIcon:({color,size})=><Ionicons name="alert-circle-outline" size={size} color={color}/>}}/>
</Tabs>}
