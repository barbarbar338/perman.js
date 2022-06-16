import { expect } from "chai";
import { Perman } from "../src";

type FlagTypes = "a" | "b" | "c";

const flags: FlagTypes[] = ["a", "b", "c"];

let perman: Perman<FlagTypes>;
let flags_a: number;
let flags_ab: number;
let flags_abc: number;
let flags_empty: number;
let flags_full: number;
let flags_unknown: number;
let a: number, b: number, c: number, d: number;

describe("Create instance (static)", () => {
	it("should create instance (static)", (done) => {
		perman = Perman.from(flags);

		expect(typeof perman).to.equal("object");
		expect(perman instanceof Perman).to.equal(true);
		expect(perman.keys()).to.be.deep.equal(flags);

		done();
	});
});

describe("Get values (static)", () => {
	it("Get values (a) (static)", (done) => {
		a = perman.get("a");
		expect(a).to.equal(1 << 0);

		done();
	});

	it("Get values (b) (static)", (done) => {
		b = perman.get("b");
		expect(b).to.equal(1 << 1);

		done();
	});

	it("Get values (c) (static)", (done) => {
		c = perman.get("c");
		expect(c).to.equal(1 << 2);

		done();
	});

	it("Get values (all) (static)", (done) => {
		expect(perman.values()).to.be.deep.equal([1 << 0, 1 << 1, 1 << 2]);

		done();
	});

	it("Get values (unknown) (static)", (done) => {
		d = perman.get("d" as FlagTypes);
		expect(d).to.equal(0);

		done();
	});
});

describe("Serialize (static)", () => {
	it("Serialize (a) (static)", (done) => {
		flags_a = perman.serialize(["a"]);
		expect(flags_a).to.be.equal(a);

		done();
	});

	it("Serialize (ab) (static)", (done) => {
		flags_ab = perman.serialize(["a", "b"]);
		expect(flags_ab).to.be.equal(a | b);

		done();
	});

	it("Serialize (abc) (static)", (done) => {
		flags_abc = perman.serialize(["a", "b", "c"]);
		expect(flags_abc).to.be.equal(a | b | c);

		done();
	});

	it("Serialize (full) (static)", (done) => {
		flags_full = perman.full();
		expect(flags_full).to.be.equal(a | b | c);

		done();
	});

	it("Serialize (empty) (static)", (done) => {
		flags_empty = perman.serialize([]);
		expect(flags_empty).to.be.equal(0);

		done();
	});

	it("Serialize (unknown) (static)", (done) => {
		flags_unknown = perman.serialize(["d" as FlagTypes]);
		expect(flags_unknown).to.be.equal(d);

		done();
	});
});

describe("Deserialize (static)", () => {
	it("Deserialize (a) (static)", (done) => {
		expect(perman.deserialize(flags_a)).to.be.deep.equal(["a"]);

		done();
	});

	it("Deserialize (ab) (static)", (done) => {
		expect(perman.deserialize(flags_ab)).to.be.deep.equal(["a", "b"]);

		done();
	});

	it("Deserialize (abc) (static)", (done) => {
		expect(perman.deserialize(flags_abc)).to.be.deep.equal(["a", "b", "c"]);

		done();
	});

	it("Deserialize (full) (static)", (done) => {
		expect(perman.deserialize(flags_full)).to.be.deep.equal([
			"a",
			"b",
			"c",
		]);

		done();
	});

	it("Deserialize (empty) (static)", (done) => {
		expect(perman.deserialize(flags_empty)).to.be.deep.equal([]);

		done();
	});

	it("Deserialize (unknown) (static)", (done) => {
		expect(perman.deserialize(flags_unknown)).to.be.deep.equal([]);

		done();
	});
});

