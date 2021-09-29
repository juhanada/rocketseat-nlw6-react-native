import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { Appointment, AppointmentProps } from "../../components/Appointments";
import { Background } from "../../components/Background";
import { ButtonAdd } from "../../components/ButtonAdd";
import CategorySelect from "../../components/CategorySelect";
import { ListDivider } from "../../components/ListDivider";
import { ListHeader } from "../../components/ListHeader";
import { Load } from "../../components/Load";
import { Profile } from "../../components/Profile";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { styles } from "./styles";

export function Home() {

    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
    const navigation = useNavigation();


    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId) 
    }

    function handleAppointmentDetails(guildSelected: AppointmentProps) {
        navigation.navigate('AppointmentDetails' as never, { guildSelected } as never);
    }

    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate' as never);
    }
    
    async function loadAppointments() {
        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const appointmentsStoraged: AppointmentProps[] = storage ? JSON.parse(storage) : [];

        if (category) {
            setAppointments(appointmentsStoraged.filter(item => item.category === category));
        } 
        else {
            setAppointments(appointmentsStoraged);
        }
        setLoading(false);
    }

    useFocusEffect(useCallback(() => {
        //AsyncStorage.setItem(COLLECTION_APPOINTMENTS, JSON.stringify([]));
        loadAppointments();
    },[category]))

    return(
        <Background>
            <View style = {styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate}/>
            </View>

            <CategorySelect 
                categorySelected={category} 
                setCategory={handleCategorySelect}
            />   

            
            {
                loading ? <Load /> :
                <>
                    <ListHeader title="Partidas Agendadas" subtitle={`Total: ${appointments.length}`}/>
                    <FlatList 
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Appointment 
                            data={item} 
                            onPress={() => handleAppointmentDetails(item)}
                            />
                            )}
                            style={styles.matches}
                            contentContainerStyle={{paddingBottom: 30, paddingTop: 10}}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => (<ListDivider />)}
                    />
                </>
            }
        </Background>
    );    
}