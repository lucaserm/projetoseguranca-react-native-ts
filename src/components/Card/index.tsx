import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ICard {
	children: JSX.Element;
	position: 'left' | 'right' | 'center';
}

export default function Card({ children, position }: ICard) {
	const styles = StyleSheet.create({
		card: {
			marginTop: position !== 'center' ? 50 : 0,
			alignSelf:
				position == 'right'
					? 'flex-end'
					: position == 'left'
					? 'flex-start'
					: 'center',
			width: 300,
			minHeight: position === 'center' ? 300 : 200,
			backgroundColor: '#F9F4F5',
			borderRadius: 10,
		},
	});

	return <View style={styles.card}>{children}</View>;
}