describe("Match (static)", () => {
	it("Match (a) (static)", (done) => {
		expect(perman.match(flags_a, ["a"])).to.be.true;
		expect(perman.match(flags_a, ["b"])).to.be.false;
		expect(perman.match(flags_a, ["c"])).to.be.false;
		expect(perman.match(flags_a, ["a", "b"])).to.be.false;
		expect(perman.match(flags_a, ["a", "c"])).to.be.false;
		expect(perman.match(flags_a, ["b", "c"])).to.be.false;
		expect(perman.match(flags_a, ["a", "b", "c"])).to.be.false;

		done();
	});

	it("Match (ab) (static)", (done) => {
		expect(perman.match(flags_ab, ["a"])).to.be.true;
		expect(perman.match(flags_ab, ["b"])).to.be.true;
		expect(perman.match(flags_ab, ["c"])).to.be.false;
		expect(perman.match(flags_ab, ["a", "b"])).to.be.true;
		expect(perman.match(flags_ab, ["a", "c"])).to.be.false;
		expect(perman.match(flags_ab, ["b", "c"])).to.be.false;
		expect(perman.match(flags_ab, ["a", "b", "c"])).to.be.false;

		done();
	});

	it("Match (abc) (static)", (done) => {
		expect(perman.match(flags_abc, ["a"])).to.be.true;
		expect(perman.match(flags_abc, ["b"])).to.be.true;
		expect(perman.match(flags_abc, ["c"])).to.be.true;
		expect(perman.match(flags_abc, ["a", "b"])).to.be.true;
		expect(perman.match(flags_abc, ["a", "c"])).to.be.true;
		expect(perman.match(flags_abc, ["b", "c"])).to.be.true;
		expect(perman.match(flags_abc, ["a", "b", "c"])).to.be.true;

		done();
	});

	it("Match (full) (static)", (done) => {
		expect(perman.match(flags_full, ["a"])).to.be.true;
		expect(perman.match(flags_full, ["b"])).to.be.true;
		expect(perman.match(flags_full, ["c"])).to.be.true;
		expect(perman.match(flags_full, ["a", "b"])).to.be.true;
		expect(perman.match(flags_full, ["a", "c"])).to.be.true;
		expect(perman.match(flags_full, ["b", "c"])).to.be.true;
		expect(perman.match(flags_full, ["a", "b", "c"])).to.be.true;

		done();
	});

	it("Match (empty) (static)", (done) => {
		expect(perman.match(flags_empty, ["a"])).to.be.false;
		expect(perman.match(flags_empty, ["b"])).to.be.false;
		expect(perman.match(flags_empty, ["c"])).to.be.false;
		expect(perman.match(flags_empty, ["a", "b"])).to.be.false;
		expect(perman.match(flags_empty, ["a", "c"])).to.be.false;
		expect(perman.match(flags_empty, ["b", "c"])).to.be.false;
		expect(perman.match(flags_empty, ["a", "b", "c"])).to.be.false;

		done();
	});

	it("Match (unknown) (static)", (done) => {
		expect(perman.match(flags_unknown, ["a"])).to.be.false;
		expect(perman.match(flags_unknown, ["b"])).to.be.false;
		expect(perman.match(flags_unknown, ["c"])).to.be.false;
		expect(perman.match(flags_unknown, ["a", "b"])).to.be.false;
		expect(perman.match(flags_unknown, ["a", "c"])).to.be.false;
		expect(perman.match(flags_unknown, ["b", "c"])).to.be.false;
		expect(perman.match(flags_unknown, ["a", "b", "c"])).to.be.false;

		done();
	});
});

describe("Match (with empty array) (static)", () => {
	it("Match (with empty array) (a) (static)", (done) => {
		expect(perman.match(flags_a, [])).to.be.true;

		done();
	});

	it("Match (with empty array) (ab) (static)", (done) => {
		expect(perman.match(flags_ab, [])).to.be.true;

		done();
	});

	it("Match (with empty array) (abc) (static)", (done) => {
		expect(perman.match(flags_abc, [])).to.be.true;

		done();
	});

	it("Match (with empty array) (full) (static)", (done) => {
		expect(perman.match(flags_full, [])).to.be.true;

		done();
	});

	it("Match (with empty array) (empty) (static)", (done) => {
		expect(perman.match(flags_empty, [])).to.be.true;

		done();
	});

	it("Match (with empty array) (unknown) (static)", (done) => {
		expect(perman.match(flags_unknown, [])).to.be.true;

		done();
	});
});

