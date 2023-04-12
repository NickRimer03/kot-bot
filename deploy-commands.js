import refresh from "./src/refresh-all-commands.js";
import del from "./src/delete-all-commands.js";

Promise.all([import("dotenv"), import("path")]).then(
  ([
    {
      default: { config },
    },
    path,
  ]) => {
    config({ path: path.resolve() + "/.env" });
    (async () => {
      if (process.env.DELETE === "1") {
        del();
      } else {
        refresh();
      }
    })();
  }
);
