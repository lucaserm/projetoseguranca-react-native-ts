import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type stackParamList = {
	Login: undefined;
	HomeLogged: undefined;
	//Rotas de pesquisa
	SearchIndex: undefined;
	SearchStudent: undefined;
	SearchStudentParent: undefined;
	SearchStudentReq: undefined;
	SearchStudentNote: undefined;
	SearchStudentSubject: undefined;
	//Rotas de cadastro
	InsertIndex: undefined;
	InsertStudent: undefined;
	InsertStudentRegistro: undefined;
	InsertStudentNotes: undefined;
	InsertStudentSubject: undefined;
	InsertCurso: undefined;
	InsertSubject: undefined;
	InsertSubjectTime: undefined;
	InsertMatricula: undefined;
	InsertUser: undefined;
	//Rotas de ocorrências
	NotesIndex: undefined;
	NotesSent: undefined;
	NotesApproved: undefined;
	NotesRepproved: undefined;
	NotesObs: undefined;
};

export type propsStack = NativeStackNavigationProp<stackParamList>;
