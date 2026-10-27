import { router } from 'expo-router';
import { useModeration } from '../../../moderation/state';
import { useDemo } from '../../../demo/state';
import { ActionButton, Card, Heading, Hint, LabelRow, Page } from '../../../ui/kit';
export default function ModeratorDashboard(){
 const {state}=useModeration();const {user}=useDemo();
 return <Page title="Moderator dashboard" subtitle={`Welcome, ${user?.name??'Moderator'}`}>
  <Card><Heading>Review workload</Heading><LabelRow label="Pending tutors" value={state.tutors.filter(x=>x.verificationStatus==='pending').length}/>
  <LabelRow label="Open reports" value={state.reports.filter(x=>x.status==='open').length}/><LabelRow label="Logged actions" value={state.history.length}/></Card>
  <ActionButton label="Review pending tutors" onPress={()=>router.push('/moderator/verification')}/>
  <ActionButton label="Review reported content" onPress={()=>router.push('/moderator/reports')}/>
  <ActionButton label="View my account" outline onPress={()=>router.push('/account')}/>
  <Card><Hint>Simulation only. Verification decisions are saved locally, not sent to a secured backend.</Hint></Card>
 </Page>;
}
