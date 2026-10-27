import { router } from 'expo-router';
import { Alert } from 'react-native';
import { useDemo } from '../../../demo/state';
import { ActionButton, Card, Empty, Heading, Hint, Page, Status } from '../../../ui/kit';
export default function MyPosts(){const {data,user,dispatch}=useDemo();const posts=data.posts.filter(p=>p.ownerId===user?.id);
 return <Page title="My tuition posts" subtitle="Manage your open, filled and closed requests">
  <ActionButton label="Create a tuition post" onPress={()=>router.push('/student/post-editor')}/>
  {posts.length===0?<Empty text="You have not created a tuition post yet."/>:posts.map(p=><Card key={p.id}>
   <Heading>Class {p.classLevel} · {p.subject}</Heading><Status value={p.status}/><Hint>{p.area} · BDT {p.salaryBDT.toLocaleString()}/month · {p.daysPerWeek} days/week</Hint>
   <ActionButton label="View applicants" onPress={()=>router.push(`/student/applicants/${p.id}`)}/>
   {p.status==='open'&&<ActionButton label="Edit post" outline onPress={()=>router.push({pathname:'/student/post-editor',params:{id:p.id}})}/>}
   {p.status==='open'&&<ActionButton label="Close post" danger onPress={()=>Alert.alert('Close tuition post?','Tutors will no longer be able to apply.',[
    {text:'Cancel',style:'cancel'},{text:'Close',onPress:()=>dispatch({type:'CLOSE_POST',id:p.id})}])}/>}
  </Card>)}
 </Page>;
}
