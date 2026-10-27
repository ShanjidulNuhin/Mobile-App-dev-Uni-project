import { router } from 'expo-router';
import { Pressable } from 'react-native';
import { useDemo } from '../../../demo/state';
import { Card, Empty, Heading, Hint, Page, Status } from '../../../ui/kit';
export default function MyApplications(){const {data,user}=useDemo();const apps=data.applications.filter(a=>a.tutorId===user?.id);
 return <Page title="My applications" subtitle="See the status of your tuition requests">
 {apps.length===0?<Empty text="No applications yet. Browse the tuition board to get started."/>:apps.map(a=>{
  const p=data.posts.find(x=>x.id===a.postId);
  return <Pressable accessibilityRole="button" key={a.id} onPress={()=>router.push(`/tutor/application/${a.id}`)}>
   <Card><Heading>{p?`Class ${p.classLevel} · ${p.subject}`:'Unknown post'}</Heading><Status value={a.status}/><Hint>{p?.area??''}</Hint></Card></Pressable>;})}
 </Page>;
}
