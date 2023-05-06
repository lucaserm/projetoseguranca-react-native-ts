import { createStackNavigator } from '@react-navigation/stack';

import Search from '../../pages/Search';
import SearchStudent from '../../pages/Search/SearchStudent';
import SearchStudentParent from '../../pages/Search/SearchStudent/SearchStudentParent';
import SearchStudentReq from '../../pages/Search/SearchStudent/SearchStudentReq';
import SearchStudentNote from '../../pages/Search/SearchStudent/SearchStudentNote';

import InsertStudentNotes from '../../pages/Insert/InsertStudentNotes';

const Stack = createStackNavigator();

export default function SearchStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='SearchIndex' component={Search} />
			<Stack.Screen name='SearchStudent' component={SearchStudent} />
			<Stack.Screen
				name='SearchStudentParent'
				component={SearchStudentParent}
			/>
			<Stack.Screen name='SearchStudentReq' component={SearchStudentReq} />
			<Stack.Screen name='SearchStudentNote' component={SearchStudentNote} />
			<Stack.Screen name='InsertStudentNotes' component={InsertStudentNotes} />
		</Stack.Navigator>
	);
}
