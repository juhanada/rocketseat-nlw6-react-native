import React from "react";
import { Text, View } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { GuildIcon } from "../GuildIcon";
import { styles } from './styles';
import { categories } from "../../utils/categories";
import PlayerSVG from '../../assets/player.svg';
import CalendarSVG from '../../assets/calendar.svg';
import { theme } from "../../global/styles/theme";
import { GuildProps } from "../Guild";

export type AppointmentProps = {
    id: string,
    guild: GuildProps, 
    category: string, 
    date: string, 
    description: string
}

type Props = RectButtonProps & {
    data: AppointmentProps
}

export function Appointment( { data, ...rest } : Props) {

    const [category] = categories.filter(item => item.id === data.category)
    const { primary, on } = theme.colors;
    const { owner } = data.guild;

    return (
        <RectButton
            {...rest}
        >
            <View style={styles.container}>
                <GuildIcon guildId={data.guild.id} iconId={data.guild.icon}/>

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{data.guild.name}</Text>
                        <Text style={styles.category}> { category.title }</Text>
                    </View>

                    <View style={styles.footer}>
                        <View style={styles.dateInfo}>
                            <CalendarSVG />
                            <Text style={styles.date}>
                                {data.date}
                            </Text>
                        </View>
                    
                        <View style={styles.playersInfo}>
                            <PlayerSVG fill={ owner ? primary : on}/>
                            <Text style={[styles.player, {color: owner ? primary : on}]}>{ owner ? 'Anfitrião' : 'Visitante'}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </RectButton>
    );
}