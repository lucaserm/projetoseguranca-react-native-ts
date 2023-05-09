import Api from '../../api';
import { IUser } from './types';
import local from '@react-native-async-storage/async-storage';

export async function setUserLocalStorage(user: IUser | null) {
	await local.setItem('u', JSON.stringify(user));
}

export async function getUserLocalStorage() {
	const json = await local.getItem('u');

	if (!json) return null;

	return JSON.parse(json) ?? null;
}

export async function LoginRequest(codigo: string, password: string) {
	try {
		const request = await Api.post('login', { codigo });
		if (!request.data.id) return null;
		return request.data;
	} catch (error) {
		return null;
	}
}

export async function EstudanteRequest({
	ra,
	cpf,
	nome,
}: {
	ra?: string;
	cpf?: string;
	nome?: string;
}) {
	try {
		const request = await Api.post('estudante/buscar', { ra, cpf, nome });
		if (request.data.length == 0) return null;
		return request.data;
	} catch (error) {
		return null;
	}
}

export async function OcorrenciaRequest(id: string) {
	try {
		const request = await Api.get('ocorrencia/listar/' + id);
		return request.data;
	} catch (error) {
		return null;
	}
}
