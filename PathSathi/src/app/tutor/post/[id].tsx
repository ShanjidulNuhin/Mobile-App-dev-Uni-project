import { useLocalSearchParams,router } from 'expo-router';
import { Alert } from 'react-native';
import { useState } from 'react';
import { makeId,useDemo } from '../../../demo/state';
import { useModeration } from '../../../moderation/state';
import { ActionButton, Card, DetailPage, Empty, FormInput, Heading, Hint, LabelRow, Status } from '../../../ui/kit';
export default function TuitionDetail(){const {id}=useLocalSearchParams<{id:string}>();const {data,user,dispatch}=useDemo();const {state}=useModeration();
 const p=data.posts.find(x=>x.id===id);const [message,setMessage]=useState('');
 if(!p)return <DetailPage><Empty text="Tuition post not found"/></DetailPage>;
 const verified=state.tutors.some(t=>t.userId===user?.id&&t.verificationStatus==='approved');
 const applied=data.applications.some(a=>a.tutorId===user?.id&&a.postId===p.id);
 const removed=state.reports.some(r=>r.kind==='post'&&r.targetId===p.id&&r.status==='removed');
 function apply(){if(!user||!verified||applied||p.status!=='open'||removed)return;
  if(message.trim().length<12){Alert.alert('Message too short','Write at least 12 characters.');return;}
  dispatch({type:'APPLY',application:{id:makeId('app'),postId:p.id,tutorId:user.id,message:message.trim(),status:'pending'}});
  Alert.alert('Application submitted','Your application is now pending.');router.replace('/tutor/applications');}
 return <DetailPage><Card><Heading>Class {p.classLevel} · {p.subject}</Heading><Status value={p.status}/>
  <LabelRow label="Area" value={p.area}/><LabelRow label="Monthly salary" value={`BDT ${p.salaryBDT}`}/>
  <LabelRow label="Days per week" value={p.daysPerWeek}/></Card>
  {removed?<Card><Hint>This post was removed after moderation.</Hint></Card>:
   !verified?<Card><Hint>Your tutor profile must be approved before applying. Open the Profile tab and submit for review.</Hint></Card>:
   applied?<Card><Hint>You have already applied to this post.</Hint></Card>:
   p.status!=='open'?<Card><Hint>This post is no longer open.</Hint></Card>:
   <Card><FormInput label="Application message" multiline placeholder="Explain your availability and teaching experience" value={message} onChangeText={setMessage}/>
     <ActionButton label="Apply for tuition" onPress={apply}/></Card>}
 </DetailPage>;
}
