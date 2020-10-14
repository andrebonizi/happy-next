import * as Yup from 'yup';
export interface CreateOrphanage {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  openingHours: string;
  openOnWeekends: boolean;
  images?: string[];
}

export const orphanageValidation = Yup.object().shape<CreateOrphanage>({
  name: Yup.string().required(),
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
  about: Yup.string().required(),
  instructions: Yup.string().required(),
  openingHours: Yup.string().required(),
  openOnWeekends: Yup.boolean().required(),
  images: Yup.array<string>(),
});
