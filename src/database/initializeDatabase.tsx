import {type SQLiteDatabase} from 'expo-sqlite';

export async function initializeDatabase(database: SQLiteDatabase) {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS perguntas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pergunta TEXT NOT NULL
        )
    `);

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS respostas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            texto TEXT NOT NULL,
            pergunta_id INTEGER NOT NULL,
            is_correct BOOLEAN NOT NULL,
            FOREIGN KEY (pergunta_id) REFERENCES perguntas(id)
        )
    `);
}