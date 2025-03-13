# Week Planner (Svelte version)

I have written the same app in Svelte and React. This is the Svelte version (Svelte 5). They will be presented on my channel to compare the concepts and developer experience of both frameworks.

https://week-planner-svelte.netlify.app

It is a basic week planner in which plans for every week can be managed. Plans are saved in local storage of the browser.

## Comparison of bundle sizes

This is the size of the bundled, built assets (HTML + CSS + JS). Both versions use Vite.

-   [React version](https://github.com/ScriptRaccoon/week-planning-react): **84.59 kB** gzipped
-   [Svelte version](https://github.com/ScriptRaccoon/week-planning-svelte): **17.34 kB** gzipped

These results are quite shocking and are similar to the findings of my earlier [framework comparison project](https://github.com/ScriptRaccoon/shopping-list-frameworks).

## Notable differences

Many concepts are very similar between Svelte and React, especially since Svelte 5 came out, but there are many differences when it comes to the details.

In Svelte, updating the plans in the application (for example, renaming them) can be done easily in their respective child components, since state is reactive on a fine-grained level by default. But in the React version, this is more complicated, and the state change needs to be communicated to the top level App component and handled there.

The state changes are much more cumbersome to write in the React version, since they need to be functional. This would probably be easier with a React state library, but this would be an unfair comparison since Svelte does not require one.

The application needs conditional classes and transitions of elements. These are already built into Svelte. The React version requires the additional npm packages `classnames` and `react-transition-group`.
