import React from "react";
import { View, Image } from "react-native";
import { styles } from "./styles";
const { CDN_IMAGE } = process.env;
import DiscordSVG from '../../assets/discord.svg';

type Props = {
    guildId: string;
    iconId: string | null;
}

export function GuildIcon({ guildId, iconId }: Props ){

    const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;

    //'https://miro.medium.com/max/1024/0*E3Nphq-iyw_gsZFH.png';

    return(
        <View style={styles.container}>
            {
                iconId ? 
                <Image 
                    source={{ uri }}
                    style={styles.image}
                    resizeMode='cover'
                />
                :
                <DiscordSVG 
                    style={styles.image}
                    width={40}
                    height={40}
                />
            }
        </View>
    )
}