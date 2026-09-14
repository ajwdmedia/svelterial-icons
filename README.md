> [!IMPORTANT]
> ### svelterial-icons is no longer being maintained.
> **Please switch to [ajwdmedia/svelterial-symbols](https://github.com/ajwdmedia/svelterial-symbols), which is now stable, at your earliest convenience ([npm](https://npmjs.com/package/@ajwdmedia/svelterial-symbols))**  
> - This package is built with Svelte 3, compatible with Svelte 4, and has some issues in Svelte 5.  
> - Material Icons have also not been updated in a long time, as the Symbols set seems to be the focus.  
> - Due to the component generation within the package, the svelte language service can need to parse thousands of components, leading to poor performance.
> - I personally have issues with this package not being interpreted correctly by WebStorm, leading to either false errors by importing individually, or removing tree shaking using the index files.  
> - **The new package** has QOL changes for CSS design system tokens - AKA if you use tailwind, upgrade.
> - The new package uses a different API which forces you to register each icon individually. This allows for greater tree shaking, and working via Proxies allows for much smaller bundles.
> - This also allows you to Bring Your Own SVG Path, and unify your icon usage into a single Icon component, importable from `import { Icon } from "$lib"`, and immediately use any of them via Threlte-like object access.
> 
> **You should update if your codebase is already Svelte 5. If your codebase is not Svelte 5, you should already be considering upgrading to Svelte 5 anyway, unless the cost is too great.**  

# @ajwdmedia/svelterial-icons

Svelte + Material Icons ❤️  

Copies SVG components from @material-design-icons/svg and creates Svelte components  
Also see sister project [ajwdmedia/svelterial-symbols](https://github.com/ajwdmedia/svelterial-symbols)

### Quirks
Files should be named the same as on the [Material Icons site](https://fonts.google.com/icons?icon.set=Material+Icons), however PascalCased  
Icon names that start with numbers have "Icon" preceeding them (`1k Plus => Icon1kPlus.svelte`)  
Icons are also grouped by style (Outline, Filled, etc) - if you're using a lot of icons from the same group consider setting up a vite alias to them (eg `@ajwdmedia/svelterial-icons/Outlined/Person.svelte => %icons/Person.svelte`)  

### License
*(Copied from [marella/material-design-icons](https://github.com/marella/material-design-icons))*   
Material design icons are created by [Google](https://github.com/google/material-design-icons#license)
>We have made these icons available for you to incorporate into your products under the [Apache License Version 2.0](https://github.com/marella/material-design-icons/blob/main/svg/LICENSE). Feel free to remix and re-share these icons and documentation in your products. We'd love attribution in your app's about screen, but it's not required.

