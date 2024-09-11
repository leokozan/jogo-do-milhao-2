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
    async function searchByResposta(resposta:string) {
        try {
            const query = "SELECT * FROM respostas WHERE texto LIKE ?"
            const response = await database.getAllAsync<Resposta>(query,`%${resposta}%`)
            return response
        } catch (error) {
            throw error
        }
    }
    async function update(data:Resposta) {
        const statemnt = await database.prepareAsync(
            "UPDATE respostas SET pergunta = $resposta WHERE id = $id"
        )
        try {
           await statemnt.executeAsync({
                $id:data.id,
                $texto: data.texto,
                $pergunta_id: data.pergunta_id,
                $is_correct: data.is_correct
            })
        } catch (error) {
            throw error
        }finally{
            await statemnt.finalizeAsync()
        }
    }
    async function remove(id:number) {
        try {
            await database.execAsync("DELETE FROM respostas WHERE id = "+ id)
        } catch (error) {
            console.log(error)
        }
    }
    async function show(id:number) {
        try {
            const query = `SELECT * FROM respostas 
                                WHERE id = ?`;

            return await database.getFirstAsync<Resposta>(query, [id]);
        } catch (error) {
            throw error;
        }
    }
    return {create,searchByResposta,update,remove,show} 
}