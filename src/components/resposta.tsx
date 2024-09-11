import { Pressable ,Text,PressableProps,TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
 type Props = PressableProps &{
    resposta:string
    isCorrect:bolean
    onDelete:()=>void
    onOpen:()=>void
 }
export function RespostaItem({resposta,isCorrect,onDelete,onOpen,...rest}:Props){
    return(
        <Pressable {...rest}  style={{backgroundColor:"#CECECE",padding:24,borderRadius:5,gap:12,flexDirection:'row'}}>
            <Text style={{flex:1}}>
                {resposta}
            </Text>
            <TouchableOpacity onPress={onDelete}>
                <MaterialIcons name='delete' size={24} color={'red'}/>  
            </TouchableOpacity>
            <TouchableOpacity onPress={onOpen}>
                <MaterialIcons name='visibility' size={24} color={'blue'}/>  
            </TouchableOpacity>
        </Pressable>
    )
}