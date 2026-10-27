import { router } from 'expo-router';
import { Alert } from 'react-native';
import { useDemo } from '../../../demo/state';
import { useModeration } from '../../../moderation/state';
import { ActionButton, Card, Empty, Heading, Hint, LabelRow, Page, Status } from '../../../ui/kit';
export default function Escalations(){const {data,dispatch}=useDemo();const {state}=useModeration();
 const cases=state.reports.filter(r=>r.status==='escalated'&&!data.resolvedEscalations.includes(r.id));
 return <Page title="Escalated cases" subtitle="Review Moderator requests that need Admin action">
  {cases.length===0?<Empty text="No open escalated cases. A Moderator can escalate a report to create one."/>:cases.map(r=><Card key={r.id}>
  <Heading>{r.targetTitle}</Heading><Status value={r.status}/><LabelRow label="Reason" value={r.reason}/><LabelRow label="Details" value={r.details}/>
  <ActionButton label="Inspect affected user" outline onPress={()=>router.push(`/admin/user/${r.targetUserId}`)}/>
  <ActionButton label="Mark case reviewed" onPress={()=>Alert.alert('Resolve Admin review?', 'This records local case completion and does not automatically suspend the account.',[
   {text:'Cancel',style:'cancel'},{text:'Resolve',onPress:()=>dispatch({type:'RESOLVE_ESCALATION',id:r.id})}])}/></Card>)}
 <Card><Hint>In the real app, Admin decisions and suspension reasons will be written to server audit logs.</Hint></Card>
 </Page>;
}
