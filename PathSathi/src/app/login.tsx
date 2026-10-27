import { router } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { useDemo } from '../demo/state';
import { Card, Heading, Hint, Page, Status } from '../ui/kit';
export default function Login(){
 const {data,enter}=useDemo();
 return <Page title="Demo sign in" subtitle="Choose a fictional account to preview a role. No password is checked in this frontend prototype.">
  {data.accounts.filter(a=>!a.suspended).map(a=><Pressable key={a.id} accessibilityRole="button" accessibilityLabel={`Enter as ${a.name}`} onPress={()=>{enter(a.id);router.replace('/');}}>
    <Card><Heading>{a.name}</Heading><Status value={a.role}/><Hint>{a.email}</Hint><Text style={{color:'#285F54',fontWeight:'700'}}>Open workspace</Text></Card>
  </Pressable>)}
 </Page>;
}
