import { router } from 'expo-router';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { useMemo, useState } from 'react';
import { useModeration } from '../../../moderation/state';
import { ActionButton, Body, Card, Empty, Heading, Hint, Page, FormInput, Status } from '../../../ui/kit';
import { colors } from '../../../ui/theme';

export default function VerificationQueue() {
  const {state,hydrated}=useModeration();
  const [query,setQuery]=useState('');
  const pending=useMemo(()=>state.tutors.filter(t=>t.verificationStatus==='pending' &&
    `${t.name} ${t.university} ${t.area} ${t.subjects.join(' ')}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a,b)=>a.submittedAt.localeCompare(b.submittedAt)),[state.tutors,query]);
  return <Page title="Tutor verification" subtitle="Review tutor submissions before they can apply to tuition posts.">
    <Card><Heading>{state.tutors.filter(t=>t.verificationStatus==='pending').length} waiting for review</Heading><Hint>Demo data, stored locally on this device.</Hint></Card>
    <FormInput label="Search submissions" value={query} onChangeText={setQuery} placeholder="Name, university, area, subject" />
    {!hydrated ? <ActivityIndicator size="large" color={colors.primary}/> : pending.length===0 ?
      <Empty text="No pending submissions match your search." /> : pending.map(t=><Pressable
        key={t.id} accessibilityRole="button" accessibilityLabel={`Review ${t.name}`} onPress={()=>router.push(`/moderator/tutor/${t.id}`)}>
        <Card><View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:8}}>
          <Heading>{t.name}</Heading><Status value={t.verificationStatus}/>
        </View><Body>{t.degree} | {t.university}</Body><Hint>{t.area} | {t.subjects.join(', ')}</Hint>
        <ActionButton label="Review submission" onPress={()=>router.push(`/moderator/tutor/${t.id}`)}/>
        </Card></Pressable>)}
  </Page>;
}
