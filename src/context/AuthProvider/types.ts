export interface IUser {
	code?: string;
	token?: string;
}

export interface IEstudante {
	id: string,
	nome: string;
	ra: string;
	cpf: string;
	email_institucional: string;
	responsavel: IResponsavel;
	registros: IRegistro[];
	ocorrencias: IOcorrencia[];
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
	data_ocorrencia: string;
	nome_usuario_relacionado: string;
	tipo_ocorrencia: string;
}

export interface IContext extends IUser {
	estudante: IEstudante[] | null;
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
