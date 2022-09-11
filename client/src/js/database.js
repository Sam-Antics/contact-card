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
  const tx = contactDb.transaction('contacts', 'readonly');

  // open up the desired object store
  const store = tx.objectStore('contacts');

  // use the .getAll() method to get all data in the database
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};

export const postDb = async (name, email, phone, profile) => {
  console.log('POST to the database');

  // capture data from the form to add as a parameter to the .add() method
  const contactDb = await openDB('contact_db', 1);

  // create a new transaction, etc, etc
  const tx = contactDb.transaction('contacts', 'readwrite');

  // open the desired object store
  const store = tx.objectStore('contacts');

  // use the .add() method on the store and pass in the content
  const request = store.add({ name: name, email: email, phone: phone, profile: profile });

  // get confirmation of the request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

export const deleteDb = async (id) => {
  console.log('DELETE from the database', id);

  // Create connection
  const contactDb = await openDB('contact_db', 1);

  // create new transaction
  const tx = contactDb.transaction('contacts', 'readwrite');

  // open the desired object store
  const store = tx.objectStore('contacts');

  // use the .delete() method to get all the data in the db
  const request = store.delete(id);

  // get confirmation of the request
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

export const editDb = async (id, name, email, phone, profile) => {
  console.log('EDIT card on the database');

  // create connection
  const contactDb = await openDB('contact_db', 1);

  // create new transaction
  const tx = contactDb.transaction('contacts', 'readwrite');

  // open desired object store
  const store = tx.objectStore('contacts');

  // create a .put() method to update a particular object
  const request = store.put({ id: id, name: name, email: email, phone: phone, profile: profile });

  // get confirmation of the request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};