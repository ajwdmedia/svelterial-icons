import { readFile, writeFile, readdir } from "fs/promises";
import { resolve } from "path";

let packageJSON = JSON.parse(await readFile(resolve("./package/package.json"), { encoding: "utf-8" }));
packageJSON.devDependencies = undefined;
await writeFile(resolve("./package/package.json"), JSON.stringify(packageJSON, null, 4), { encoding: "utf-8" });

const folders = (await readdir(resolve("./package"), { withFileTypes: true, encoding: "utf-8" })).filter(it => it.isDirectory()).map(it => it.name);

for (const folder of folders) {
    const files = (await readdir(resolve(`./package/${folder}`), { withFileTypes: true, encoding: "utf-8" })).filter(it => it.isFile() && it.name.endsWith(".svelte.d.ts")).map(it => it.name);
    for (const file of files) {
        const content = await readFile(resolve(`./package/${folder}/${file}`), { encoding: "utf-8" });
        const lines = content.split("\n");
        for (let ix = 0; ix < lines.length; ix++) {
            if (!lines[ix].startsWith("export default class")) continue;
            const next = [ ...lines.slice(0, ix), "/** @deprecated Consider moving to ajwdmedia/svelterial-symbols when able */", ...lines.slice(ix) ].join("\n");
            await writeFile(resolve(`./package/${folder}/${file}`), next, { encoding: "utf-8" });
            break;
        }
    }
}
