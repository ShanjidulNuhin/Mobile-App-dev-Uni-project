import { useLocalSearchParams } from 'expo-router';
import { Alert } from 'react-native';
import { useDemo } from '../../../demo/state';
import { ActionButton, Body, Card, DetailPage, Empty, Heading, Hint, Status } from '../../../ui/kit';
export default function Applicants(){const {id}=useLocalSearchParams<{id:string}>();const {data,user,dispatch}=useDemo();
 const post=data.posts.find(p=>p.id===id&&p.ownerId===user?.id);
 if(!post)return <DetailPage><Empty text="Post not found"/></DetailPage>;
 const apps=data.applications.filter(a=>a.postId===id);
 return <DetailPage><Card><Heading>Applicants for {post.subject}</Heading><Hint>Class {post.classLevel} · {post.area}</Hint><Status value={post.status}/></Card>
  {apps.length===0?<Empty text="No tutors have applied yet."/>:apps.map(a=><Card key={a.id}>
    <Heading>{data.accounts.find(x=>x.id===a.tutorId)?.name??'Tutor'}</Heading><Status value={a.status}/><Body>{a.message}</Body>
    {post.status==='open'&&a.status==='pending'&&<>
     <ActionButton label="Accept tutor" onPress={()=>Alert.alert('Accept this tutor?','This will mark the post as filled and reject other pending applications.',[
       {text:'Cancel',style:'cancel'},{text:'Accept',onPress:()=>dispatch({type:'DECIDE',id:a.id,accept:true})}])}/>
     <ActionButton label="Reject tutor" outline onPress={()=>dispatch({type:'DECIDE',id:a.id,accept:false})}/>
    </>}
   </Card>)}
 </DetailPage>;
}
