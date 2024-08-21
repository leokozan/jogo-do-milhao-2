import { Pressable ,Text,PressableProps,TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
 type Props = PressableProps &{
    pergunta:string
    onDelete:()=>void
    onOpen:()=>void
 }
export function PerguntaItem({pergunta,onDelete,onOpen,...rest}:Props){
    return(
        <Pressable {...rest}  style={{backgroundColor:"#CECECE",padding:24,borderRadius:5,gap:12,flexDirection:'row'}}>
            <Text style={{flex:1}}>
                {pergunta}
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