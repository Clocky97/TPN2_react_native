import React from 'react';
import {
  Coffee,
  Sandwich,
  Cookie,
  Beef,
  Flame,
  Soup,
  Droplet,
  CupSoda,
  Citrus,
  Cake,
  Wheat,
  Utensils,
} from 'lucide-react-native';

interface PlatoIconProps {
  icono?: string;
  categoria?: string;
  size?: number;
  color?: string;
}

export function PlatoIcon({ icono, categoria, size = 26, color = '#d97706' }: PlatoIconProps) {
  switch (icono) {
    case 'coffee':
      return <Coffee size={size} color={color} />;
    case 'sandwich':
      return <Sandwich size={size} color={color} />;
    case 'cookie':
      return <Cookie size={size} color={color} />;
    case 'beef':
      return <Beef size={size} color={color} />;
    case 'flame':
      return <Flame size={size} color={color} />;
    case 'soup':
      return <Soup size={size} color={color} />;
    case 'droplet':
      return <Droplet size={size} color={color} />;
    case 'cup-soda':
      return <CupSoda size={size} color={color} />;
    case 'citrus':
      return <Citrus size={size} color={color} />;
    case 'cake':
      return <Cake size={size} color={color} />;
    case 'wheat':
      return <Wheat size={size} color={color} />;
    default:
      if (categoria === 'desayuno') return <Coffee size={size} color={color} />;
      if (categoria === 'bebidas') return <CupSoda size={size} color={color} />;
      if (categoria === 'kiosco') return <Cookie size={size} color={color} />;
      return <Utensils size={size} color={color} />;
  }
}
