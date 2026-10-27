import { router } from 'expo-router';
import { useDemo } from '../../../demo/state';
import { useModeration } from '../../../moderation/state';
import { ActionButton, Card, Heading, Hint, LabelRow, Page } from '../../../ui/kit';
export default function AdminDashboard(){const {data}=useDemo();const {state}=useModeration();
 return <Page title="Admin dashboard" subtitle="Platform activity · Demo overview">
 <Card><Heading>Platform summary</Heading>
  <LabelRow label="Total users" value={data.accounts.length}/><LabelRow label="Active posts" value={data.posts.filter(p=>p.status==='open').length}/>
  <LabelRow label="Accepted applications" value={data.applications.filter(a=>a.status==='accepted').length}/>
  <LabelRow label="Escalated cases" value={state.reports.filter(r=>r.status==='escalated'&&!data.resolvedEscalations.includes(r.id)).length}/></Card>
 <ActionButton label="Manage subjects and class levels" onPress={()=>router.push('/admin/categories')}/>
 <ActionButton label="My account" outline onPress={()=>router.push('/account')}/>
 <Card><Hint>Only Admin can suspend users. The demo has no real server or security; server-side role checks will be implemented later.</Hint></Card>
 </Page>;
}
