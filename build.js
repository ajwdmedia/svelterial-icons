//@ts-check

import { resolve } from "path";
import { readdir, readFile, writeFile, rm, mkdir } from "fs/promises";

const rootPath = resolve("./node_modules/@material-design-icons/svg");
const targetPath = resolve("./src/lib");

/**
 * 
 * @param {string} name 
 * @returns {string}
 */
const convertNameToPascalCase = (name) => {
    let hold = name.split("_").map(item => item[0].toUpperCase() + item.slice(1).toLowerCase()).join("");
    if (hold[0].match(/\d/)) hold = "Icon" + hold;
    return hold;
};

const convertSVG = async (base, file) => {
    let svgString = await readFile(resolve(rootPath, base, file + ".svg"), { encoding: "utf8" });

    svgString = svgString.replace(`width="24"`, `width="{width}"`);
    svgString = svgString.replace(`height="24"`, `height="{height}"`);
    svgString = svgString.replace(/<path d=/g, `<path fill="{fill}" d=`);

    let component = `
<script lang="ts">
    export let size: string = "1rem";
    export let width: string = size;
    export let height: string = size;
    export let fill: string = "white";
</script>

${svgString}
    `

    return { id: file, variant: convertNameToPascalCase(base), name: convertNameToPascalCase(file), component };
};


try {
    await rm(targetPath, { recursive: true });
} catch (_err) {
    console.log("Nothing Existed!")
}

try {
    await mkdir(targetPath, { recursive: true });
} catch (_err) {
    console.log("Couldn't re-create lib directory");
}

// Each folder is a style
let folders = (await readdir(rootPath, { withFileTypes: true, encoding: "utf8" })).filter(item => item.isDirectory()).map(item => item.name);
let foldered = new Map();

for (let folder of folders) {

    let files = (await readdir(resolve(rootPath, folder), { encoding: "utf8" })).filter(item => item.endsWith(".svg")).map(item => item.slice(0, -4));

    let converted = await Promise.all(files.map(name => convertSVG(folder, name)));

    await mkdir(resolve(targetPath, convertNameToPascalCase(folder)));

    await Promise.all(converted.map((item) => {

        return new Promise(async (promiseResolve) => {

            if (!foldered.has(item.variant)) {
                foldered.set(item.variant, []);
            }

            await writeFile(resolve(targetPath, item.variant, item.name + ".svelte"), item.component, { encoding: "utf8" });

            foldered.get(item.variant).push(item.name);

            promiseResolve(true);
        })

    }));

}

// Create Export Files

let finalExport = "";

for (const [variant, names] of foldered) {
    let exportFile = names.map(name => `export { default as ${name} } from "./${name}.svelte"`).join("\n");
    await writeFile(resolve(targetPath, variant, "index.ts"), exportFile, { encoding: 'utf8' });

    finalExport += `export * as ${variant} from "./${variant}/index"\n`;
}

await writeFile(resolve(targetPath, "index.ts"), finalExport, { encoding: 'utf8' });
