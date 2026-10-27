import { router } from 'expo-router';
import { Alert } from 'react-native';
import { useState } from 'react';
import { useDemo } from '../../demo/state';
import { ActionButton, Card, FormInput, Page } from '../../ui/kit';
export default function Edit(){const {user,dispatch}=useDemo();
 const [name,setName]=useState(user?.name??'');const [area,setArea]=useState(user?.area??'');if(!user)return null;
 return <Page title="Edit profile"><Card>
  <FormInput label="Full name" value={name} onChangeText={setName}/><FormInput label="Area" value={area} onChangeText={setArea}/>
  <ActionButton label="Save profile" onPress={()=>{if(name.trim().length<3||area.trim().length<3){Alert.alert('Invalid details','Name and area must have 3 or more characters.');return;}
   dispatch({type:'PROFILE',id:user.id,name:name.trim(),area:area.trim()});router.back();}}/></Card></Page>;
}
