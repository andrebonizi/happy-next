import * as Yup from 'yup';
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

export const orphanageValidation = Yup.object().shape({
  name: Yup.string().required(),
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
  about: Yup.string().required(),
  instructions: Yup.string().required(),
  openingHours: Yup.string().required(),
  openOnWeekends: Yup.boolean().required(),
  images: Yup.array(Yup.string()).required(),
});
