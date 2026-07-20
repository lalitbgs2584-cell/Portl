import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface TabBarIconProps {
  name: keyof typeof Ionicons.glyphMap;
  focused: boolean;
  color: string;
}

export default function TabBarIcon({ name, color }: TabBarIconProps) {
  return <Ionicons name={name} size={22} color={color} />;
}