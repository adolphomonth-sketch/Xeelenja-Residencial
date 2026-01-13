
export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  description: string;
  amenities: string[];
  lat: number;
  lng: number;
}

export enum Section {
  HERO = 'hero',
  TRANSITION_1 = 'transition-1',
  LISTINGS = 'listings',
  AI_CONCIERGE = 'ai-concierge',
  FOOTER = 'footer'
}