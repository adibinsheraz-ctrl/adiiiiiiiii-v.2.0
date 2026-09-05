import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDtpN68UKm_aHbgEujrRb0aPRKPyfIRcLw',
  authDomain: 'adi3d-e4865.firebaseapp.com',
  projectId: 'adi3d-e4865',
  storageBucket: 'adi3d-e4865.firebasestorage.app',
  messagingSenderId: '365185658267',
  appId: '1:365185658267:web:afa6fb0042a0972b66853e',
  measurementId: 'G-5TM00B5GKZ',
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
