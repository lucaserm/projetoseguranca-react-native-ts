import { TouchableOpacity, Text } from 'react-native';

import { globalStyles as styles } from '../../styles/globalStyles';
import { specificStyles } from '../../pages/Insert/styles';

interface IButton {
	backgroundColor?: string;
	text: string;
	back?: boolean;
	onPress: () => void;
}

export default function Button({
	backgroundColor,
	text,
	back,
	onPress,
}: IButton) {
	return (
		<TouchableOpacity
			style={[
				styles.cardButton,
				specificStyles.cardButton,
				{
					backgroundColor: backgroundColor ? backgroundColor : '#2Fa33B',
					marginTop: back ? 10 : 0,
					minWidth: back ? '60%' : '90%',
				},
			]}
			onPress={onPress}
		>
			<Text style={styles.cardButtonText}>{text}</Text>
		</TouchableOpacity>
	);
}
