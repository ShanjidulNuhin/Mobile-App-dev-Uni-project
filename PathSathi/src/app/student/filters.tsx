import { router } from 'expo-router';
import { useState } from 'react';
import { ActionButton, Card, FormInput, Hint, Page } from '../../ui/kit';
export default function TutorFilters(){
 const [subject,setSubject]=useState('');const [area,setArea]=useState('');
 return <Page title="Tutor filters" subtitle="Narrow tutors by subject and area">
  <Card><FormInput label="Subject" value={subject} onChangeText={setSubject} placeholder="e.g. Mathematics"/>
  <FormInput label="Area" value={area} onChangeText={setArea} placeholder="e.g. Mirpur"/>
  <ActionButton label="Apply filters" onPress={()=>router.replace({pathname:'/student',params:{subject,area}})}/>
  <ActionButton label="Clear filters" outline onPress={()=>router.replace('/student')}/></Card>
  <Hint>The full SRS also includes class level, salary range, education and experience filters. We will add those after this working foundation.</Hint>
 </Page>;
}
