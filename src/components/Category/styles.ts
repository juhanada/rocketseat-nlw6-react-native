import { StyleSheet, TouchableHighlightComponent } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        width: 104,
        height: 120, 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginRight: 8,
    },
    content: {
        width: 100,
        height: 116, 
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    checked: {
        position: 'absolute',
        top: 7, 
        right: 7,
        width: 13,
        height: 13,
        backgroundColor: theme.colors.primary,
        borderRadius: 3,
    },
    check: {
        position: 'absolute',
        top: 7, 
        right: 7,
        width: 15,
        height: 15,
        backgroundColor: theme.colors.secondary100,
        borderColor: theme.colors.secondary50,
        borderWidth: 2,
        borderRadius: 3,
    },
    title: {
        fontFamily: theme.fonts.title700,
        color: theme.colors.heading,
        fontSize: 15
    }
})