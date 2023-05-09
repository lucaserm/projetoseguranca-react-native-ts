import { ActivityIndicator, View, Text } from 'react-native';
export default function Loading() {
	return (
		<View style={{ justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator size={'large'} />
			<Text>Carregando...</Text>
		</View>
	);
}
