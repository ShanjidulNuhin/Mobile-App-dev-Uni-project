import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { useModeration } from '../../../moderation/state';
import type { ActionType } from '../../../moderation/types';
import { Body, Card, Empty, FormInput, Heading, Hint, Page, Status, ActionButton } from '../../../ui/kit';

const TYPES: Array<'ALL'|ActionType>=['ALL','APPROVE_TUTOR','REJECT_TUTOR','REMOVE_POST','DISMISS_REPORT','WARN_USER','ESCALATE_ADMIN'];
export default function History() {
  const {state}=useModeration();
  const [type,setType]=useState<'ALL'|ActionType>('ALL');
  const [date,setDate]=useState('');
  const dateInvalid=!!date && !/^\d{4}-\d{2}-\d{2}$/.test(date);
  const filtered=useMemo(()=>state.history.filter(h=>(type==='ALL'||h.type===type)&&(!date||h.createdAt.startsWith(date)))
    .sort((a,b)=>b.createdAt.localeCompare(a.createdAt)),[state.history,type,date]);
  const currentIndex=TYPES.indexOf(type);
  return <Page title="Moderation history" subtitle="An audit trail of approvals, rejections, removals, warnings and escalations.">
    <Card><Heading>{state.history.length} recorded actions</Heading><Hint>Filters apply to this device's demo records.</Hint></Card>
    <ActionButton label={`Action: ${type.replace(/_/g,' ')} (tap to change)`} outline onPress={()=>setType(TYPES[(currentIndex+1)%TYPES.length])}/>
    <FormInput label="Filter by date (optional)" value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" error={dateInvalid?'Use YYYY-MM-DD.':undefined}/>
    {dateInvalid ? <Hint>Correct the date to filter results.</Hint> : filtered.length===0 ? <Empty text="No moderation actions match these filters."/> :
      filtered.map(item=><Card key={item.id}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:8}}>
          <Heading>{item.type.replace(/_/g,' ')}</Heading><Status value="logged"/>
        </View><Body>{item.targetLabel}</Body><Hint>{item.reason || 'No additional note.'}</Hint>
        <Hint>{new Date(item.createdAt).toLocaleString()}</Hint><Hint>Moderator: {item.actorId}</Hint>
      </Card>)}
  </Page>;
}