describe("Some (static)", () => {
	it("Some (a) (static)", (done) => {
		expect(perman.some(flags_a, ["a"])).to.be.true;
		expect(perman.some(flags_a, ["b"])).to.be.false;
		expect(perman.some(flags_a, ["c"])).to.be.false;
		expect(perman.some(flags_a, ["a", "b"])).to.be.true;
		expect(perman.some(flags_a, ["a", "c"])).to.be.true;
		expect(perman.some(flags_a, ["b", "c"])).to.be.false;
		expect(perman.some(flags_a, ["a", "b", "c"])).to.be.true;

		done();
	});

	it("Some (ab) (static)", (done) => {
		expect(perman.some(flags_ab, ["a"])).to.be.true;
		expect(perman.some(flags_ab, ["b"])).to.be.true;
		expect(perman.some(flags_ab, ["c"])).to.be.false;
		expect(perman.some(flags_ab, ["a", "b"])).to.be.true;
		expect(perman.some(flags_ab, ["a", "c"])).to.be.true;
		expect(perman.some(flags_ab, ["b", "c"])).to.be.true;
		expect(perman.some(flags_ab, ["a", "b", "c"])).to.be.true;

		done();
	});

	it("Some (abc) (static)", (done) => {
		expect(perman.some(flags_abc, ["a"])).to.be.true;
		expect(perman.some(flags_abc, ["b"])).to.be.true;
		expect(perman.some(flags_abc, ["c"])).to.be.true;
		expect(perman.some(flags_abc, ["a", "b"])).to.be.true;
		expect(perman.some(flags_abc, ["a", "c"])).to.be.true;
		expect(perman.some(flags_abc, ["b", "c"])).to.be.true;
		expect(perman.some(flags_abc, ["a", "b", "c"])).to.be.true;

		done();
	});

	it("Some (full) (static)", (done) => {
		expect(perman.some(flags_full, ["a"])).to.be.true;
		expect(perman.some(flags_full, ["b"])).to.be.true;
		expect(perman.some(flags_full, ["c"])).to.be.true;
		expect(perman.some(flags_full, ["a", "b"])).to.be.true;
		expect(perman.some(flags_full, ["a", "c"])).to.be.true;
		expect(perman.some(flags_full, ["b", "c"])).to.be.true;
		expect(perman.some(flags_full, ["a", "b", "c"])).to.be.true;

		done();
	});

	it("Some (empty) (static)", (done) => {
		expect(perman.some(flags_empty, ["a"])).to.be.false;
		expect(perman.some(flags_empty, ["b"])).to.be.false;
		expect(perman.some(flags_empty, ["c"])).to.be.false;
		expect(perman.some(flags_empty, ["a", "b"])).to.be.false;
		expect(perman.some(flags_empty, ["a", "c"])).to.be.false;
		expect(perman.some(flags_empty, ["b", "c"])).to.be.false;
		expect(perman.some(flags_empty, ["a", "b", "c"])).to.be.false;

		done();
	});

	it("Some (unknown) (static)", (done) => {
		expect(perman.some(flags_unknown, ["a"])).to.be.false;
		expect(perman.some(flags_unknown, ["b"])).to.be.false;
		expect(perman.some(flags_unknown, ["c"])).to.be.false;
		expect(perman.some(flags_unknown, ["a", "b"])).to.be.false;
		expect(perman.some(flags_unknown, ["a", "c"])).to.be.false;
		expect(perman.some(flags_unknown, ["b", "c"])).to.be.false;
		expect(perman.some(flags_unknown, ["a", "b", "c"])).to.be.false;

		done();
	});
});

describe("Some (with empty array) (static)", () => {
	it("Some (with empty array) (a) (static)", (done) => {
		expect(perman.some(flags_a, [])).to.be.true;

		done();
	});

	it("Some (with empty array) (ab) (static)", (done) => {
		expect(perman.some(flags_ab, [])).to.be.true;

		done();
	});

	it("Some (with empty array) (abc) (static)", (done) => {
		expect(perman.some(flags_abc, [])).to.be.true;

		done();
	});

	it("Some (with empty array) (full) (static)", (done) => {
		expect(perman.some(flags_full, [])).to.be.true;

		done();
	});

	it("Some (with empty array) (empty) (static)", (done) => {
		expect(perman.some(flags_empty, [])).to.be.true;

		done();
	});

	it("Some (with empty array) (unknown) (static)", (done) => {
		expect(perman.some(flags_unknown, [])).to.be.true;

		done();
	});
});

