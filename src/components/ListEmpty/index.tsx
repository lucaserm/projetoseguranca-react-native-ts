import { View, Text } from 'react-native';

interface IListEmpty {
	text: string;
}

export default function ListEmpty({ text }: IListEmpty) {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignSelf: 'center',
			}}
		>
			<Text>{text}</Text>
		</View>
	);
}
