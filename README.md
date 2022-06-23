[![stars](https://img.shields.io/github/stars/barbarbar338/perman.js?color=yellow&logo=github&style=for-the-badge)](https://github.com/barbarbar338/perman)
[![license](https://img.shields.io/github/license/barbarbar338/perman.js?logo=github&style=for-the-badge)](https://github.com/barbarbar338/perman.js)
[![supportServer](https://img.shields.io/discord/711995199945179187?color=7289DA&label=Support&logo=discord&style=for-the-badge)](https://discord.gg/BjEJFwh)
[![forks](https://img.shields.io/github/forks/barbarbar338/perman.js?color=green&logo=github&style=for-the-badge)](https://github.com/barbarbar338/perman.js)
[![issues](https://img.shields.io/github/issues/barbarbar338/perman.js?color=red&logo=github&style=for-the-badge)](https://github.com/barbarbar338/perman.js)

<p align="center">
  <img src="https://raw.githubusercontent.com/barbarbar338/readme-template/main/icon.png" alt="Logo" width="160" height="160" />
  <h3 align="center">Perman.JS</h3>

  <p align="center">
    🔑 Permission management made easy
    <br />
    <a href="https://discord.gg/BjEJFwh"><strong>Get support »</strong></a>
    <br />
    <br />
    <a href="https://github.com/barbarbar338/perman/issues">Report Bug</a>
    ·
    <a href="https://github.com/barbarbar338/perman/issues">Request Feature</a>
    ·
    <a href="https://338.rocks">Webpage</a>
  </p>
</p>

# 🔑 Perman

Permission management made easy

# 📦 Installation

-   Using yarn: `yarn add perman`
-   Using npm: `npm i perman`

# 🤓 Usage

See [API](#-api) for all methods

```js
import { Perman } from "perman";

const perman = Perman.from(["user", "verified", "admin"]);

const user = perman.serialize(["user"]);
const verified = perman.serialize(["user", "verified"]);
const admin = perman.serialize(["user", "admin"]);

perman.has(user, "user"); // true
perman.has(user, "admin"); // false;
perman.has(verified, "verified"); // true;
perman.has(verified, "admin"); // false;
perman.has(admin, "admin"); // true;

// add permissions
perman.has(user, "verified"); // false;
user = perman.add(user, "verified");
perman.has(user, "verified"); // true;

// remove permissions
perman.has(verified, "verified"); // true;
verified = perman.remove(verified, "verified");
perman.has(verified, "verified"); // false;
```

# 📄 License

Copyright © 2022 [Barış DEMİRCİ](https://github.com/barbarbar338).

Distributed under the [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html) License. See `LICENSE` for more information.

# 🧦 Contributing

Fell free to use GitHub's features.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/my-feature`)
3. Run prettier (`npm run format`)
4. Commit your Changes (`git commit -m 'my awesome feature my-feature'`)
5. Push to the Branch (`git push origin feature/my-feature`)
6. Open a Pull Request

# 🔥 Show your support

Give a ⭐️ if this project helped you!

# 📞 Contact

-   Mail: demirci.baris38@gmail.com
-   Discord: https://discord.gg/BjEJFwh
-   Instagram: https://www.instagram.com/ben_baris.d/
-   Webpage: https://338.rocks

# 📜 API

| Method                        | Description                                                                         | Usage                                                       | Output     |
| ----------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------- | ---------- |
| `from` (static)               | Creates a new Perman instance                                                       | `<Perman>.from(flags: string[])`                            | `Perman`   |
| `keys`                        | Returns all flag names                                                              | `perman.keys()`                                             | `string[]` |
| `values`                      | Returns all flag values                                                             | `perman.values()`                                           | `number[]` |
| `get`                         | Returns the numeric value of flag                                                   | `perman.get(flag: string)`                                  | `number`   |
| `serialize`                   | Serializes the flags                                                                | `perman.serialize(flags: string[])`                         | `number`   |
| `deserialize`                 | Deserializes the permission                                                         | `perman.deserialize(permissions: number)`                   | `string[]` |
| `match`                       | Matches permissions with flags, if permissions has all flags, returns true          | `perman.match(permissions: number, flags: string[])`        | `boolean`  |
| `matchAll` (alias of `match`) | Matches permissions with flags, if permissions has all flags, returns true          | `perman.matchAll(permissions: number, flags: string[])`     | `boolean`  |
| `hasAll` (alias of `match`)   | Matches permissions with flags, if permissions has all flags, returns true          | `perman.hasAll(permissions: number, flags: string[])`       | `boolean`  |
| `some`                        | Matches permissions with flags, if permissions has at least one flag, returns true  | `perman.some(permissions: number, flags: string[])`         | `boolean`  |
| `hasSome` (alias of `some`)   | Matches permissions with flags, if permissions has at least one flag, returns true  | `perman.hasSome(permissions: number, flags: string[])`      | `boolean`  |
| `hasNone`                     | Matches permissions with flags, if permissions has at least one flag, returns false | `perman.hasNone(permissions: number, flags: string[])`      | `boolean`  |
| `none` (alias of `hasNone`)   | Matches permissions with flags, if permissions has at least one flag, returns false | `perman.hasNone(permissions: number, flags: string[])`      | `boolean`  |
| `has`                         | Checks if the given permission is granted                                           | `perman.has(permission: number, flag: (number or string))`  | `boolean`  |
| `test` (alias of `has`)       | Checks if the given permission is granted                                           | `perman.test(permission: number, flag: (number or string))` | `boolean`  |
| `add`                         | Adds a new flag to given permission                                                 | `perman.add(permission: number, flag: string)`              | `number`   |
| `remove`                      | Removes a flag from given permission                                                | `perman.remove(permission: number, flag: string)`           | `number`   |
| `full`                        | Creates a permission with all flags                                                 | `perman.full()`                                             | `number`   |
