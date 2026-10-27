import { router } from 'expo-router';
import { Alert } from 'react-native';
import { useState } from 'react';
import { makeId, useDemo } from '../../demo/state';
import { ActionButton, Card, FormInput, Hint, Page } from '../../ui/kit';
export default function CreateModerator(){const {data,dispatch}=useDemo();const [name,setName]=useState('');const [email,setEmail]=useState('');
 function save(){if(name.trim().length<3||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())||data.accounts.some(a=>a.email.toLowerCase()===email.trim().toLowerCase())){
 Alert.alert('Check moderator information','Enter a valid new name and unique email.');return;}
 dispatch({type:'ADD_MODERATOR',account:{id:makeId('mod'),name:name.trim(),email:email.trim().toLowerCase(),area:'Bangladesh',role:'moderator',suspended:false}});
 router.back();}
 return <Page title="Create moderator" subtitle="Only an Admin can create a moderator account">
 <Card><FormInput label="Full name" value={name} onChangeText={setName}/>
 <FormInput label="Email" value={email} onChangeText={setEmail}/><ActionButton label="Create local demo moderator" onPress={save}/></Card>
 <Hint>In the final backend, account credentials must be created or invited securely.</Hint></Page>;
}
