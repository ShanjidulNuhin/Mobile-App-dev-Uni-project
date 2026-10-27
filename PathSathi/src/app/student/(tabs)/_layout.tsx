import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { colors } from '../../../ui/theme';
export default function RoleTabs(){return <Tabs screenOptions={{headerShown:false,tabBarActiveTintColor:colors.primary,tabBarInactiveTintColor:colors.muted,tabBarStyle:{backgroundColor:colors.white,height:64,paddingTop:5,paddingBottom:7}}}>
    <Tabs.Screen name="index" options={{title:"Tutors",tabBarIcon:({color,size})=><Ionicons name="search-outline" size={size} color={color}/>}}/>
    <Tabs.Screen name="posts" options={{title:"My Posts",tabBarIcon:({color,size})=><Ionicons name="document-text-outline" size={size} color={color}/>}}/>
</Tabs>}
