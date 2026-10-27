import { router,useLocalSearchParams } from 'expo-router';
import { Alert,View } from 'react-native';
import { useState } from 'react';
import { useDemo } from '../demo/state';
import { ActionButton, Card, FormInput, Hint, Page } from '../ui/kit';
export default function Register(){
 const {role:requestedRole}=useLocalSearchParams<{role?:string}>();
 const role=requestedRole==='tutor'?'tutor':'student';
 const {register}=useDemo();const [name,setName]=useState('');const [email,setEmail]=useState('');const [area,setArea]=useState('');
 function submit(){if(name.trim().length<3 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())||area.trim().length<3){Alert.alert('Check the form','Enter a valid name, email and area.');return;}
   if(!register(name.trim(),email.trim().toLowerCase(),area.trim(),role)){Alert.alert('Email exists','Choose another email.');return;}
   router.replace('/');}
 return <Page title="Create an account" subtitle={`Role: ${role==='tutor'?'Tutor':'Student / Guardian'}`}>
  <Card><FormInput label="Full name" value={name} onChangeText={setName} placeholder="Your name"/>
  <FormInput label="Email address" value={email} onChangeText={setEmail} placeholder="name@example.com"/>
  <FormInput label="Area" value={area} onChangeText={setArea} placeholder="Uttara, Dhaka"/>
  <ActionButton label="Create local demo account" onPress={submit}/><Hint>No password or genuine login is created. Server authentication will be added in the final-term phase.</Hint></Card>
 </Page>;
}
