import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IOcorrencia } from '../context/AuthProvider/types';

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
	SearchStudentCurso: undefined;
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
	NotesRelate: IOcorrencia;
};

export type propsStack = NativeStackNavigationProp<stackParamList>;
export type RootRouteProps<RouteName extends keyof stackParamList> = RouteProp<
	stackParamList,
	RouteName
>;
