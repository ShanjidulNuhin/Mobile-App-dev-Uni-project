import { router,useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { makeId, useDemo } from '../../demo/state';
import { ActionButton, Card, FormInput, Hint, Page } from '../../ui/kit';
export default function PostEditor(){
 const {id,subject:defaultSubject}=useLocalSearchParams<{id?:string;subject?:string}>();
 const {data,user,dispatch}=useDemo();const existing=useMemo(()=>data.posts.find(p=>p.id===id&&p.ownerId===user?.id),[data.posts,id,user?.id]);
 const [subject,setSubject]=useState(existing?.subject??defaultSubject??'');const [classLevel,setClass]=useState(existing?.classLevel??'');
 const [area,setArea]=useState(existing?.area??'');const [salary,setSalary]=useState(String(existing?.salaryBDT??''));
 const [days,setDays]=useState(String(existing?.daysPerWeek??''));
 function save(){if(!user)return;const amount=Number(salary),count=Number(days);
   if(subject.trim().length<2||!classLevel.trim()||area.trim().length<3||!Number.isFinite(amount)||amount<=0||!Number.isInteger(count)||count<1||count>7){
     Alert.alert('Invalid post','Provide subject, class, area, monthly salary above zero, and days per week from 1 to 7.');return;}
   dispatch({type:'SAVE_POST',post:{id:existing?.id??makeId('post'),ownerId:user.id,subject:subject.trim(),classLevel:classLevel.trim(),area:area.trim(),salaryBDT:amount,daysPerWeek:count,status:existing?.status??'open',acceptedTutorId:existing?.acceptedTutorId}});
   router.replace('/student/posts');}
 return <Page title={existing?'Edit tuition post':'Create tuition post'} subtitle="Salary is in Bangladeshi taka per month">
  <Card><FormInput label="Subject" value={subject} onChangeText={setSubject} placeholder="Mathematics"/>
   <FormInput label="Class level" value={classLevel} onChangeText={setClass} placeholder="10"/>
   <FormInput label="Area" value={area} onChangeText={setArea} placeholder="Dhanmondi, Dhaka"/>
   <FormInput label="Monthly salary (BDT)" value={salary} onChangeText={setSalary} placeholder="6500"/>
   <FormInput label="Days per week" value={days} onChangeText={setDays} placeholder="4"/>
   <ActionButton label="Save tuition post" onPress={save}/></Card><Hint>Posts are saved locally and shared between demo roles on this device.</Hint>
 </Page>;
}
