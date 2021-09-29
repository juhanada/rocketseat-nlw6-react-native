import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import { View, Text } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { theme } from "../../global/styles/theme";
import { Feather } from "@expo/vector-icons"; // ver isso aqui tb
import { styles } from './styles';
import { useNavigation } from "@react-navigation/native";

type Props = {
    title: string; 
    action?: ReactNode; // nao sei o que é isso
}


export default function Header({ title, action }: Props) {
    const {secondary100, secondary40, heading} = theme.colors; 
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }
    
    return (
        <LinearGradient
            style={styles.container}
            colors={[secondary100, secondary40]}
        >
            <BorderlessButton>
                <Feather
                    name="arrow-left"
                    size={24}
                    color={heading}
                    onPress={handleGoBack}
                />
            </BorderlessButton>

            <Text style={styles.title}>
                {title}
            </Text>

            { 
                action ? 
                <View>
                    { action }
                </View>
                :
                <View style={{width: 24}}/>
            }

        </LinearGradient>
    )
}