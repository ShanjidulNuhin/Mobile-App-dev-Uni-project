import { router } from 'expo-router';
import { View } from 'react-native';
import { ActionButton, Body, Card, Heading, Hint, Page } from '../ui/kit';
export default function Welcome(){return <Page title="PathSathi" subtitle="Find a tutor. Find an opportunity. Built for Bangladesh.">
  <Card><Heading>Tuition matching, made simple</Heading><Body>Browse tutors, post tuition requests, apply for opportunities and track decisions in one place.</Body></Card>
  <ActionButton label="Create Student / Guardian account" onPress={()=>router.push({pathname:'/register',params:{role:'student'}})}/>
  <ActionButton label="Create Tutor account" outline onPress={()=>router.push({pathname:'/register',params:{role:'tutor'}})}/>
  <ActionButton label="Open demo sign in" onPress={()=>router.push('/login')}/>
  <Card><Heading>University prototype</Heading><Hint>For the midterm, demo sign in lets you view all four roles using fictional records. It is not real authentication. Admin and Moderator accounts cannot register publicly.</Hint></Card>
 </Page>}
