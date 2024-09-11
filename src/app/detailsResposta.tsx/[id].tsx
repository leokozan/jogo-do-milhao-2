import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState ,useEffect} from "react";
import { useRespostaDatabase } from "@/database/useRespostasDatabase";
export default function Details(){
    const [data,setData] = useState({
        texto:'',
    })
    const respostaDataBase = useRespostaDatabase()
    const params = useLocalSearchParams<{id:string}>()
    useEffect(()=>{
        if(params.id){
            respostaDataBase.show(Number(params.id)).then(response=>{
                if(response){
                    setData({
                        texto:response.texto
                    })
                }
            })
        }
    },[params.id])
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:16}}>ID: {params.id}</Text>
            <Text style={{fontSize:16}}>{data.texto}</Text>
        </View>
    )
}