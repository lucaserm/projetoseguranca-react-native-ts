import { createStackNavigator } from '@react-navigation/stack';

import Notes from '../../pages/Notes';
import NotesSent from '../../pages/Notes/NotesSent';
import NotesApproved from '../../pages/Notes/NotesApproved';
import NotesRepproved from '../../pages/Notes/NotesRepproved';
import NotesObs from '../../pages/Notes/NotesObs';

const Stack = createStackNavigator();

export default function NotesStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='NotesIndex' component={Notes} />
			<Stack.Screen name='NotesSent' component={NotesSent} />
			<Stack.Screen name='NotesApproved' component={NotesApproved} />
			<Stack.Screen name='NotesRepproved' component={NotesRepproved} />
			<Stack.Screen name='NotesObs' component={NotesObs} />
		</Stack.Navigator>
	);
}
