import { Stack } from 'expo-router';
export default function AccountLayout(){return <Stack><Stack.Screen name="index" options={{title:'My account'}}/><Stack.Screen name="edit" options={{title:'Edit my profile'}}/></Stack>}
