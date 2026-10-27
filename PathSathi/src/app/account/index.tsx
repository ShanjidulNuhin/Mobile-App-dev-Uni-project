import { router } from 'expo-router';
import { useDemo } from '../../demo/state';
import { useModeration } from '../../moderation/state';
import { ActionButton, Card, Heading, Hint, LabelRow, Page } from '../../ui/kit';
export default function Account(){const {user,signOut}=useDemo();const {state}=useModeration();if(!user)return null;
 return <Page title="My account" subtitle="Common screen for all roles">
  <Card><Heading>{user.name}</Heading><LabelRow label="Role" value={user.role}/><LabelRow label="Email" value={user.email}/><LabelRow label="Area" value={user.area}/></Card>
  {state.history.filter(h=>h.type==='WARN_USER'&&h.targetId===user.id).map(h=><Card key={h.id}><Heading>Moderator warning</Heading><Hint>{h.reason}</Hint></Card>)}
  <ActionButton label="Edit my profile" onPress={()=>router.push('/account/edit')}/>
  <ActionButton label="Sign out / switch demo role" outline onPress={()=>{signOut();router.replace('/welcome')}}/>
  <Hint>Role management and real session security will be handled by the server in a later phase.</Hint>
 </Page>;
}
