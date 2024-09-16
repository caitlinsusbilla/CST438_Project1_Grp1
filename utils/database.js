import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('pokemon_app.db');

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL
        );`,
        [],
        () => {
          console.log('Users table initialized');
          resolve();
        },
        (_, error) => {
          console.error('Error initializing users table:', error);
          reject(error);
        }
      );
    });
  });
};

export const createUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?);',
        [username, email, password],
        (_, result) => {
          console.log('User created:', username);
          resolve(result.insertId);
        },
        (_, error) => {
          console.error('Error creating user:', error);
          reject(error);
        }
      );
    });
  });
};

export const loginUser = (username, password) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT id, username, email FROM users WHERE username = ? AND password = ?;',
        [username, password],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows.item(0));
          } else {
            resolve(null);
          }
        },
        (_, error) => {
          console.error('Error logging in:', error);
          reject(error);
        }
      );
    });
  });
};

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT id, username FROM users;',
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          console.error('Error getting all users:', error);
          reject(error);
        }
      );
    });
  });
};
export const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM users WHERE id = ?;',
        [userId],
        (_, result) => {
          console.log('User deleted:', userId);
          resolve(result.rowsAffected);
        },
        (_, error) => {
          console.error('Error deleting user:', error);
          reject(error);
        }
      );
    });
  });
};