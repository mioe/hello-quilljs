export interface Placeholder {
	id: string,
	label: string,
}

export interface ModuleOptions {
	placeholder: Placeholder[],
	className?: string,
}
