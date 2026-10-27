import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './theme';

export function Page({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return <SafeAreaView style={styles.safe} edges={['top','left','right']}>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.page}>
      <Text accessibilityRole="header" style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {children}
    </ScrollView>
  </SafeAreaView>;
}
export function DetailPage({ children }: { children: React.ReactNode }) {
  return <SafeAreaView style={styles.safe} edges={['bottom','left','right']}>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.page}>{children}</ScrollView>
  </SafeAreaView>;
}
export function Card({ children }: { children: React.ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}
export function Heading({ children }: { children: React.ReactNode }) {
  return <Text style={styles.heading}>{children}</Text>;
}
export function Body({ children }: { children: React.ReactNode }) {
  return <Text style={styles.body}>{children}</Text>;
}
export function Hint({ children }: { children: React.ReactNode }) {
  return <Text style={styles.hint}>{children}</Text>;
}
export function Status({ value }: { value: string }) {
  const normalized=value.toLowerCase();
  const warning=['pending','open','escalated','not submitted'].includes(normalized);
  const negative=['rejected','removed','suspended'].includes(normalized);
  return <View style={[styles.status, { backgroundColor: negative ? colors.dangerPale : warning ? colors.amberPale : colors.primaryPale }]}>
    <Text style={{ color: negative ? colors.danger : warning ? colors.amber : colors.primary, fontWeight:'700', fontSize:12 }}>{value.toUpperCase()}</Text>
  </View>;
}
export function ActionButton({ label, onPress, danger=false, outline=false, disabled=false }: {
  label:string; onPress:()=>void; danger?:boolean; outline?:boolean; disabled?:boolean;
}) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label} disabled={disabled} onPress={onPress}
    style={({pressed}) => [styles.button, outline && styles.buttonOutline, danger && !outline && {backgroundColor:colors.danger}, disabled && {opacity:0.5}, pressed && {opacity:0.75}]}>
    <Text style={[styles.buttonText, outline && {color:colors.ink}]}>{label}</Text>
  </Pressable>;
}
export function FormInput({ label, value, onChangeText, placeholder, error, multiline=false }: {
  label:string; value:string; onChangeText:(v:string)=>void; placeholder?:string; error?:string; multiline?:boolean;
}) {
  return <View style={styles.formGroup}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput accessibilityLabel={label} value={value} onChangeText={onChangeText}
      placeholder={placeholder} placeholderTextColor="#8B98A7" multiline={multiline}
      textAlignVertical={multiline ? 'top' : 'center'} style={[styles.input, multiline && {height:110}, !!error && {borderColor:colors.danger}]} />
    {!!error && <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}
  </View>;
}
export function Empty({ text }: { text:string }) {
  return <Card><Hint>{text}</Hint></Card>;
}
export function LabelRow({ label, value }: { label: string; value: string | number }) {
  return <View style={styles.labelRow}><Text style={styles.label}>{label}</Text><Text style={styles.value}>{String(value)}</Text></View>;
}
export const styles=StyleSheet.create({
  safe:{flex:1,backgroundColor:colors.canvas},
  page:{padding:20,paddingBottom:50,gap:13},
  title:{fontSize:27,fontWeight:'800',color:colors.ink},
  subtitle:{fontSize:14,color:colors.muted,lineHeight:21,marginTop:-5,marginBottom:3},
  card:{backgroundColor:colors.white,borderColor:colors.border,borderWidth:1,borderRadius:16,padding:17,gap:10},
  heading:{fontSize:17,fontWeight:'700',color:colors.ink},
  body:{fontSize:14,color:colors.ink,lineHeight:21},
  hint:{fontSize:13,color:colors.muted,lineHeight:19},
  status:{paddingHorizontal:9,paddingVertical:5,borderRadius:9,alignSelf:'flex-start'},
  button:{backgroundColor:colors.primary,borderRadius:11,paddingVertical:13,paddingHorizontal:14,alignItems:'center',minHeight:47,justifyContent:'center'},
  buttonOutline:{backgroundColor:colors.white,borderColor:colors.border,borderWidth:1},
  buttonText:{color:colors.white,fontSize:14,fontWeight:'700'},
  formGroup:{gap:6},
  fieldLabel:{fontSize:13,fontWeight:'700',color:colors.ink},
  input:{backgroundColor:colors.white,borderColor:colors.border,borderWidth:1,borderRadius:11,paddingHorizontal:12,paddingVertical:11,fontSize:14,color:colors.ink,minHeight:46},
  error:{color:colors.danger,fontSize:12},
  labelRow:{borderBottomWidth:1,borderColor:colors.border,paddingBottom:8,gap:3},
  label:{color:colors.muted,fontSize:12},
  value:{color:colors.ink,fontSize:14,fontWeight:'600'},
});
