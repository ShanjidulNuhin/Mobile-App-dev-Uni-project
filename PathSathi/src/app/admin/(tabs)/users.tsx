import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable } from 'react-native';
import { useDemo } from '../../../demo/state';
import { Card, Empty, FormInput, Heading, Hint, Page, Status } from '../../../ui/kit';
export default function Users(){const {data}=useDemo();const [query,setQuery]=useState('');
 const users=useMemo(()=>data.accounts.filter(a=>`${a.name} ${a.email} ${a.role}`.toLowerCase().includes(query.toLowerCase())),[data.accounts,query]);
 return <Page title="User management" subtitle="Search accounts and manage suspension">
 <FormInput label="Search users" value={query} onChangeText={setQuery} placeholder="Name, email, role"/>
 {users.length===0?<Empty text="No matching accounts."/>:users.map(u=><Pressable accessibilityRole="button" key={u.id} onPress={()=>router.push(`/admin/user/${u.id}`)}>
   <Card><Heading>{u.name}</Heading><Status value={u.suspended?'suspended':u.role}/><Hint>{u.email}</Hint></Card></Pressable>)}
 </Page>;
}
