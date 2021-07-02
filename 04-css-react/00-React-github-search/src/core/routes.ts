import { generatePath } from "react-router-dom";

interface SwitchRoutes {
	root: string;
	index: string;
	members: string;
	fileMember: string;
}

export const switchRoutes: SwitchRoutes = {
	root: "/",
	index: "/index",
	members: "/members/:organization",
	fileMember: "/file-member/:login"
};

type NavigationFunction = (login: string) => string;

interface LinkRoutes extends Omit<SwitchRoutes, "fileMember" | "members"> {
	fileMember: NavigationFunction;
	members: NavigationFunction;
}

export const linkRoutes: LinkRoutes = {
	...switchRoutes,
	fileMember: (login) => generatePath(switchRoutes.fileMember, { login }),
	members: (organization) =>
		generatePath(switchRoutes.members, { organization })
};
