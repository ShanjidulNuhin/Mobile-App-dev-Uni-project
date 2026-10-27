import { useLocalSearchParams } from 'expo-router';
import { useDemo } from '../../../demo/state';
import { Body, Card, DetailPage, Empty, Heading, LabelRow, Status } from '../../../ui/kit';
export default function ApplicationDetails(){const {id}=useLocalSearchParams<{id:string}>();const {data,user}=useDemo();
 const app=data.applications.find(a=>a.id===id&&a.tutorId===user?.id);if(!app)return <DetailPage><Empty text="Application not found"/></DetailPage>;
 const post=data.posts.find(p=>p.id===app.postId);
 return <DetailPage><Card><Heading>Application details</Heading><Status value={app.status}/>
 <LabelRow label="Tuition" value={post?`Class ${post.classLevel} · ${post.subject}`:'Post not available'}/>
 <LabelRow label="Area" value={post?.area??'Unknown'}/><Body>{app.message}</Body></Card></DetailPage>;
}
