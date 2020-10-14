import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_MAIL,
      privateKey: process.env.FIREBASE_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
    databaseURL: 'https://happy-next.firebaseio.com',
  });

  fireorm.initialize(admin.firestore());
}

export { fireorm };
