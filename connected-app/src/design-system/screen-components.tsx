import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { Card, Trip } from './components';
import { colors } from './tokens';
import { styles } from './screen-styles';

export function Field({ label, placeholder, value, onChangeText, secure = false }: { label: string; placeholder: string; value?: string; onChangeText?: (value: string) => void; secure?: boolean }) {
  return <View style={styles.fieldGroup}><Text style={styles.label}>{label}</Text><TextInput accessibilityLabel={label} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colors.textTertiary} secureTextEntry={secure} style={styles.input} value={value} /></View>;
}

export function SectionTitle({ title, action, onPress }: { title: string; action?: string; onPress?: () => void }) {
  return <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{title}</Text>{action && onPress && <Pressable accessibilityRole="button" onPress={onPress}><Text style={styles.link}>{action}</Text></Pressable>}</View>;
}

export function SearchSummary({ onPress }: { onPress: () => void }) {
  return <Card onPress={onPress} style={styles.searchSummary}><View style={styles.searchIcon}><Text style={styles.searchIconText}>✈</Text></View><View style={styles.searchCopy}><Text style={styles.searchRoute}>Montréal → Abidjan</Text><Text style={styles.meta}>▣ 20 juin   ·   ▱ 12 kg</Text></View><View style={styles.modifyPill}><Text style={styles.modifyText}>Modifier</Text></View></Card>;
}

export function Detail({ label, value }: { label: string; value: string }) { return <View style={styles.detail}><Text style={styles.meta}>{label}</Text><Text style={styles.detailValue}>{value}</Text></View>; }
