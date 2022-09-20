import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

let packageJSON = JSON.parse(await readFile(resolve("./package/package.json"), { encoding: "utf-8" }));
packageJSON.devDependencies = undefined;
await writeFile(resolve("./package/package.json"), JSON.stringify(packageJSON, null, 4), { encoding: "utf-8" });