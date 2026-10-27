import { router, useLocalSearchParams } from 'expo-router';
import { Alert } from 'react-native';
import { useState } from 'react';
import { createRecord, useModeration } from '../../../moderation/state';
import { ActionButton, Body, Card, DetailPage, Empty, FormInput, Heading, Hint, LabelRow } from '../../../ui/kit';

export default function WarnEscalate() {
  const {id}=useLocalSearchParams<{id:string}>();
  const {state,dispatch,hydrated}=useModeration();
  const [reason,setReason]=useState('');
  if(!hydrated) return <DetailPage><Hint>Loading case...</Hint></DetailPage>;
  const report=state.reports.find(r=>r.id===id);
  if(!report) return <DetailPage><Empty text="Case not found."/></DetailPage>;
  if(report.status!=='open') return <DetailPage><Empty text="This case has already been resolved."/></DetailPage>;
  function submit(kind:'warned'|'escalated') {
    const trimmed=reason.trim();
    if(trimmed.length<15){Alert.alert('Reason required','Write at least 15 characters explaining your decision.');return;}
    Alert.alert(kind==='warned'?'Send warning?':'Escalate to Admin?',kind==='escalated'
      ? 'You are requesting Admin review. This will not suspend the account.'
      : 'This will record a moderator warning in the demo.',[
      {text:'Cancel',style:'cancel'},
      {text:'Confirm',onPress:()=>{
        dispatch({type:'SET_REPORT_STATUS',reportId:report.id,status:kind,
          record:createRecord(kind==='warned'?'WARN_USER':'ESCALATE_ADMIN',report.targetUserId,report.targetTitle,trimmed)});
        router.replace('/moderator/reports');
      }},
    ]);
  }
  return <DetailPage>
    <Card><Heading>Case review</Heading><LabelRow label="Reported target" value={report.targetTitle}/>
      <LabelRow label="Account ID" value={report.targetUserId}/><LabelRow label="Report reason" value={report.reason}/>
    </Card>
    <Card><Heading>Your authority</Heading><Body>You may issue a warning or ask an Admin to review a possible suspension. Only Admin can suspend or unsuspend users.</Body></Card>
    <FormInput label="Warning message or escalation reason" placeholder="State the rule violation, evidence and next step" value={reason} onChangeText={setReason} multiline/>
    <ActionButton label="Record warning" onPress={()=>submit('warned')}/>
    <ActionButton label="Escalate case to Admin" danger onPress={()=>submit('escalated')}/>
    <Hint>Final integration must send warning messages and escalation requests through the authenticated backend.</Hint>
  </DetailPage>;
}