describe("Has flag (static)", () => {
	it("Has flag (a) (static)", (done) => {
		expect(perman.has(flags_a, "a")).to.be.true;
		expect(perman.has(flags_a, "b")).to.be.false;
		expect(perman.has(flags_a, "c")).to.be.false;

		expect(perman.has(flags_a, a)).to.be.true;
		expect(perman.has(flags_a, b)).to.be.false;
		expect(perman.has(flags_a, c)).to.be.false;
		expect(perman.has(flags_a, a | b)).to.be.false;
		expect(perman.has(flags_a, a | c)).to.be.false;
		expect(perman.has(flags_a, b | c)).to.be.false;
		expect(perman.has(flags_a, a | b | c)).to.be.false;

		done();
	});

	it("Has flag (ab) (static)", (done) => {
		expect(perman.has(flags_ab, "a")).to.be.true;
		expect(perman.has(flags_ab, "b")).to.be.true;
		expect(perman.has(flags_ab, "c")).to.be.false;

		expect(perman.has(flags_ab, a)).to.be.true;
		expect(perman.has(flags_ab, b)).to.be.true;
		expect(perman.has(flags_ab, c)).to.be.false;
		expect(perman.has(flags_ab, a | b)).to.be.true;
		expect(perman.has(flags_ab, a | c)).to.be.false;
		expect(perman.has(flags_ab, b | c)).to.be.false;
		expect(perman.has(flags_ab, a | b | c)).to.be.false;

		done();
	});

	it("Has flag (abc) (static)", (done) => {
		expect(perman.has(flags_abc, "a")).to.be.true;
		expect(perman.has(flags_abc, "b")).to.be.true;
		expect(perman.has(flags_abc, "c")).to.be.true;

		expect(perman.has(flags_abc, a)).to.be.true;
		expect(perman.has(flags_abc, b)).to.be.true;
		expect(perman.has(flags_abc, c)).to.be.true;
		expect(perman.has(flags_abc, a | b)).to.be.true;
		expect(perman.has(flags_abc, a | c)).to.be.true;
		expect(perman.has(flags_abc, b | c)).to.be.true;
		expect(perman.has(flags_abc, a | b | c)).to.be.true;

		done();
	});

	it("Has flag (full) (static)", (done) => {
		expect(perman.has(flags_full, "a")).to.be.true;
		expect(perman.has(flags_full, "b")).to.be.true;
		expect(perman.has(flags_full, "c")).to.be.true;

		expect(perman.has(flags_full, a)).to.be.true;
		expect(perman.has(flags_full, b)).to.be.true;
		expect(perman.has(flags_full, c)).to.be.true;
		expect(perman.has(flags_full, a | b)).to.be.true;
		expect(perman.has(flags_full, a | c)).to.be.true;
		expect(perman.has(flags_full, b | c)).to.be.true;
		expect(perman.has(flags_full, a | b | c)).to.be.true;

		done();
	});

	it("Has flag (empty) (static)", (done) => {
		expect(perman.has(flags_empty, "a")).to.be.false;
		expect(perman.has(flags_empty, "b")).to.be.false;
		expect(perman.has(flags_empty, "c")).to.be.false;

		expect(perman.has(flags_empty, a)).to.be.false;
		expect(perman.has(flags_empty, b)).to.be.false;
		expect(perman.has(flags_empty, c)).to.be.false;
		expect(perman.has(flags_empty, a | b)).to.be.false;
		expect(perman.has(flags_empty, a | c)).to.be.false;
		expect(perman.has(flags_empty, b | c)).to.be.false;
		expect(perman.has(flags_empty, a | b | c)).to.be.false;
		expect(perman.has(flags_empty, 0)).to.be.true;

		done();
	});

	it("Has flag (unknown) (static)", (done) => {
		expect(perman.has(flags_unknown, "a")).to.be.false;
		expect(perman.has(flags_unknown, "b")).to.be.false;
		expect(perman.has(flags_unknown, "c")).to.be.false;

		expect(perman.has(flags_unknown, a)).to.be.false;
		expect(perman.has(flags_unknown, b)).to.be.false;
		expect(perman.has(flags_unknown, c)).to.be.false;
		expect(perman.has(flags_unknown, a | b)).to.be.false;
		expect(perman.has(flags_unknown, a | c)).to.be.false;
		expect(perman.has(flags_unknown, b | c)).to.be.false;
		expect(perman.has(flags_unknown, a | b | c)).to.be.false;
		expect(perman.has(flags_unknown, 0)).to.be.true;

		done();
	});
});

