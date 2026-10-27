import { router } from 'expo-router';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { useMemo, useState } from 'react';
import { useModeration } from '../../../moderation/state';
import { Body, Card, Empty, FormInput, Heading, Hint, Page, Status } from '../../../ui/kit';
import { colors } from '../../../ui/theme';

export default function Reports() {
  const {state,hydrated}=useModeration();
  const [query,setQuery]=useState('');
  const [openOnly,setOpenOnly]=useState(true);
  const filtered=useMemo(()=>state.reports.filter(r=>(!openOnly || r.status==='open') &&
    `${r.targetTitle} ${r.reason} ${r.kind}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a,b)=>b.createdAt.localeCompare(a.createdAt)),[state.reports,query,openOnly]);
  return <Page title="Reported content" subtitle="Investigate reported users and tuition posts. Moderators cannot suspend accounts.">
    <Card><Heading>{state.reports.filter(r=>r.status==='open').length} open reports</Heading><Hint>Choose a report to inspect it and record a decision.</Hint></Card>
    <FormInput label="Find reports" value={query} onChangeText={setQuery} placeholder="Search title or reason" />
    <Pressable accessibilityRole="button" accessibilityLabel="Toggle resolved reports" onPress={()=>setOpenOnly(v=>!v)}>
      <Hint>{openOnly ? 'Showing open reports. Tap to show all.' : 'Showing all reports. Tap to show open only.'}</Hint>
    </Pressable>
    {!hydrated ? <ActivityIndicator size="large" color={colors.primary}/> : filtered.length===0 ?
      <Empty text="No reports found for this filter."/> : filtered.map(r=><Pressable
        key={r.id} accessibilityRole="button" accessibilityLabel={`Inspect report ${r.id}`} onPress={()=>router.push(`/moderator/report/${r.id}`)}>
        <Card><View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:9}}>
          <Heading>{r.kind==='post'?'Post report':'User report'}</Heading><Status value={r.status}/>
        </View><Body>{r.targetTitle}</Body><Hint>{r.reason}</Hint><Hint>Reference: {r.id}</Hint></Card>
      </Pressable>)}
  </Page>;
}
