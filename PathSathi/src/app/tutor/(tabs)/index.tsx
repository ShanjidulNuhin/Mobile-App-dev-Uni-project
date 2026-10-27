import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { useDemo } from '../../../demo/state';
import { useModeration } from '../../../moderation/state';
import { Body, Card, Empty, FormInput, Heading, Hint, Page, Status } from '../../../ui/kit';
export default function TuitionBoard(){
 const {data}=useDemo();const {state}=useModeration();const [query,setQuery]=useState('');
 const visible=data.posts.filter(p=>p.status==='open'&&!state.reports.some(r=>r.kind==='post'&&r.targetId===p.id&&r.status==='removed') &&
  `${p.subject} ${p.area} ${p.classLevel}`.toLowerCase().includes(query.toLowerCase()));
 return <Page title="Tuition board" subtitle="Find open tutoring opportunities">
 <FormInput label="Search tuition posts" value={query} onChangeText={setQuery} placeholder="Subject, class or area"/>
 {visible.length===0?<Empty text="No open tuition requests match this search."/>:visible.map(p=><Pressable key={p.id} accessibilityRole="button" onPress={()=>router.push(`/tutor/post/${p.id}`)}>
   <Card><Heading>Class {p.classLevel} · {p.subject}</Heading><Status value="open"/><Body>{p.area}</Body><Hint>BDT {p.salaryBDT.toLocaleString()}/month · {p.daysPerWeek} days/week</Hint></Card></Pressable>)}
 </Page>;
}
