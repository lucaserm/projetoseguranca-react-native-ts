import { StyleSheet } from 'react-native';

// #e32f45, #748c94, #FAFAFA, #00ffaa, #6CA353, #134312
// #e32f45, #0A0908, #22333B, #F2F4F3, #5E503F

export const globalStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#22333B',
	},
	content: {
		marginHorizontal: 15,
		marginBottom: 100,
	},
	cardContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		gap: 20,
	},
	cardText: {
		alignSelf: 'center',
		textTransform: 'uppercase',
		fontSize: 20,
		fontWeight: 'bold',
		borderBottomWidth: 0.7,
		borderBottomColor: '#333',
	},
	cardInput: {
		backgroundColor: '#2FA34F',
		width: '90%',
		padding: 5,
		fontSize: 15,
		textAlign: 'center',
		borderRadius: 10,
		color: '#F2F4F3',
	},
	cardButton: {
		paddingVertical: 10,
		paddingHorizontal: 80,
		borderRadius: 20,
		alignSelf: 'center',
		backgroundColor: '#2Fa33B',
	},
	cardButtonText: {
		textAlign: 'center',
		color: '#F2F4F3',
	},
	message: {
		width: 300,
		marginTop: -20,
		marginVertical: 20,
		paddingVertical: 20,
		paddingHorizontal: 30,
		borderRadius: 20,
		backgroundColor: '#e32f45',
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexDirection: 'row',
	},
	messageText: {
		color: '#FAFAFA',
	},
	messageButton: {
		alignItems: 'center',
	},
});
