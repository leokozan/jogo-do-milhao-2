import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import {View} from 'react-native';
import { initializeDatabase } from "../database/initializeDatabase";

export default function Layout(props:any)
{
    return(
        <SQLiteProvider databaseName="teste.db" onInit={initializeDatabase}>
            <Slot/>
        </SQLiteProvider>
    )
}