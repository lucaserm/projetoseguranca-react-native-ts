import React, { useState, useEffect, createContext } from 'react';
import { IAuthProvider, IContext, IEstudante, IUser } from './types';
import {
	EstudanteRequest,
	LoginRequest,
	getUserLocalStorage,
	setUserLocalStorage,
} from './util';

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
	const [user, setUser] = useState<IUser | null>();
	const [estudante, setEstudante] = useState<IEstudante[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getUserLocalStorage()
			.then((res) => setUser(res))
			.then(() => setLoading(false));
	}, []);

	function setStudent(estudante: IEstudante) {
		setEstudante([estudante]);
	}

	async function authenticate(code: string, password: string) {
		const response = await LoginRequest(code, password);
		const payload = { token: response.id, code };
		await setUserLocalStorage(payload);
		setUser(payload);
	}

	async function getEstudante({
		ra,
		cpf,
		nome,
	}: {
		ra?: string;
		cpf?: string;
		nome?: string;
	}) {
		const response: IEstudante[] = await EstudanteRequest({ ra, cpf, nome });
		const payload: IEstudante[] = response.map((res: IEstudante) => {
			return {
				id: res.id,
				ra: res.ra,
				cpf: res.cpf,
				nome: res.nome,
				email_institucional: res.email_institucional,
				responsavel: res.responsavel,
				registros: res.registros,
				disciplinas: res.disciplinas,
			};
		});
		setEstudante(payload);
	}

	async function logout() {
		await setUserLocalStorage(null);
		setUser(null);
	}

	return (
		<AuthContext.Provider
			value={{
				...user,
				estudante,
				setStudent,
				loading,
				authenticate,
				logout,
				getEstudante,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
