import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState ,useEffect} from "react";
import { usePerguntaDatabase } from "@/database/usePerguntasDataBase";
export default function Details(){
    const [data,setData] = useState({
        pergunta:'',
    })
    const perguntaDataBase = usePerguntaDatabase()
    const params = useLocalSearchParams<{id:string}>()
    useEffect(()=>{
        if(params.id){
            perguntaDataBase.show(Number(params.id)).then(response=>{
                if(response){
                    setData({
                        pergunta:response.pergunta
                    })
                }
            })
        }
    },[params.id])
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:16}}>ID: {params.id}</Text>
            <Text style={{fontSize:16}}>{data.pergunta}</Text>
        </View>
    )
}