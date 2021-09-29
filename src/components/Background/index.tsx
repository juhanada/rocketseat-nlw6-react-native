import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

// uma propriedade que o Background recebe
type Props = {
  children: ReactNode; //um children que vai ser um componente
};

export function Background({ children }: Props) { //recebendo nosso children por parametro
  const { secondary80, secondary100 } = theme.colors;

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary80, secondary100]}
    >
      {children}
    </LinearGradient>
  );
}
