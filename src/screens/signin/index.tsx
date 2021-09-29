import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { 
    View,
    Image,
    Text, 
    Alert,
    ActivityIndicator
} from "react-native";

import { useAuth } from '../../hooks/auth';
import IllustrationImg from '../../assets/illustration.png';
import { Home } from "../Home";
import { ButtonIcon } from "../../components/ButtonIcon";
import { styles } from './styles';
import { Background } from "../../components/Background";
import { theme } from "../../global/styles/theme";

export function SignIn(){
    const navigation = useNavigation();
    const { loading, user, signIn } = useAuth();
    console.log(user);

    async function handleSignIn() {
        try {
            await signIn();
        } catch (error) {
            Alert.alert(error as string);
        }
    }
    
    return(

    <Background>

        <View style={styles.container}>

            <Image 
                source={IllustrationImg} 
                style={styles.image}
                resizeMode="stretch"
                />

            <View style={styles.content}>
                <Text style={styles.title}> 
                    Conecte-se{`\n`}
                    e  organize suas{`\n`}
                    jogatinas{`\n`}
                </Text>

                <Text style={styles.subtitle}>
                    Crie grupos para jogar seus games {`\n`}
                    favoritos com seus amigos
                </Text>

                {
                    loading ? <ActivityIndicator color={theme.colors.primary}/> :
                    <ButtonIcon 
                    title='Entrar com Discord' 
                    onPress={handleSignIn}
                    />
                }
            </View>
        
        </View>
    
    </Background>    
    )
}