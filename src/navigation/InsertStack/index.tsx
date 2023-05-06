import { createStackNavigator } from '@react-navigation/stack';

import Insert from '../../pages/Insert';
import InsertStudent from '../../pages/Insert/InsertStudent';
import InsertCurso from '../../pages/Insert/InsertCurso';
import InsertStudentRegistro from '../../pages/Insert/InsertStudentRegistro';
import InsertSubject from '../../pages/Insert/InsertSubject';
import InsertSubjectTime from '../../pages/Insert/InsertSubjectTime';
import InsertMatricula from '../../pages/Insert/InsertMatricula';
import InsertUser from '../../pages/Insert/InsertUser';
import InsertStudentNotes from '../../pages/Insert/InsertStudentNotes';

const Stack = createStackNavigator();

export default function InsertStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='InsertIndex' component={Insert} />
			<Stack.Screen name='InsertStudent' component={InsertStudent} />
			<Stack.Screen
				name='InsertStudentRegistro'
				component={InsertStudentRegistro}
			/>
			<Stack.Screen name='InsertStudentNotes' component={InsertStudentNotes} />
			<Stack.Screen name='InsertCurso' component={InsertCurso} />
			<Stack.Screen name='InsertSubject' component={InsertSubject} />
			<Stack.Screen name='InsertSubjectTime' component={InsertSubjectTime} />
			<Stack.Screen name='InsertMatricula' component={InsertMatricula} />
			<Stack.Screen name='InsertUser' component={InsertUser} />
		</Stack.Navigator>
	);
}
