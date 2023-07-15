import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // initialise connection with db
  const db = await openDB("jate", 1);

  //create new transaction, specifying db and data privileges - ReadWrite
  const tx = db.transaction("jate", "readwrite");

  //open object store
  const store = tx.objectStore("jate");

  //pass request to store
  const request = store.put({ id: 1, value: content });

  //wait for completion and confirm
  const response = await request;
  console.log("saved to db", response);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // initialise connection with db
  const db = await openDB("jate", 1);

  //create new transaction, specifying db and data privileges - Readonly
  const tx = db.transaction("jate", "readonly");

  //open object store
  const store = tx.objectStore("jate");

  //get all data from store
  const response = store.getAll();

  //wait for completion and confirm
  const request = await response;
  console.log("data has been retrieved", request);
  return request?.value;
};

initdb();
