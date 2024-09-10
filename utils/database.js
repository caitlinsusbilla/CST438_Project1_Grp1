import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('pokemon.db');

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS pokemon (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          types TEXT NOT NULL,
          image TEXT NOT NULL,
          height INTEGER NOT NULL,
          weight INTEGER NOT NULL,
          abilities TEXT NOT NULL
        );`,
        [],
        () => {
          console.log('Database initialized');
          resolve();
        },
        (_, error) => {
          console.error('Error initializing database:', error);
          reject(error);
        }
      );
    });
  });
};

export const insertPokemon = (pokemon) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT OR REPLACE INTO pokemon (id, name, types, image, height, weight, abilities) 
         VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [
          pokemon.id,
          pokemon.name,
          JSON.stringify(pokemon.types),
          pokemon.image,
          pokemon.height,
          pokemon.weight,
          JSON.stringify(pokemon.abilities)
        ],
        (_, result) => {
          console.log('Pokemon inserted:', pokemon.name);
          resolve(result);
        },
        (_, error) => {
          console.error('Error inserting pokemon:', error);
          reject(error);
        }
      );
    });
  });
};

export const getPokemon = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM pokemon WHERE id = ?;',
        [id],
        (_, { rows }) => {
          if (rows.length > 0) {
            const pokemon = rows.item(0);
            pokemon.types = JSON.parse(pokemon.types);
            pokemon.abilities = JSON.parse(pokemon.abilities);
            resolve(pokemon);
          } else {
            resolve(null);
          }
        },
        (_, error) => {
          console.error('Error getting pokemon:', error);
          reject(error);
        }
      );
    });
  });
};

export const getAllPokemon = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM pokemon;',
        [],
        (_, { rows }) => {
          const pokemon = rows._array.map(p => ({
            ...p,
            types: JSON.parse(p.types),
            abilities: JSON.parse(p.abilities)
          }));
          resolve(pokemon);
        },
        (_, error) => {
          console.error('Error getting all pokemon:', error);
          reject(error);
        }
      );
    });
  });
};