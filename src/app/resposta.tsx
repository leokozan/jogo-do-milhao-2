import { useEffect, useState } from "react";
import { useRespostaDatabase, Resposta } from "../database/useRespostasDatabase";
import { Alert, Button, Pressable, View, FlatList, StyleSheet } from "react-native";
import { Input } from "../components/input";
import { RespostaItem } from "@/components/resposta";
import { router } from "expo-router";

export default function RespostaView() {
    const [id, setId] = useState('');
    const [search, setSearch] = useState('');
    const [texto, setTexto] = useState('');
    const [perguntaId, setPerguntaId] = useState<number>();
    const [isCorrect, setIsCorrect] = useState(false);
    const [respostas, setRespostas] = useState<Resposta[]>([]);
    const respostaDataBase = useRespostaDatabase();

    async function create() {
        try {
            if (perguntaId === undefined) {
                Alert.alert("Selecione uma pergunta antes de salvar.");
                return;
            }
            const response = await respostaDataBase.create({ texto, pergunta_id: perguntaId, is_correct: isCorrect });
            Alert.alert("Resposta cadastrada com sucesso com ID: " + response.insertedRowId);
        } catch (error) {
            console.log(error);
        }
    }

    async function update() {
        try {
            await respostaDataBase.update({ id: Number(id), texto, pergunta_id: perguntaId, is_correct: isCorrect });
        } catch (error) {
            console.log(error);
        }
    }

    function details(item: Resposta) {
        setTexto(item.texto);
        setPerguntaId(item.pergunta_id);
        setIsCorrect(item.is_correct);
        setId(String(item.id));
    }

    async function handleSave() {
        if (id) {
            update();
        } else {
            create();
        }
        setId("");
        setTexto("");
        setPerguntaId(undefined);
        setIsCorrect(false);
        await list();
    }

    async function list() {
        try {
            const response = await respostaDataBase.searchByResposta(search);
            setRespostas(response);
        } catch (error) {
            console.log(error);
        }
    }

    async function remove(id: number) {
        try {
            await respostaDataBase.remove(id);
            await list();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        list();
    }, [search]);

    return (
        <View style={styles.container}>
            <Input
                placeholder="Texto da resposta"
                onChangeText={setTexto}
                value={texto}
                style={styles.input}
            />
            <Input
                placeholder="ID da Pergunta"
                keyboardType="numeric"
                onChangeText={(text) => setPerguntaId(Number(text))}
                value={perguntaId?.toString()}
                style={styles.input}
            />
            <Pressable
                style={[styles.checkbox, isCorrect && styles.checkboxChecked]}
                onPress={() => setIsCorrect(!isCorrect)}
            >
                <View style={styles.checkboxMark} />
            </Pressable>
            <Button title="Salvar" onPress={handleSave} color="#1E90FF" />
            <Input
                placeholder="Procurar"
                onChangeText={setSearch}
                style={styles.input}
            />
            <FlatList
                data={respostas}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <RespostaItem
                        resposta={item.texto}
                        onPress={() => details(item)}
                        onDelete={() => remove(item.id)}
                        onOpen={() => router.navigate("/detailsResposta/" + item.id)}
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
        paddingTop: 50,
        gap: 16,
        backgroundColor: '#F5F5F5',
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 12,
        borderColor: '#DDDDDD',
        borderWidth: 1,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#1E90FF',
    },
    checkboxMark: {
        width: 12,
        height: 12,
        backgroundColor: '#FFFFFF',
    },
    listContent: {
        gap: 16,
        paddingVertical: 16,
    },
});
