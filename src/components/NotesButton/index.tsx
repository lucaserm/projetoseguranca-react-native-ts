import { TouchableOpacity, Text } from 'react-native';

import { globalStyles as styles } from '../../styles/globalStyles';
import { specificStyles } from '../../pages/Notes/styles';

interface INotesButton {
	backgroundColor: string;
	text: string;
	onPress: () => void;
}

export default function NotesButton({
	backgroundColor,
	text,
	onPress,
}: INotesButton) {
	return (
		<TouchableOpacity
			style={[
				styles.cardButton,
				specificStyles.cardButton,
				{ backgroundColor },
			]}
			onPress={onPress}
		>
			<Text style={styles.cardButtonText}>{text}</Text>
		</TouchableOpacity>
	);
}
