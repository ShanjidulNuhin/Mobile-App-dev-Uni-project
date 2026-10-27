import { router } from 'expo-router';
import { Pressable } from 'react-native';
import { useDemo } from '../../../demo/state';
import { ActionButton, Card, Heading, Hint, Page, Status } from '../../../ui/kit';
export default function Moderators(){const {data}=useDemo();const moderators=data.accounts.filter(a=>a.role==='moderator');
 return <Page title="Moderator management" subtitle="Accounts with moderation permission">
 <ActionButton label="Create moderator" onPress={()=>router.push('/admin/create-moderator')}/>
 {moderators.map(m=><Pressable accessibilityRole="button" key={m.id} onPress={()=>router.push(`/admin/user/${m.id}`)}>
 <Card><Heading>{m.name}</Heading><Status value={m.suspended?'suspended':'active'}/><Hint>{m.email}</Hint></Card></Pressable>)}
 <Card><Hint>Admin-only account creation is demonstrated locally. Real credentials and account removal require backend work.</Hint></Card>
 </Page>;
}
