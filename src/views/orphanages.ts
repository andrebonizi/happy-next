import { Orphanage } from '@models/orphanage';

export const OrphanageView = (orphanage: Orphanage) => ({
  id: orphanage.id,
  name: orphanage.name,
  latitude: orphanage.latitude,
  longitude: orphanage.longitude,
  about: orphanage.about,
  instructions: orphanage.instructions,
  openingHours: orphanage.openingHours,
  openOnWeekends: orphanage.openOnWeekends,
  images: orphanage.images,
});

export const OrphanagesView = (orphanages: Orphanage[]) => orphanages.map(OrphanageView);
