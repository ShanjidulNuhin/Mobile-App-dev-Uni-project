import { router, useLocalSearchParams } from 'expo-router';
import { Alert } from 'react-native';
import { useState } from 'react';
import { createRecord, useModeration } from '../../../moderation/state';
import { ActionButton, Card, DetailPage, Empty, FormInput, Heading, Hint, LabelRow, Status } from '../../../ui/kit';

export default function ReportDetail() {
  const {id}=useLocalSearchParams<{id:string}>();
  const {state,dispatch,hydrated}=useModeration();
  const [note,setNote]=useState('');
  if(!hydrated) return <DetailPage><Hint>Loading report...</Hint></DetailPage>;
  const report=state.reports.find(r=>r.id===id);
  if(!report) return <DetailPage><Empty text="Report not found."/></DetailPage>;
  const open=report.status==='open';
  function resolve(decision:'dismissed'|'removed') {
    if(!open) return;
    const reason=note.trim();
    if(reason.length<10){Alert.alert('Decision note required','Enter at least 10 characters explaining the decision.');return;}
    Alert.alert('Confirm report decision?',`This report will be marked ${decision}.`,[
      {text:'Cancel',style:'cancel'},
      {text:'Confirm',onPress:()=>{
        dispatch({type:'SET_REPORT_STATUS',reportId:report.id,status:decision,
          record:createRecord(decision==='dismissed'?'DISMISS_REPORT':'REMOVE_POST',report.targetId,report.targetTitle,reason)});
        router.back();
      }},
    ]);
  }
  return <DetailPage><Card>
    <Heading>{report.targetTitle}</Heading><Status value={report.status}/>
    <LabelRow label="Report ID" value={report.id}/><LabelRow label="Content type" value={report.kind}/>
    <LabelRow label="Reason category" value={report.reason}/><LabelRow label="Details" value={report.details}/>
    <LabelRow label="Reported by" value={report.reporterName}/><LabelRow label="Submitted" value={new Date(report.createdAt).toLocaleString()}/>
  </Card>
  {open ? <>
    <FormInput label="Decision note" placeholder="At least 10 characters explaining the decision" value={note} onChangeText={setNote} multiline/>
    <ActionButton label="Dismiss report" outline onPress={()=>resolve('dismissed')}/>
    {report.kind==='post' && <ActionButton label="Remove reported post" danger onPress={()=>resolve('removed')}/>}
    <ActionButton label="Warn user or escalate to Admin" onPress={()=>router.push(`/moderator/action/${report.id}`)}/>
  </> : <Card><Hint>This report has been handled and is read-only in the demo.</Hint></Card>}
  </DetailPage>;
}
