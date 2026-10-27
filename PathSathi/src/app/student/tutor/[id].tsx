import { router,useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useModeration } from '../../../moderation/state';
import { ActionButton, Body, Card, DetailPage, Empty, FormInput, Heading, Hint, LabelRow, Status } from '../../../ui/kit';
export default function TutorDetails(){const {id}=useLocalSearchParams<{id:string}>();
 const {state,dispatch}=useModeration();const t=state.tutors.find(x=>x.id===id);const [reason,setReason]=useState('');
 if(!t)return <DetailPage><Empty text="Tutor not found"/></DetailPage>;
 function report(){if(reason.trim().length<12){Alert.alert('Describe the issue','Please write at least 12 characters.');return;}
   dispatch({type:'ADD_REPORT',report:{id:`rep-${Date.now()}`,kind:'user',targetId:t.userId,targetUserId:t.userId,targetTitle:`Tutor account: ${t.name}`,reporterName:'Demo Student',reason:'Profile concern',details:reason.trim(),createdAt:new Date().toISOString(),status:'open'}});
   Alert.alert('Report saved','The Moderator can now review this demo report.');setReason('');}
 return <DetailPage><Card><Heading>{t.name}</Heading><Status value={t.verificationStatus}/>
  <LabelRow label="Education" value={`${t.degree}, ${t.university}`}/><LabelRow label="Experience" value={`${t.experienceYears} years`}/>
  <LabelRow label="Subjects" value={t.subjects.join(', ')}/><LabelRow label="Class levels" value={t.classLevels.join(', ')}/>
  <LabelRow label="Area" value={t.area}/><LabelRow label="Expected salary" value={`BDT ${t.expectedSalaryBDT}/month`}/></Card>
  <ActionButton label="Create a tuition request" onPress={()=>router.push({pathname:'/student/post-editor',params:{subject:t.subjects[0]}})}/>
  <Card><Heading>Report a concern</Heading><FormInput label="Reason for report" value={reason} onChangeText={setReason} multiline placeholder="Explain the problem with the profile"/>
  <ActionButton label="Send report (demo)" outline onPress={report}/><Hint>All reports in this prototype are fictional test data.</Hint></Card></DetailPage>;
}
