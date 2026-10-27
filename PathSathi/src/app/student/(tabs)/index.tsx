import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable } from 'react-native';
import { useModeration } from '../../../moderation/state';
import { ActionButton, Body, Card, Empty, FormInput, Heading, Hint, Page, Status } from '../../../ui/kit';
export default function BrowseTutors(){
 const {state}=useModeration();const params=useLocalSearchParams<{subject?:string;area?:string}>();
 const [query,setQuery]=useState('');
 const tutors=useMemo(()=>state.tutors.filter(t=>t.verificationStatus==='approved' &&
 `${t.name} ${t.area} ${t.subjects.join(' ')}`.toLowerCase().includes(query.toLowerCase()) &&
 (!params.subject||t.subjects.some(s=>s.toLowerCase().includes(params.subject!.toLowerCase()))) &&
 (!params.area||t.area.toLowerCase().includes(params.area!.toLowerCase()))),[state.tutors,query,params.subject,params.area]);
 return <Page title="Find a tutor" subtitle="Approved profiles currently available in PathSathi">
  <FormInput label="Search tutors" value={query} onChangeText={setQuery} placeholder="Name, subject or area"/>
  <ActionButton label="Open tutor filters" outline onPress={()=>router.push('/student/filters')}/>
  {tutors.length===0?<Empty text="No tutors match your filters. Try changing the search."/>:tutors.map(t=><Pressable accessibilityRole="button" key={t.id} onPress={()=>router.push(`/student/tutor/${t.id}`)}>
    <Card><Heading>{t.name}</Heading><Status value="approved"/><Body>{t.subjects.join(', ')}</Body><Hint>{t.degree} · {t.area}</Hint>
    <Hint>Expected: BDT {t.expectedSalaryBDT.toLocaleString()}/month</Hint></Card></Pressable>)}
 </Page>;
}
