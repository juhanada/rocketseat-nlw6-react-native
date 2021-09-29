import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, Text, View, Alert, Share, Platform } from 'react-native';
import { BorderlessButton } from "react-native-gesture-handler";
import { Background } from "../../components/Background";
import { Fontisto } from "@expo/vector-icons";
import Header from "../../components/Header";
import { theme } from "../../global/styles/theme";
import bannerImg from "../../assets/banner.png";
import { styles } from "./styles";
import { ListHeader } from "../../components/ListHeader";
import { Member, MemberProps } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";
import { useRoute } from "@react-navigation/core";
import { AppointmentProps } from "../../components/Appointments";
import { api } from '../../services/api';
import { Load } from "../../components/Load";
import * as Linking from 'expo-linking';

type Params = {
    guildSelected: AppointmentProps;
}

type GuildWidget = {
    id: string; 
    name: string;
    instant_invite: string;
    members: MemberProps[];
    presence_count: number;
}

export function AppointmentDetails() {
    const route = useRoute();
    const { guildSelected } = route.params as Params;
    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading, setLoading] = useState(true);

    async function fetchGuildWidget() {
        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            setWidget(response.data);
        } catch (error) {
            Alert.alert('Verifique as configurações do servidor. Widget está habilitado?')
        } finally {
            setLoading(false);
        }
    }

    function handleShareInvitation() {
        const message = `Junte-se a ${guildSelected.guild.name}`;
        Share.share({
            message,
            url: widget.instant_invite
        })
    }

    function handleOpenGuild() {
        if (widget.instant_invite)
            Linking.openURL(widget.instant_invite)
        else
            Alert.alert('Não há invite para este servidor ');
    }

    useEffect(() => {
        fetchGuildWidget();
    },[]);

    return (
        <Background>
            <Header title="Detalhes" 
                action={
                    guildSelected.guild.owner &&
                    <BorderlessButton
                        onPress={handleShareInvitation}
                    >
                        <Fontisto 
                            name="share"
                            size={24}
                            color={theme.colors.primary}
                        />
                    </BorderlessButton>
                }
            />

            <ImageBackground 
                source={bannerImg}
                style={styles.banner}
            >

                <View style={styles.bannerContent}>

                <Text style={styles.title}>
                    {guildSelected.guild.name}
                </Text>

                <Text style={styles.subtitle}>
                    {guildSelected.description}
                </Text>

                </View>
            </ImageBackground>
            {
                loading ? <Load /> :
                <>
                    <ListHeader 
                        title="Jogadores"
                        subtitle={`Total ${widget.members.length}`}
                    />

                    <FlatList 
                        data={widget.members}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Member data={item}/> 
                        )}
                        ItemSeparatorComponent={() => <ListDivider isCentered/>}
                        style={styles.members}
                    />

                    <View style={styles.footer}>
                        
                        <ButtonIcon 
                            title="Entrar na Partida"
                            onPress={handleOpenGuild}
                        />
                    </View>
                </>
            }
        </Background>
    );
}