describe("Add flag (static)", () => {
	it("Add flag (a) (static)", (done) => {
		expect(perman.add(flags_a, "a")).to.be.equal(a);
		expect(perman.add(flags_a, "b")).to.be.equal(a | b);
		expect(perman.add(flags_a, "c")).to.be.equal(a | c);

		expect(perman.deserialize(perman.add(flags_a, "a"))).to.be.deep.equal([
			"a",
		]);
		expect(perman.deserialize(perman.add(flags_a, "b"))).to.be.deep.equal([
			"a",
			"b",
		]);
		expect(perman.deserialize(perman.add(flags_a, "c"))).to.be.deep.equal([
			"a",
			"c",
		]);

		done();
	});

	it("Add flag (ab) (static)", (done) => {
		expect(perman.add(flags_ab, "a")).to.be.equal(a | b);
		expect(perman.add(flags_ab, "b")).to.be.equal(a | b);
		expect(perman.add(flags_ab, "c")).to.be.equal(a | b | c);

		expect(perman.deserialize(perman.add(flags_ab, "a"))).to.be.deep.equal([
			"a",
			"b",
		]);
		expect(perman.deserialize(perman.add(flags_ab, "b"))).to.be.deep.equal([
			"a",
			"b",
		]);
		expect(perman.deserialize(perman.add(flags_ab, "c"))).to.be.deep.equal([
			"a",
			"b",
			"c",
		]);

		done();
	});

	it("Add flag (abc) (static)", (done) => {
		expect(perman.add(flags_abc, "a")).to.be.equal(a | b | c);
		expect(perman.add(flags_abc, "b")).to.be.equal(a | b | c);
		expect(perman.add(flags_abc, "c")).to.be.equal(a | b | c);

		expect(perman.deserialize(perman.add(flags_abc, "a"))).to.be.deep.equal(
			["a", "b", "c"],
		);
		expect(perman.deserialize(perman.add(flags_abc, "b"))).to.be.deep.equal(
			["a", "b", "c"],
		);
		expect(perman.deserialize(perman.add(flags_abc, "c"))).to.be.deep.equal(
			["a", "b", "c"],
		);

		done();
	});

	it("Add flag (full) (static)", (done) => {
		expect(perman.add(flags_full, "a")).to.be.equal(a | b | c);
		expect(perman.add(flags_full, "b")).to.be.equal(a | b | c);
		expect(perman.add(flags_full, "c")).to.be.equal(a | b | c);

		expect(
			perman.deserialize(perman.add(flags_full, "a")),
		).to.be.deep.equal(["a", "b", "c"]);
		expect(
			perman.deserialize(perman.add(flags_full, "b")),
		).to.be.deep.equal(["a", "b", "c"]);
		expect(
			perman.deserialize(perman.add(flags_full, "c")),
		).to.be.deep.equal(["a", "b", "c"]);

		done();
	});

	it("Add flag (empty) (static)", (done) => {
		expect(perman.add(flags_empty, "a")).to.be.equal(a);
		expect(perman.add(flags_empty, "b")).to.be.equal(b);
		expect(perman.add(flags_empty, "c")).to.be.equal(c);

		expect(
			perman.deserialize(perman.add(flags_empty, "a")),
		).to.be.deep.equal(["a"]);
		expect(
			perman.deserialize(perman.add(flags_empty, "b")),
		).to.be.deep.equal(["b"]);
		expect(
			perman.deserialize(perman.add(flags_empty, "c")),
		).to.be.deep.equal(["c"]);

		done();
	});

	it("Add flag (unknown) (static)", (done) => {
		expect(perman.add(flags_unknown, "a")).to.be.equal(a);
		expect(perman.add(flags_unknown, "b")).to.be.equal(b);
		expect(perman.add(flags_unknown, "c")).to.be.equal(c);

		expect(
			perman.deserialize(perman.add(flags_unknown, "a")),
		).to.be.deep.equal(["a"]);
		expect(
			perman.deserialize(perman.add(flags_unknown, "b")),
		).to.be.deep.equal(["b"]);
		expect(
			perman.deserialize(perman.add(flags_unknown, "c")),
		).to.be.deep.equal(["c"]);

		done();
	});
});

