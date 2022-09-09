import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

export const initDb = async () => {
  // creating a new database named contact_db which will be using version 1 of the db
  openDB('contact_db', 1, {
    // add the database schema if it has not already been initialized
    upgrade(db) {
      if (db.objectStoreNames.contains('contacts')) {
        console.log('contacts store already exists');
        return;
      }
      // create a new object store for the data and give it a key name of 'id' which will increment automatically
      db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
      console.log('contacts store created');
    }
  })
}

export const getDb = async () => {
  console.log('GET from the database');

  // create a connection to the IndexedDB database and the version we want to use
  const contactDb = await openDB('contact_db', 1);

  // create a new transaction and specify the store and data privleges
  const tx = contactDB.transaction('contacts', 'readonly');

  // open up the desired object store
  const store = tx.objectStore('contacts');

}