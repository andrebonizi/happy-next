import { Collection } from 'fireorm';
import '../services/fireorm';

@Collection()
export class Orphanage {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  openingHours: string;
  openOnWeekends = false;
  images: string[];
}
