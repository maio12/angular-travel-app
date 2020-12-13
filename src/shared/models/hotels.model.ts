
export interface HotelsApiResponse {
  term: string;
  moresuggestions: number;
  autoSuggestInstance: null;
  trackingID: string;
  misspellingfallback: boolean;
  suggestions: Suggestion[];
}

export type SuggestionGroup = 'CITY_GROUP' | 'LANDMARK_GROUP' |
  'TRANSPORT_GROUP' | 'HOTEL_GROUP';

export interface Suggestion {
  group: SuggestionGroup;
  entities: Entity[];
}

export type EntityType = 'CITY' | 'LANDMARK' | 'TRANSPORT' | 'HOTEL';

export interface Entity {
  geoId: number;
  destinationId: number;
  landmarkCityDestinationId: null;
  type: EntityType;
  caption: string;
  redirectPage: string;
  latitude: string;
  longitude: string;
  name: string;
}

export interface Hotel {
  name: string;
  latitude: string;
  longitude: string;
  caption: string;
}