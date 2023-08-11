export interface Placeholder {
	id: string,
	label: string,
}

export interface ModuleOptions {
	placeholders: Placeholder[],
	className?: string,
}
