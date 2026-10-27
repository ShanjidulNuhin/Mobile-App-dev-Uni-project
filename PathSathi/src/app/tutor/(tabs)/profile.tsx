import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useDemo } from '../../../demo/state';
import { useModeration } from '../../../moderation/state';
import { ActionButton, Card, FormInput, Heading, Hint, LabelRow, Page, Status } from '../../../ui/kit';
export default function TutorProfile(){const {user}=useDemo();const {state,dispatch}=useModeration();
 const existing=state.tutors.find(t=>t.userId===user?.id);
 const [university,setUniversity]=useState(existing?.university??'');const [degree,setDegree]=useState(existing?.degree??'');
 const [subjects,setSubjects]=useState(existing?.subjects.join(', ')??'');const [experience,setExperience]=useState(String(existing?.experienceYears??''));
 const [salary,setSalary]=useState(String(existing?.expectedSalaryBDT??''));
 function submit(){if(!user || university.trim().length<2 ||degree.trim().length<2||!subjects.trim()||Number(experience)<0||Number(salary)<=0){
   Alert.alert('Complete your profile','Enter education, subjects, valid experience and expected salary.');return;}
   dispatch({type:'UPSERT_TUTOR',tutor:{id:existing?.id??`tv-${Date.now()}`,userId:user.id,name:user.name,university:university.trim(),degree:degree.trim(),subjects:subjects.split(',').map(x=>x.trim()).filter(Boolean),classLevels:existing?.classLevels??['8','9','10'],area:user.area,experienceYears:Number(experience),expectedSalaryBDT:Number(salary),submittedAt:new Date().toISOString(),verificationStatus:'pending'}});
   Alert.alert('Submitted for review','A Moderator can now review your profile in the demo.');}
 return <Page title="Tutor profile" subtitle="Submit your qualifications for Moderator review">
   <Card><Heading>{user?.name}</Heading><Status value={existing?.verificationStatus??'not submitted'}/><LabelRow label="Area" value={user?.area??''}/>
    <Hint>Approval means a moderator reviewed the submitted information, not guaranteed identity verification.</Hint></Card>
   <Card><FormInput label="University" value={university} onChangeText={setUniversity}/>
    <FormInput label="Degree" value={degree} onChangeText={setDegree}/>
    <FormInput label="Subjects (comma separated)" value={subjects} onChangeText={setSubjects}/>
    <FormInput label="Years of experience" value={experience} onChangeText={setExperience}/>
    <FormInput label="Expected monthly salary (BDT)" value={salary} onChangeText={setSalary}/>
    <ActionButton label="Submit for verification" onPress={submit}/></Card>
   <ActionButton label="View my account" outline onPress={()=>router.push('/account')}/>
 </Page>;
}
