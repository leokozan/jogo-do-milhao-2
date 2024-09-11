import {useSQLiteContext} from 'expo-sqlite';

export type Pergunta = {
    id:number;
    pergunta:string;
}
export type resposta = {
    // id INTEGER PRIMARY KEY AUTOINCREMENT,
    // texto TEXT NOT NULL,
    // pergunta_id INTEGER NOT NULL,
    // is_correct BOOLEAN NOT NULL,
    // FOREIGN KEY (pergunta_id) REFERENCES perguntas(id)
    id:number;
    texto:string;
    pergunta_id:number;
    is_correct:boolean;
}

export function usePerguntaDatabase()
{
    const database = useSQLiteContext();

    async function create(data:Omit<Pergunta,"id">) {
        const statemnt = await database.prepareAsync(
            "INSERT INTO perguntas (pergunta) VALUES ($pergunta)"
        )
        try {
            const result = await statemnt.executeAsync({
                $pergunta: data.pergunta
            })
            const insertedRowId = result.lastInsertRowId.toLocaleString()
            return {insertedRowId}
        } catch (error) {
            throw error
        }finally{
            await statemnt.finalizeAsync()
        }
    }

    async function searchByPergunta(pergunta:string) {
        try {
            const query = "SELECT * FROM perguntas WHERE pergunta LIKE ?"
            const response = await database.getAllAsync<Pergunta>(query,`%${pergunta}%`)
            return response
        } catch (error) {
            throw error
        }
    }

    async function update(data:Pergunta) {
        const statemnt = await database.prepareAsync(
            "UPDATE perguntas SET pergunta = $pergunta WHERE id = $id"
        )
        try {
           await statemnt.executeAsync({
                $id:data.id,
                $pergunta: data.pergunta
            })
        } catch (error) {
            throw error
        }finally{
            await statemnt.finalizeAsync()
        }
    }
    
    async function remove(id:number) {
        try {
            await database.execAsync("DELETE FROM perguntas WHERE id = "+ id)
        } catch (error) {
            console.log(error)
        }
    }
    
    async function show(id:number) {
        try {
            const query = `SELECT * FROM perguntas 
                                WHERE id = ?`;

            return await database.getFirstAsync<Pergunta>(query, [id]);
        } catch (error) {
            throw error;
        }
    }
    async function getRandomPergunta(): Promise<Pergunta | null> {
        const query = "SELECT * FROM perguntas ORDER BY RANDOM() LIMIT 1";
        try {
            const result = await database.prepareAsync<Pergunta>(query);
            return result || null;
        } catch (error) {
            console.error("Erro ao buscar pergunta aleatória:", error);
            throw error;
        }
    }
    return { create, update, remove, show,searchByPergunta ,getRandomPergunta} 
}