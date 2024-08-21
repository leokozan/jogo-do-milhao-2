import { useEffect, useState } from "react";
import { usePerguntaDatabase,Pergunta} from "../database/usePerguntasDataBase";
import { Alert, Button, Pressable, View,FlatList } from "react-native";
import { Input } from "../components/input";
import { PerguntaItem } from "@/components/pergunta";
import {router} from "expo-router"
export default function Index(){
    const [id,setId] = useState('')
    const [search,setSearch] = useState('')
    const [pergunta,setPergunta] = useState('')
    const [perguntas,setPerguntas] = useState<Pergunta[]>([])
    const perguntaDataBase = usePerguntaDatabase()
    async function create(){
        try {
            const response = await perguntaDataBase.create({pergunta})
            Alert.alert("Pergunta cadastrada com sucesso com ID: " + response.insertedRowId)  
        } catch (error) {
            console.log(error)
        }
    }
    async function update(){
        try {
            const response = await perguntaDataBase.update({id:Number(id),pergunta})
        } catch (error) {
            console.log(error)
        }
    }
    function details(item:Pergunta){
        setPergunta(item.pergunta)
        setId(String(item.id));
    }
    async function handleSave(){
        if(id){
            update()
        }else{
            create()
        }
        setId("")
        setPergunta("")
        await list()
    }
    async function list(){
        try {
            const response = await perguntaDataBase.searchByPergunta(search)
            setPerguntas(response)
        } catch (error) {
            console.log(error)
        }
    }
    async function remove(id:number){
        try {
            await perguntaDataBase.remove(id)
            await list()
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        list()
    },[search])
    return(
        <View style={{flex:1,justifyContent:'center',padding:32,gap:16}}>
            <Input placeholder="Pergunta" onChangeText={setPergunta} value={pergunta}/>
            <Button title="Salvar" onPress={handleSave}/>
            <Input placeholder="Procurar" onChangeText={setSearch}/>
            <FlatList data={perguntas}
            keyExtractor={(item)=>String(item.id)}
            renderItem={({item})=>
                <PerguntaItem 
                    pergunta={item.pergunta}
                    onPress={()=>details(item)}
                    onDelete={()=>remove(item.id)} 
                    onOpen={() => router.navigate("/details/" + item.id)}
                />
            }
            contentContainerStyle={{gap:16}}
            />
        </View>
    )
}