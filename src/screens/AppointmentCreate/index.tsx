import React, { useState } from "react";
import { Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { Background } from "../../components/Background";
import CategorySelect from "../../components/CategorySelect";
import Header from "../../components/Header";
import { theme } from "../../global/styles/theme";
import { styles } from "./styles";
import { GuildIcon } from "../../components/GuildIcon";
import { SmallInput } from "../../components/SmallInput";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { ModalView } from "../../components/ModalView";
import { Guilds } from "../Guilds";
import { GuildProps } from "../../components/Guild";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { useNavigation } from "@react-navigation/core";

export function AppointmentCreate() {
    const [category, setCategory] = useState('1');
    const [openGuildModal, setOpenGuildModal] = useState(false);
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps);
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [description, setDescription] = useState('');

    const navigation = useNavigation();

    function handleOpenGuild(){
        setOpenGuildModal(true);
    }

    function handleCloseGuild(){
        setOpenGuildModal(false);
    }

    function handleGuildSelect(guildSelected: GuildProps){
        setGuild(guildSelected);
        setOpenGuildModal(false);
    }

    function handleCategorySelect(categoryId: string) {
        setCategory(categoryId)
    }

    async function handleSave() {
        
        const newAppointment = {
            id: uuid.v4(),
            guild, 
            category,
            date: `${day}/${month} ??s ${hour}:${minute}`,
            description
        };

        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const appointments = storage ? JSON.parse(storage) : [];
        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify([...appointments, newAppointment])
        );
        navigation.navigate('Home' as never);
    }

    return (
    <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <Background>
            <Header title="Agendar Partida" 
            />

            <ScrollView>
            <Text style
            ={[styles.label, { marginLeft: 24, marginTop: 28, marginBottom: 18}]}>Categoria</Text>

            <CategorySelect 
                hasCheckBox
                categorySelected={category} 
                setCategory={handleCategorySelect}
                />

            <View style={styles.form}>

                <RectButton onPress={handleOpenGuild}>
                    <View style={styles.select}>
                        {
                            guild.icon ? <GuildIcon guildId={guild.id} iconId={guild.icon}/> : <View style={styles.image} />
                        }
                        <View style={styles.selectBody}>
                            <Text style={styles.label}>{guild.name ? guild.name : 'Selecione um servidor'}</Text>
                        </View>

                        <Feather 
                            name='chevron-right'
                            color={theme.colors.heading}
                            size={18}
                            />

                    </View>
                </RectButton>

                <View style={styles.field}>
                    <View>
                        <View>
                            <Text style={styles.label}>Dia e M??s</Text>
                        </View>
                        <View style={styles.column}>
                            <SmallInput 
                                maxLength={2} 
                                onChangeText={setDay}
                            />
                            <Text style={styles.divider}>/</Text>
                            <SmallInput 
                                maxLength={2} 
                                onChangeText={setMonth}
                            />
                        </View>
                    </View>

                    <View>
                        <View>
                            <Text style={styles.label}>Hora e Minuto</Text>
                        </View>
                        <View style={styles.column}>
                            <SmallInput 
                                maxLength={2} 
                                onChangeText={setHour}
                            />
                            <Text style={styles.divider}>:</Text>
                            <SmallInput 
                                maxLength={2} 
                                onChangeText={setMinute}
                            />
                        </View>
                    </View>
                </View>
                
                <View style={[styles.field, {marginBottom: 12}]}>
                    <Text style={styles.label}>Descri????o</Text>
                    <Text style={styles.charlimit}>Max 100 caracteres</Text>
                </View>

                <TextArea 
                    multiline
                    maxLength={100}
                    numberOfLines={5}
                    autoCorrect={false}
                    onChangeText={setDescription}
                    />

                <View style={styles.footer}>
                    <Button 
                        title="Agendar"
                        onPress={handleSave}
                    />
                </View>    

            </View>

            </ScrollView>
        </Background>    

        <ModalView visible={openGuildModal} closeModal={handleCloseGuild}>
            <Guilds handleGuildSelect={handleGuildSelect} />
        </ModalView>
    </KeyboardAvoidingView>
    );
}
