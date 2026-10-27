import { Alert,Pressable,Text,View } from 'react-native';
import { useState } from 'react';
import { useDemo } from '../../demo/state';
import { ActionButton, Card, FormInput, Heading, Hint, Page } from '../../ui/kit';
export default function Categories(){const {data,dispatch}=useDemo();const [subject,setSubject]=useState('');const [level,setLevel]=useState('');
 function add(category:'subjects'|'classLevels',item:string,clear:()=>void){const value=item.trim();if(!value)return;
  if(data[category].some(x=>x.toLowerCase()===value.toLowerCase())){Alert.alert('Already exists');return;}
  dispatch({type:'CATEGORY',category,values:[...data[category],value]});clear();}
 function remove(category:'subjects'|'classLevels',value:string){dispatch({type:'CATEGORY',category,values:data[category].filter(x=>x!==value)})}
 return <Page title="Categories" subtitle="Manage subjects and class levels used in filters">
 <Card><Heading>Subjects</Heading><FormInput label="New subject" value={subject} onChangeText={setSubject}/>
  <ActionButton label="Add subject" onPress={()=>add('subjects',subject,()=>setSubject(''))}/>
  {data.subjects.map(v=><Pressable accessibilityRole="button" key={v} onPress={()=>Alert.alert('Delete subject?',v,[{text:'Cancel',style:'cancel'},{text:'Delete',onPress:()=>remove('subjects',v)}])}>
  <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:6}}><Text>{v}</Text><Text style={{color:'#B54343'}}>Remove</Text></View></Pressable>)}</Card>
 <Card><Heading>Class levels</Heading><FormInput label="New class level" value={level} onChangeText={setLevel}/>
  <ActionButton label="Add class" onPress={()=>add('classLevels',level,()=>setLevel(''))}/>
  {data.classLevels.map(v=><Pressable accessibilityRole="button" key={v} onPress={()=>Alert.alert('Delete class?',v,[{text:'Cancel',style:'cancel'},{text:'Delete',onPress:()=>remove('classLevels',v)}])}>
  <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:6}}><Text>Class {v}</Text><Text style={{color:'#B54343'}}>Remove</Text></View></Pressable>)}</Card>
 <Hint>Server validation must prevent deleting a category still referenced by existing records.</Hint>
 </Page>;
}
