import * as SQLite from "expo-sqlite/build/SQLite.types";

export const createWorkout = async (db: SQLite.WebSQLDatabase,
                                    name: string,
                                    date: string,
                                    time: string): boolean => {
    // Create table and columns
    db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date TEXT, time TEXT)');
    }, (error) => {
        console.log('Error while creating table: ', error);
        return false
    });

    db.transaction(tx => {
        // Execute an SQL statement to insert a new row into the 'workouts' table
        tx.executeSql(
            'INSERT INTO workouts (name, date, time) VALUES (?, ?, ?)',
            [name, date, time],
            (_, {rowsAffected, insertId}) => {
                console.log(`Rows affected: ${rowsAffected}`);
                console.log(`Insert ID: ${insertId}`);
            },
            (_, error) => {
                console.log(`Error inserting workout: ${error}`);
            }
        );
    });
}

export const fetchWorkouts = async (db: SQLite.WebSQLDatabase): Promise<SQLResultSetRowList> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM workouts', [], (tx, results) => {
                resolve(results.rows);
            });
        }, (error) => {
            console.log('Transaction error: ', error);
            reject(error);
        });
    });
}

export const deleteWorkoutsTable = async (db: SQLite.WebSQLDatabase): boolean => {
    db.transaction(tx => {
        // Execute an SQL statement to delete the 'workouts' table
        tx.executeSql(
            'DROP TABLE IF EXISTS workouts',
            [],
            (_, result) => {
                console.log(`Table deleted: ${result}`);
                return true;
            },
            (_, error) => {
                console.log(`Error deleting table: ${error}`);
                return false;
            }
        );
    });
}

export const deleteRowByID = async (db: SQLite.WebSQLDatabase, id: number): boolean => {
    db.transaction((tx) => {
        tx.executeSql(
            `DELETE FROM workouts WHERE id = ?;`,
            [id],
            (_, result) => {
                console.log(`Deleted row with id: ${id}`)
                return true
            },
            (error) => {
                console.log(`Error deleting row: ${error}`);
            },
        );
    });
}