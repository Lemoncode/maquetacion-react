import { MemberEntity, createDefaultMemberEntity, UserEntity } from "model";

export const getAllMembers = (
	organizationName: string
): Promise<MemberEntity[]> => {
	const gitHubMembersUrl: string = `https://api.github.com/orgs/${organizationName}/members`;

	return fetch(gitHubMembersUrl)
		.then((response) => checkStatus(response, organizationName))
		.then((response) => parseJSON(response))
		.then((data) => resolveMembers(data, organizationName));
};

export const getUser = (login: string): Promise<UserEntity> => {
	const gitHubUserUrl: string = `https://api.github.com/users/${login}`;

	return fetch(gitHubUserUrl)
		.then((response) => checkStatus(response, login))
		.then((response) => parseJSON(response))
		.then((data) => resolveUser(data));
};

const checkStatus = (response: Response, name: string): Promise<Response> => {
	if (response.status >= 200 && response.status < 300) {
		return Promise.resolve(response);
	} else {
		let error = new Error(response.statusText);
		throw `El usuario o compañía ${name} no existe en nuestra base de datos: ${error}`;
	}
};

const parseJSON = (response: Response): any => {
	return response.json();
};

const resolveMembers = (
	data: any,
	organizationName: string
): Promise<MemberEntity[]> => {
	const members = data.map((gitHubMember) => {
		const member: MemberEntity = createDefaultMemberEntity();

		member.id = gitHubMember.id;
		member.login = gitHubMember.login;
		member.avatar_url = gitHubMember.avatar_url;
		member.company = organizationName;
		return member;
	});

	return Promise.resolve(members);
};

const resolveUser = (data: UserEntity): Promise<UserEntity> => {
	const user: UserEntity = { ...data };

	return Promise.resolve(user);
};
