import { router, useLocalSearchParams } from 'expo-router';
import { Alert } from 'react-native';
import { useState } from 'react';
import { createRecord, useModeration } from '../../../moderation/state';
import { ActionButton, Card, DetailPage, Empty, FormInput, Heading, Hint, LabelRow, Status } from '../../../ui/kit';

export default function TutorReview() {
  const {id}=useLocalSearchParams<{id:string}>();
  const {state,dispatch,hydrated}=useModeration();
  const [reason,setReason]=useState('');
  if(!hydrated) return <DetailPage><Hint>Loading submission...</Hint></DetailPage>;
  const tutor=state.tutors.find(t=>t.id===id);
  if(!tutor) return <DetailPage><Empty text="Submission not found."/></DetailPage>;
  const isPending=tutor.verificationStatus==='pending';
  function decide(status:'approved'|'rejected') {
    if(!isPending) return;
    const note=reason.trim();
    if(status==='rejected' && note.length<10){Alert.alert('Reason required','Enter at least 10 characters explaining why the application is rejected.');return;}
    Alert.alert(status==='approved'?'Approve tutor?':'Reject tutor?',`Confirm decision for ${tutor.name}.`,[
      {text:'Cancel',style:'cancel'},
      {text:'Confirm',onPress:()=>{
        dispatch({type:'SET_TUTOR_STATUS',tutorId:tutor.id,status,reason:note,
          record:createRecord(status==='approved'?'APPROVE_TUTOR':'REJECT_TUTOR',tutor.id,tutor.name,note||'Profile approved after review')});
        router.back();
      }},
    ]);
  }
  return <DetailPage>
    <Card><Heading>{tutor.name}</Heading><Status value={tutor.verificationStatus}/>
      <LabelRow label="Degree" value={tutor.degree}/><LabelRow label="University" value={tutor.university}/>
      <LabelRow label="Experience" value={`${tutor.experienceYears} years`}/>
      <LabelRow label="Area" value={tutor.area}/><LabelRow label="Subjects" value={tutor.subjects.join(', ')}/>
      <LabelRow label="Class levels" value={tutor.classLevels.join(', ')}/><LabelRow label="Expected salary (BDT/month)" value={tutor.expectedSalaryBDT.toLocaleString()}/>
      <LabelRow label="Submitted" value={new Date(tutor.submittedAt).toLocaleDateString()}/>
    </Card>
    <Card><Heading>Verification checklist</Heading><Hint>For the final application, check authenticated profile information and submitted evidence. Document upload and authenticity checks are not implemented in this demo.</Hint></Card>
    {isPending ? <>
      <FormInput label="Review / rejection reason" placeholder="Explain any missing or incorrect information" value={reason} onChangeText={setReason} multiline />
      <ActionButton label="Approve tutor profile" onPress={()=>decide('approved')}/>
      <ActionButton label="Reject tutor profile" danger onPress={()=>decide('rejected')}/>
    </> : <Card><Hint>Already reviewed. Return to the verification queue or history.</Hint></Card>}
  </DetailPage>;
}
