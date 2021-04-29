import * as SQLite from 'expo-sqlite';

const dbName = 'myApp.db';

const execute = (sql, args) => (
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase(dbName);
    db.transaction(
      (tx) => {
        tx.executeSql(
          sql, args,
          (_, { rows }) => {
            resolve(rows);
          },
          (err) => {
            console.log(`fail:${sql}  ${args}`);
            reject();
            return true;
          },
        );
      },
      null,
      null,
    );
  })
);

export const executeSql = async (sql, args = []) => {
  const result = await execute(sql, args);

  const aryResults = [];
  if (result._array !== undefined) {
    for (let i = 0; i < result._array.length; i += 1) {
      aryResults.push(result._array[i]);
    }
  } else {
    for (let i = 0; i < result.length; i += 1) {
      aryResults.push(result[i]);
    }
  }

  return aryResults;
};
