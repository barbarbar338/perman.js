export type IFlagsType<T extends string, K> = {
	[key in T]: K;
};

export class Permission<T extends string> {
	private readonly perman: Perman<T>;

	constructor(
		private readonly permission: number,
		private readonly _FLAGS: IFlagsType<T, number>,
	) {
		this.perman = new Perman<T>(Object.keys(this._FLAGS) as T[]);
	}

	private get = (flag: T): number => this._FLAGS[flag] ?? 0;

	public toNumber = () => this.permission;

	public deserialize = (): T[] => {
		if (!this.permission) return [];

		return Object.entries<number>(this._FLAGS)
			.filter((f) => f[1] === (f[1] & this.permission))
			.map((f) => f[0]) as T[];
	};

	public match = (flags: T[]): boolean => {
		if (!flags.length) return true;

		if (
			flags.some(
				(match) =>
					(this.permission & this.get(match)) != this.get(match),
			)
		)
			return false;
		return true;
	};

	public matchAll = this.match;
	public hasAll = this.match;

	public some = (flags: T[]): boolean => {
		if (!flags.length) return true;

		if (
			flags.some(
				(match) =>
					(this.permission & this.get(match)) == this.get(match),
			)
		)
			return true;
		return false;
	};

	public hasSome = this.some;

	public hasNone = (flags: T[]): boolean => {
		if (!flags.length) return true;

		if (
			flags.some(
				(match) =>
					(this.permission & this.get(match)) == this.get(match),
			)
		)
			return false;
		return true;
	};

	public none = this.hasNone;

	public has = (flag: number | T | Permission<T>): boolean => {
		const check =
			typeof flag == "string"
				? this.get(flag)
				: typeof flag == "number"
					? flag
					: flag.toNumber();
		return (this.permission & check) == check;
	};

	public test = this.has;

	public add = (...flags: T[]): Permission<T> => {
		const oldFlags = this.deserialize();
		const newFlags = Array.from(new Set([...oldFlags, ...flags]));
		return this.perman.serialize(newFlags as T[]);
	};

	public remove = (...flags: T[]): Permission<T> => {
		const oldFlags = this.deserialize();
		const newFlags = oldFlags.filter(
			(f) => !flags.some((flag) => f == flag),
		);
		return this.perman.serialize(newFlags as T[]);
	};

	public equals = (permission: Permission<T>): boolean => {
		return this.permission == permission.toNumber();
	};

	public sum(...permissions: Permission<T>[]): Permission<T> {
		const newPermission = permissions.reduce(
			(acc, p) => acc | p.toNumber(),
			this.permission,
		);
		return new Permission<T>(newPermission, this._FLAGS);
	}
}

export class Perman<T extends string> {
	private readonly _FLAGS: IFlagsType<T, Permission<T>>;
	private readonly _FLAGS_PASS: IFlagsType<T, number>;

	constructor(flags: T[]) {
		this._FLAGS_PASS = flags.reduce(
			(all, key, index) => {
				const representation = 2 ** index;

				return {
					...all,
					[key]: representation,
				};
			},
			{} as Record<T, number>,
		);

		this._FLAGS = flags.reduce(
			(all, key, index) => {
				const representation = 2 ** index;

				return {
					...all,
					[key]: new Permission(representation, this._FLAGS_PASS),
				};
			},
			{} as Record<T, Permission<T>>,
		);
	}

	public static from = <T extends string>(flags: T[]): Perman<T> =>
		new Perman(flags);

	public keys = (): T[] => Object.keys(this._FLAGS) as T[];
	public values = (): Permission<T>[] => Object.values(this._FLAGS);
	public get = (flag: T): Permission<T> =>
		this._FLAGS[flag] ?? new Permission(0, this._FLAGS_PASS);

	public serialize = (flags: T[]): Permission<T> => {
		if (!flags.length) return new Permission(0, this._FLAGS_PASS);

		let res = 0;
		for (const flag of flags) res |= this.get(flag).toNumber();
		return new Permission(res, this._FLAGS_PASS);
	};

	public fromBit = (bit: number): Permission<T> => {
		return new Permission(bit, this._FLAGS_PASS);
	};

	public full = (): Permission<T> => {
		const allFlags = this.keys();
		const permissions = this.serialize(allFlags);
		return permissions;
	};
}
