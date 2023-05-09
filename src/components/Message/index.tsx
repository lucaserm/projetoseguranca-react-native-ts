import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { globalStyles as styles } from '../../styles/globalStyles';

interface IMessage {
	message: string;
	handleClose: () => void;
}

export default function Message({ message, handleClose }: IMessage) {
	return (
		<View style={styles.message}>
			<Text style={styles.messageText}>{message}</Text>
			<TouchableOpacity style={styles.messageButton} onPress={handleClose}>
				<AntDesign name={'close'} size={20} color={'#FAFAFA'} />
			</TouchableOpacity>
		</View>
	);
}
