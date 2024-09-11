import { useEffect, useState } from "react";
import { Alert, Button, View, FlatList, Text, StyleSheet } from "react-native";
import { RespostaItem } from "@/components/resposta";
import { usePerguntaDatabase } from "@/database/usePerguntasDataBase";
import { useRespostaDatabase } from "@/database/useRespostasDatabase";
export type Resposta = {
    id:number;
    texto:string;
    pergunta_id:number;
    is_correct:boolean;
}
export default function PerguntaComRespostas() {
    const [pergunta, setPergunta] = useState<string>('');
    const [respostas, setRespostas] = useState<Resposta[]>([]);
    const perguntaDataBasePergunta = usePerguntaDatabase();
    const respostaDataBaseResposta = useRespostaDatabase();

    async function fetchRandomPergunta() {
        try {
            const randomPergunta = await perguntaDataBasePergunta.getRandomPergunta();
            if (randomPergunta) {
                setPergunta(randomPergunta.pergunta);
                await fetchRespostas(randomPergunta.id);
            } else {
                Alert.alert("Nenhuma pergunta encontrada.");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchRespostas(perguntaId: number) {
        try {
            const respostasList = await perguntaDataBasePergunta.searchByPergunta(perguntaId.toString());
            setRespostas(respostasList);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchRandomPergunta();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.perguntaText}>{pergunta}</Text>
            <Button title="Carregar Pergunta Aleatória" onPress={fetchRandomPergunta} color="#1E90FF" />
            <FlatList
                data={respostas}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <RespostaItem
                        resposta={item.texto}
                        isCorrect={item.is_correct}
                    />
                )}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 32,
        backgroundColor: '#F5F5F5',
    },
    perguntaText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    listContent: {
        gap: 16,
        paddingVertical: 16,
    },
});
