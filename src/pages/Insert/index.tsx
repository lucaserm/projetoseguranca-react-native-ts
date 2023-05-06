import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { globalStyles as styles } from '../../styles/globalStyles';
import { specificStyles } from './styles';

import Card from '../../components/Card';

import { propsStack } from '../mainStackParams';

export default function Insert() {
	const navigation = useNavigation<propsStack>();

	const handleNavigation = (route: string) => {
		switch (route) {
			case 'Student':
				navigation.navigate('InsertStudent');
				break;
			case 'Curso':
				navigation.navigate('InsertCurso');
				break;
			case 'Subject':
				navigation.navigate('InsertSubject');
				break;
			case 'SubjectTime':
				navigation.navigate('InsertSubjectTime');
				break;
			case 'Registro':
				navigation.navigate('InsertStudentRegistro');
				break;
			case 'Matricula':
				navigation.navigate('InsertMatricula');
				break;
			case 'User':
				navigation.navigate('InsertUser');
				break;
		}
	};

	return (
		<View style={[styles.container, specificStyles.container]}>
			<Card position='center'>
				<View style={specificStyles.cardContainer}>
					<Text style={styles.cardText}>Cadastros</Text>
					<TouchableOpacity
						style={[styles.cardButton, specificStyles.cardButton]}
						onPress={() => handleNavigation('Student')}
					>
						<Text style={styles.cardButtonText}>Estudante</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.cardButton, specificStyles.cardButton]}
						onPress={() => handleNavigation('Curso')}
					>
						<Text style={styles.cardButtonText}>Curso</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.cardButton, specificStyles.cardButton]}
						onPress={() => handleNavigation('Subject')}
					>
						<Text style={styles.cardButtonText}>Disciplina</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.cardButton, specificStyles.cardButton]}
						onPress={() => handleNavigation('SubjectTime')}
					>
						<Text style={styles.cardButtonText}>Horário</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.cardButton, specificStyles.cardButton]}
						onPress={() => handleNavigation('Matricula')}
					>
						<Text style={styles.cardButtonText}>Matrícula</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.cardButton, specificStyles.cardButton]}
						onPress={() => handleNavigation('Registro')}
					>
						<Text style={styles.cardButtonText}>Registro</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.cardButton, specificStyles.cardButton]}
						onPress={() => handleNavigation('User')}
					>
						<Text style={styles.cardButtonText}>Usuário</Text>
					</TouchableOpacity>
				</View>
			</Card>
		</View>
	);
}