describe("Remove flag (static)", () => {
	it("Remove flag (a) (static)", (done) => {
		expect(perman.remove(flags_a, "a")).to.be.equal(0);
		expect(perman.remove(flags_a, "b")).to.be.equal(a);
		expect(perman.remove(flags_a, "c")).to.be.equal(a);

		expect(
			perman.deserialize(perman.remove(flags_a, "a")),
		).to.be.deep.equal([]);
		expect(
			perman.deserialize(perman.remove(flags_a, "b")),
		).to.be.deep.equal(["a"]);
		expect(
			perman.deserialize(perman.remove(flags_a, "c")),
		).to.be.deep.equal(["a"]);

		done();
	});

	it("Remove flag (ab) (static)", (done) => {
		expect(perman.remove(flags_ab, "a")).to.be.equal(b);
		expect(perman.remove(flags_ab, "b")).to.be.equal(a);
		expect(perman.remove(flags_ab, "c")).to.be.equal(a | b);

		expect(
			perman.deserialize(perman.remove(flags_ab, "a")),
		).to.be.deep.equal(["b"]);
		expect(
			perman.deserialize(perman.remove(flags_ab, "b")),
		).to.be.deep.equal(["a"]);
		expect(
			perman.deserialize(perman.remove(flags_ab, "c")),
		).to.be.deep.equal(["a", "b"]);

		done();
	});

	it("Remove flag (abc) (static)", (done) => {
		expect(perman.remove(flags_abc, "a")).to.be.equal(b | c);
		expect(perman.remove(flags_abc, "b")).to.be.equal(a | c);
		expect(perman.remove(flags_abc, "c")).to.be.equal(a | b);

		expect(
			perman.deserialize(perman.remove(flags_abc, "a")),
		).to.be.deep.equal(["b", "c"]);
		expect(
			perman.deserialize(perman.remove(flags_abc, "b")),
		).to.be.deep.equal(["a", "c"]);
		expect(
			perman.deserialize(perman.remove(flags_abc, "c")),
		).to.be.deep.equal(["a", "b"]);

		done();
	});

	it("Remove flag (full) (static)", (done) => {
		expect(perman.remove(flags_full, "a")).to.be.equal(b | c);
		expect(perman.remove(flags_full, "b")).to.be.equal(a | c);
		expect(perman.remove(flags_full, "c")).to.be.equal(a | b);

		expect(
			perman.deserialize(perman.remove(flags_full, "a")),
		).to.be.deep.equal(["b", "c"]);
		expect(
			perman.deserialize(perman.remove(flags_full, "b")),
		).to.be.deep.equal(["a", "c"]);
		expect(
			perman.deserialize(perman.remove(flags_full, "c")),
		).to.be.deep.equal(["a", "b"]);

		done();
	});

	it("Remove flag (empty) (static)", (done) => {
		expect(perman.remove(flags_empty, "a")).to.be.equal(0);
		expect(perman.remove(flags_empty, "b")).to.be.equal(0);
		expect(perman.remove(flags_empty, "c")).to.be.equal(0);

		expect(
			perman.deserialize(perman.remove(flags_empty, "a")),
		).to.be.deep.equal([]);
		expect(
			perman.deserialize(perman.remove(flags_empty, "b")),
		).to.be.deep.equal([]);
		expect(
			perman.deserialize(perman.remove(flags_empty, "c")),
		).to.be.deep.equal([]);

		done();
	});

	it("Remove flag (unknown) (static)", (done) => {
		expect(perman.remove(flags_unknown, "a")).to.be.equal(0);
		expect(perman.remove(flags_unknown, "b")).to.be.equal(0);
		expect(perman.remove(flags_unknown, "c")).to.be.equal(0);

		expect(
			perman.deserialize(perman.remove(flags_unknown, "a")),
		).to.be.deep.equal([]);
		expect(
			perman.deserialize(perman.remove(flags_unknown, "b")),
		).to.be.deep.equal([]);
		expect(
			perman.deserialize(perman.remove(flags_unknown, "c")),
		).to.be.deep.equal([]);

		done();
	});
});
