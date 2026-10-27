import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';

export type Role = 'student' | 'tutor' | 'moderator' | 'admin';
export type Account = { id:string; name:string; email:string; role:Role; area:string; suspended:boolean };
export type TuitionPost = { id:string; ownerId:string; subject:string; classLevel:string; area:string; salaryBDT:number; daysPerWeek:number; status:'open'|'filled'|'closed'; acceptedTutorId?:string };
export type Application = { id:string; postId:string; tutorId:string; message:string; status:'pending'|'accepted'|'rejected' };
export type Group = { name:string; values:string[] };
export type DemoData = { accounts:Account[]; posts:TuitionPost[]; applications:Application[]; subjects:string[]; classLevels:string[]; resolvedEscalations:string[] };
export type DemoAction =
  | {type:'LOAD';payload:DemoData} | {type:'REGISTER';account:Account} | {type:'PROFILE';id:string;name:string;area:string}
  | {type:'SAVE_POST';post:TuitionPost} | {type:'CLOSE_POST';id:string}
  | {type:'APPLY';application:Application} | {type:'DECIDE';id:string;accept:boolean}
  | {type:'SUSPEND';id:string;suspended:boolean} | {type:'ADD_MODERATOR';account:Account}
  | {type:'CATEGORY';category:'subjects'|'classLevels';values:string[]}
  | {type:'RESOLVE_ESCALATION';id:string};
const SEED:DemoData = {
  accounts: [
    {id:'stu1',name:'Samia Rahman',email:'samia@example.test',role:'student',area:'Dhanmondi, Dhaka',suspended:false},
    {id:'u-101',name:'Nafisa Rahman',email:'nafisa@example.test',role:'tutor',area:'Dhanmondi, Dhaka',suspended:false},
    {id:'mod1',name:'Demo Moderator',email:'moderator@example.test',role:'moderator',area:'Dhaka',suspended:false},
    {id:'admin1',name:'Demo Admin',email:'admin@example.test',role:'admin',area:'Dhaka',suspended:false},
    {id:'u-104',name:'Mahir Hasan',email:'mahir@example.test',role:'tutor',area:'Mirpur, Dhaka',suspended:false},
    {id:'u-201',name:'Example Guardian 201',email:'guardian201@example.test',role:'student',area:'Mirpur, Dhaka',suspended:false},
    {id:'u-202',name:'Example Tutor 202',email:'tutor202@example.test',role:'tutor',area:'Dhaka',suspended:false},
    {id:'u-203',name:'Example Guardian 203',email:'guardian203@example.test',role:'student',area:'Uttara, Dhaka',suspended:false},
  ],
  posts: [
    {id:'post-19',ownerId:'stu1',subject:'Mathematics',classLevel:'10',area:'Mirpur, Dhaka',salaryBDT:6500,daysPerWeek:4,status:'open'},
    {id:'post-23',ownerId:'stu1',subject:'English',classLevel:'8',area:'Uttara, Dhaka',salaryBDT:5500,daysPerWeek:3,status:'open'},
  ],
  applications: [{id:'app1',postId:'post-19',tutorId:'u-104',message:'I can teach four evenings each week.',status:'pending'}],
  subjects:['Mathematics','English','Physics','Chemistry','ICT','Bangla'],
  classLevels:['6','7','8','9','10','11','12'], resolvedEscalations:[],
};
function initial():DemoData { return JSON.parse(JSON.stringify(SEED)) as DemoData; }
function reducer(state:DemoData,action:DemoAction):DemoData {
  switch(action.type){
    case 'LOAD':return action.payload;
    case 'REGISTER':case 'ADD_MODERATOR':return {...state,accounts:[...state.accounts,action.account]};
    case 'PROFILE':return {...state,accounts:state.accounts.map(a=>a.id===action.id?{...a,name:action.name,area:action.area}:a)};
    case 'SAVE_POST':return {...state,posts:state.posts.some(p=>p.id===action.post.id)?state.posts.map(p=>p.id===action.post.id?action.post:p):[action.post,...state.posts]};
    case 'CLOSE_POST':return {...state,posts:state.posts.map(p=>p.id===action.id?{...p,status:'closed'}:p)};
    case 'APPLY':return {...state,applications:[action.application,...state.applications]};
    case 'DECIDE':{
      const chosen=state.applications.find(a=>a.id===action.id);
      if(!chosen) return state;
      return {...state,
        applications:state.applications.map(a=>a.id===action.id?{...a,status:action.accept?'accepted':'rejected'}:
          (action.accept && a.postId===chosen.postId && a.status==='pending'?{...a,status:'rejected'}:a)),
        posts:state.posts.map(p=>(action.accept && p.id===chosen.postId)?{...p,status:'filled',acceptedTutorId:chosen.tutorId}:p)};
    }
    case 'SUSPEND':return {...state,accounts:state.accounts.map(a=>a.id===action.id?{...a,suspended:action.suspended}:a)};
    case 'CATEGORY':return {...state,[action.category]:action.values};
    case 'RESOLVE_ESCALATION':return {...state,resolvedEscalations:[...state.resolvedEscalations,action.id]};
    default:return state;
  }
}
interface DemoCtx { data:DemoData; dispatch:React.Dispatch<DemoAction>; user:Account|null; hydrated:boolean;
  enter:(id:string)=>void; signOut:()=>void; register:(name:string,email:string,area:string,role:'student'|'tutor')=>boolean; }
const Context=createContext<DemoCtx|null>(null);
const KEY='@pathsathi_shared_demo_v1';
export function DemoProvider({children}:{children:React.ReactNode}){
  const [data,dispatch]=useReducer(reducer,undefined,initial);
  const [sessionId,setSessionId]=useState<string|null>(null);
  const [hydrated,setHydrated]=useState(false);
  useEffect(()=>{let mounted=true;AsyncStorage.getItem(KEY).then(raw=>{
    if(mounted&&raw){const next=JSON.parse(raw) as DemoData;
      if(Array.isArray(next.accounts)&&Array.isArray(next.posts)&&Array.isArray(next.applications))dispatch({type:'LOAD',payload:next});}
  }).catch(()=>{}).finally(()=>{if(mounted)setHydrated(true)});return()=>{mounted=false};},[]);
  useEffect(()=>{if(hydrated)AsyncStorage.setItem(KEY,JSON.stringify(data)).catch(()=>{});},[data,hydrated]);
  const user=data.accounts.find(a=>a.id===sessionId && !a.suspended)??null;
  function register(name:string,email:string,area:string,role:'student'|'tutor'){
    if(data.accounts.some(a=>a.email.toLowerCase()===email.toLowerCase()))return false;
    const id='user-'+Date.now();
    dispatch({type:'REGISTER',account:{id,name,email,area,role,suspended:false}});setSessionId(id);return true;
  }
  return <Context.Provider value={{data,dispatch,user,hydrated,enter:setSessionId,signOut:()=>setSessionId(null),register}}>{children}</Context.Provider>;
}
export function useDemo(){const v=useContext(Context);if(!v)throw new Error('DemoProvider missing');return v;}
export const makeId=(prefix:string)=>`${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,5)}`;
