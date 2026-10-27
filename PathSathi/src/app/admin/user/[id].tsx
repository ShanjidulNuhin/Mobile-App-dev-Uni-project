import { useLocalSearchParams,router } from 'expo-router';
import { Alert } from 'react-native';
import { useState } from 'react';
import { useDemo } from '../../../demo/state';
import { ActionButton, Card, DetailPage, Empty, FormInput, Heading, Hint, LabelRow, Status } from '../../../ui/kit';
export default function UserDetails(){const {id}=useLocalSearchParams<{id:string}>();const {data,user,dispatch}=useDemo();
 const u=data.accounts.find(a=>a.id===id);const [reason,setReason]=useState('');if(!u)return <DetailPage><Empty text="User not found"/></DetailPage>;
 function toggle(){if(reason.trim().length<10){Alert.alert('Reason required','Enter at least 10 characters for the Admin record.');return;}
  Alert.alert(u.suspended?'Unsuspend user?':'Suspend user?',reason.trim(),[
    {text:'Cancel',style:'cancel'},{text:'Confirm',onPress:()=>{dispatch({type:'SUSPEND',id:u.id,suspended:!u.suspended});router.back();}},
  ]);}
 return <DetailPage><Card><Heading>{u.name}</Heading><Status value={u.suspended?'suspended':'active'}/>
  <LabelRow label="Role" value={u.role}/><LabelRow label="Email" value={u.email}/><LabelRow label="Area" value={u.area}/></Card>
  <Card><Heading>Admin decision</Heading><FormInput label="Action reason" value={reason} onChangeText={setReason} multiline placeholder="Explain the decision"/>
   <ActionButton label={u.suspended?'Unsuspend user':'Suspend user'} danger={!u.suspended} disabled={u.id===user?.id} onPress={toggle}/>
   {u.id===user?.id&&<Hint>You cannot suspend your own active Admin demo session.</Hint>}
   <Hint>Final implementation must store action reasons in a protected Admin audit log.</Hint></Card>
 </DetailPage>;
}
