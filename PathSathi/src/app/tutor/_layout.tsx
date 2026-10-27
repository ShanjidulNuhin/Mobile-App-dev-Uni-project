import { Stack } from 'expo-router';
import { colors } from '../../ui/theme';
export default function RoleStack(){return <Stack screenOptions={{headerTintColor:colors.ink,headerStyle:{backgroundColor:colors.white},headerTitleStyle:{fontWeight:'700'}}}>
  <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
</Stack>}
