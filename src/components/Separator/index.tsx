import { View } from 'react-native';

export default function Separator() {
	return (
		<View
			style={{
				borderBottomColor: '#BBB',
				borderBottomWidth: 1,
				width: '80%',
				alignSelf: 'center',
				marginVertical: 5,
			}}
		></View>
	);
}
