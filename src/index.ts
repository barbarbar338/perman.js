export type Permissions = number;

export class Perman<T extends string> {
	private readonly _FLAGS: {
		[key in T]: number;
	};

	constructor(flags: T[]) {
		this._FLAGS = flags.reduce((all, key, index) => {
			const representation = 2 ** index;

			return {
				...all,
				[key]: representation,
			};
		}, {} as Record<T, Permissions>);
	}

	public static from = <T extends string>(flags: T[]): Perman<T> =>
		new Perman(flags);

	public keys = (): T[] => Object.keys(this._FLAGS) as T[];
	public values = (): Permissions[] => Object.values(this._FLAGS);
	public get = (flag: T): Permissions => this._FLAGS[flag] ?? 0;

	public serialize = (flags: T[]): Permissions => {
		if (!flags.length) return 0;

		let res = 0;
		for (const flag of flags) res |= this.get(flag);
		return res;
	};

	public deserialize = (permissions: Permissions): T[] => {
		if (!permissions) return [];

		return Object.entries<Permissions>(this._FLAGS)
			.filter((f) => f[1] === (f[1] & permissions))
			.map((f) => f[0]) as T[];
	};

	public match = (permission: Permissions, flags: T[]): boolean => {
		if (!flags.length) return true;

		if (
			flags.some(
				(match) => (permission & this.get(match)) != this.get(match),
			)
		)
			return false;
		return true;
	};

	public matchAll = this.match;
	public hasAll = this.match;

	public some = (permission: Permissions, flags: T[]): boolean => {
		if (!flags.length) return true;

		if (
			flags.some(
				(match) => (permission & this.get(match)) == this.get(match),
			)
		)
			return true;
		return false;
	};

	public hasSome = this.some;

	public hasNone = (permission: Permissions, flags: T[]): boolean => {
		if (!flags.length) return true;

		if (
			flags.some(
				(match) => (permission & this.get(match)) == this.get(match),
			)
		)
			return false;
		return true;
	};

	public none = this.hasNone;

	public has = (permissions: Permissions, flag: Permissions | T): boolean => {
		flag = typeof flag == "number" ? flag : this.get(flag);
		return (permissions & flag) == flag;
	};

	public test = this.has;

	public add = (permission: Permissions, flag: T): Permissions => {
		const oldFlags = this.deserialize(permission);
		const newFlags = [...oldFlags, flag];
		return this.serialize(newFlags as T[]);
	};

	public remove = (permission: Permissions, flag: T): Permissions => {
		const oldFlags = this.deserialize(permission);
		const newFlags = oldFlags.filter((f) => f !== flag);
		return this.serialize(newFlags as T[]);
	};

	public full = (): Permissions => {
		const allFlags = this.keys();
		const permissions = this.serialize(allFlags);
		return permissions;
	};
}
