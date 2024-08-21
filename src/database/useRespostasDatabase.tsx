import {useSQLiteContext} from 'expo-sqlite';

export type Resposta = {
    id:number;
    texto:string;
    pergunta_id:number;
    is_correct:boolean;
}

export function useRespostaDatabase()
{
    const database = useSQLiteContext();
    async function create(data:Omit<Resposta,"id">) {
        const statemnt = await database.prepareAsync(
            "INSERT INTO respostas (texto,pergunta_id,is_correct) VALUES ($texto,$pergunta_id,$is_correct)"
        )
        try {
            const result = await statemnt.executeAsync({
                $texto: data.texto,
                $pergunta_id: data.pergunta_id,
                $is_correct:data.is_correct
            })
            const insertedRowId = result.lastInsertRowId.toLocaleString()
            return {insertedRowId}
        } catch (error) {
            throw error
        }finally{
            await statemnt.finalizeAsync()
        }
    }
    async function searchByPergunta(resposta:string) {
        try {
            const query = "SELECT * FROM resposta WHERE pergunta LIKE ?"
            const response = await database.getAllAsync<Resposta>(query,`%${resposta}%`)
            return response
        } catch (error) {
            throw error
        }
    }
    return {create,searchByPergunta} 
}