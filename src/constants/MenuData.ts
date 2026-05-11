export interface MenuItem {
  name: string;
  price: string;
  description?: string;
  isVeg?: boolean;
  isSpicy?: boolean;
  isChefSpecial?: boolean;
  icon?: string;
}

export const RICE_NOODLES: MenuItem[] = [
  { name: "Chicken Fried Rice", price: "220" },
  { name: "Egg Chicken Fried Rice", price: "180" },
  { name: "Hong Kong Fried Rice", price: "230" },
  { name: "Chicken Burnt Garlic Rice", price: "240" },
  { name: "Chicken Schezwan Rice", price: "230", isSpicy: true },
  { name: "Chicken Chopper Rice", price: "299" },
  { name: "Chicken Rice Bowl", price: "250" },
  { name: "Chicken Triple Rice", price: "299", isChefSpecial: true },
  { name: "Veg Chowmein", price: "100", isVeg: true },
  { name: "Chicken Chowmein", price: "230" },
  { name: "Egg Chowmein", price: "160" },
  { name: "Chicken Hakka Noodles", price: "220" },
  { name: "Shanghai Noodles", price: "250" },
  { name: "Keema Noodles", price: "270" }
];

export const STARTERS: MenuItem[] = [
  { name: "Chicken Dragon", price: "350", isChefSpecial: true, isSpicy: true, description: "Spicy and stylized chicken" },
  { name: "Chicken Oyster", price: "350", description: "Savory chicken tossed in premium oyster sauce" },
  { name: "Chicken Chilly Dry", price: "330", isSpicy: true, description: "Spicy stir-fried chicken with bell peppers" },
  { name: "Chicken Crispy", price: "320", description: "Crunchy fried chicken with a touch of spice" },
  { name: "Chicken Lollipop 6pcs", price: "350", description: "Juicy chicken wings with spicy red chutney" },
  { name: "Soybean Chilly", price: "199", isVeg: true, description: "Crunchy soybean chunks in spicy sauce" },
  { name: "Chicken Manchurian", price: "250", description: "Crunchy chicken in tangy Manchurian sauce" }
];

export const SOUPS: MenuItem[] = [
  { name: "Manchow Soup", price: "100/120", description: "Spicy thick soup with crispy noodles" },
  { name: "Hot & Sour Soup", price: "100/120", isSpicy: true, description: "Classic spicy and tangy Chinese soup" },
  { name: "Lemon Coriander Soup", price: "100/120", isVeg: true, description: "Fresh coriander and lemon clear soup" },
  { name: "Lung Fung Soup", price: "130", description: "Thick nutritious soup with exotic veggies" },
  { name: "Talumein Soup", price: "125", description: "Healthy soup with soft noodles and vegetables" }
];

export const MOMO: MenuItem[] = [
  { name: "Chicken Steam Momo", price: "60/120" },
  { name: "Chicken Jhol Momo", price: "90/170", isChefSpecial: true },
  { name: "Chicken Chilly Momo", price: "130/250", isSpicy: true },
  { name: "Chicken Pan Fried Momo", price: "150" }
];

export const SPECIALS = [
  { id: 1, name: "Chicken Dragon", price: "350", teaser: "Chef Special spicy and stylized chicken", badge: "Chef's Pick", icon: "🐉", color: "bg-red-900/30" },
  { id: 2, name: "Keema Noodles", price: "270", teaser: "Minced meat with hand-pulled noodles", badge: "Fan Favourite", icon: "🍜", color: "bg-gold/10" },
  { id: 3, name: "Chicken Jhol Momo", price: "90/170", teaser: "Steamed dumplings in spicy jhol broth", badge: "New", icon: "🥟", color: "bg-chinese-surface" },
  { id: 4, name: "Chicken Triple Rice", price: "299", teaser: "Triple-flavour loaded rice experience", badge: "Legendary", icon: "🍚", color: "bg-red-primary/10" }
];
