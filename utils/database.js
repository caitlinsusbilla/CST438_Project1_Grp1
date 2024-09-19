import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('pokemon_app.db');

const DATABASE_VERSION = 2; // Increment this when you make schema changes

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Check the current database version
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='db_version';",
        [],
        (_, { rows }) => {
          if (rows.length === 0) {
            // Database version table doesn't exist, create it and set initial version
            createTables(tx, 0);
          } else {
            // Check the current version
            tx.executeSql(
              "SELECT version FROM db_version;",
              [],
              (_, { rows }) => {
                const currentVersion = rows.item(0).version;
                if (currentVersion < DATABASE_VERSION) {
                  // Database needs to be updated
                  updateDatabase(tx, currentVersion);
                }
              },
              (_, error) => {
                console.error('Error checking database version:', error);
                reject(error);
              }
            );
          }
        },
        (_, error) => {
          console.error('Error checking database version table:', error);
          reject(error);
        }
      );
    }, (error) => {
      console.error('Transaction error:', error);
      reject(error);
    }, () => {
      console.log('Database initialized successfully');
      resolve();
    });
  });
};

const createTables = (tx, fromVersion) => {
  if (fromVersion < 1) {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );`
    );
  }
  
  if (fromVersion < 2) {
    tx.executeSql(
      `ALTER TABLE users ADD COLUMN team_slot_1 INTEGER;`
    );
    tx.executeSql(
      `ALTER TABLE users ADD COLUMN team_slot_2 INTEGER;`
    );
    tx.executeSql(
      `ALTER TABLE users ADD COLUMN team_slot_3 INTEGER;`
    );
    tx.executeSql(
      `ALTER TABLE users ADD COLUMN team_slot_4 INTEGER;`
    );
    tx.executeSql(
      `ALTER TABLE users ADD COLUMN team_slot_5 INTEGER;`
    );
    tx.executeSql(
      `ALTER TABLE users ADD COLUMN team_slot_6 INTEGER;`
    );
  }

  // Create or update the db_version table
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS db_version (version INTEGER);`
  );
  tx.executeSql(
    `INSERT OR REPLACE INTO db_version (rowid, version) VALUES (1, ?);`,
    [DATABASE_VERSION]
  );
};

const updateDatabase = (tx, fromVersion) => {
  createTables(tx, fromVersion);
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

export const getUserTeam = (userId) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT team_slot_1, team_slot_2, team_slot_3, team_slot_4, team_slot_5, team_slot_6 FROM users WHERE id = ?;',
        [userId],
        (_, { rows }) => {
          if (rows.length > 0) {
            const team = [
              rows.item(0).team_slot_1,
              rows.item(0).team_slot_2,
              rows.item(0).team_slot_3,
              rows.item(0).team_slot_4,
              rows.item(0).team_slot_5,
              rows.item(0).team_slot_6,
            ];
            resolve(team);
          } else {
            resolve(Array(6).fill(null));
          }
        },
        (_, error) => {
          console.error('Error getting user team:', error);
          reject(error);
        }
      );
    });
  });
};

export const updateUserTeam = (userId, slotNumber, pokemonId) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE users SET team_slot_${slotNumber} = ? WHERE id = ?;`,
        [pokemonId, userId],
        (_, result) => {
          console.log(`Updated team slot ${slotNumber} for user ${userId}`);
          resolve(result.rowsAffected);
        },
        (_, error) => {
          console.error('Error updating user team:', error);
          reject(error);
        }
      );
    });
  });
};