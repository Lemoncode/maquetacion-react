import * as React from "react";
import { MemberEntity } from "model";

interface Props {}

interface Context {
	members: MemberEntity[];
	setMembers: (members: MemberEntity[]) => void;
	organization: string;
	setOrganization: (organization: string) => void;
	booleanError: boolean;
	setBooleanError: (booleanError: boolean) => void;
	txtError: string;
	setTxtError: (txtError: string) => void;
}

export const MembersContext = React.createContext<Context>(null);

export const MemberProvider = (props) => {
	const [members, setMembers] = React.useState<MemberEntity[]>([]);
	const [organization, setOrganization] = React.useState<string>("");
	const [booleanError, setBooleanError] = React.useState<boolean>(false);
	const [txtError, setTxtError] = React.useState<string>("");

	return (
		<MembersContext.Provider
			value={{
				members,
				setMembers,
				organization,
				setOrganization,
				booleanError,
				setBooleanError,
				txtError,
				setTxtError
			}}
		>
			{props.children}
		</MembersContext.Provider>
	);
};
