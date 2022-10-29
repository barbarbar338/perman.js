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

```js
import { Perman } from "perman";

const perman = Perman.from(["user", "verified", "admin"]);

const user = perman.serialize(["user"]);
const verified = perman.serialize(["user", "verified"]);
const admin = perman.serialize(["user", "admin"]);

user.has("user"); // true
user.has("admin"); // false;
verified.has("verified"); // true;
verified.has("admin"); // false;
admin.has("admin"); // true;

// add permissions
user.has("verified"); // false;
user = user.add("verified");
user.has("verified"); // true;

// remove permissions
verified.has("verified"); // true;
verified = verified.remove("verified");
verified.has("verified"); // false;
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
-   Webpage: https://338.rocks
