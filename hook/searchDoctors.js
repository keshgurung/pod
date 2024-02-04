import { collection, query, where, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../Firebase/FirebaseConfig';

const searchDoctors = async (specialty, location) => {
  const doctorsCollection = collection(FIRESTORE_DB, 'users');
  let searchQuery = query(doctorsCollection);

  if (specialty && location) {
    searchQuery = query(doctorsCollection, where('specialty', '==', specialty), where('location', '==', location));
  } else {
    if (specialty) {
      searchQuery = query(doctorsCollection, where('specialty', '==', specialty));
    } else if (location) {
      searchQuery = query(doctorsCollection, where('location', '==', location));
    }
  }

  try {
    const querySnapshot = await getDocs(searchQuery);
    const searchResults = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      searchResults.push(data);
    });

    return searchResults;
  } catch (error) {
    console.error('Error performing search:', error);
    throw error;
  }
};

export default searchDoctors;
