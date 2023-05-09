import { Dispatch, SetStateAction } from 'react';

export interface IUser {
	code?: string;
	token?: string;
}

export interface IEstudante {
	id: string;
	nome: string;
	ra: string;
	cpf: string;
	email_institucional: string;
	responsavel: IResponsavel;
	registros: IRegistro[];
	disciplinas: IDisciplina[];
}

export interface IDisciplina {
	id: string;
	nome: string;
	semestre: string;
	turma: string;
	horarios: IHorario[];
}

export interface IHorario {
	periodo: string;
	dia_semana: string;
	tempo_inicio: string;
	tempo_fim: string;
}

export interface IResponsavel {
	nome: string;
	email: string;
	telefone: string;
}

export interface IRegistro {
	dia_hora_saida: string;
	descricao: string;
	dia_liberacao: string;
}

export interface IOcorrencia {
	id: string;
	data_ocorrencia: string;
	nome_usuario_relacionado: string;
	relatorio: string;
	status: string;
	usuario: IUsuario;
	estudante: IEstudante;
}

export interface IUsuario {
	nome: string;
}

export interface IContext extends IUser {
	estudante: IEstudante[];
	setStudent: (estudante: IEstudante) => void;
	loading: boolean;
	authenticate: (code: string, password: string) => Promise<void>;
	logout: () => void;
	getEstudante: ({
		ra,
		cpf,
		nome,
	}: {
		ra?: string;
		cpf?: string;
		nome?: string;
	}) => Promise<void>;
}

export interface IAuthProvider {
	children: JSX.Element;
}
