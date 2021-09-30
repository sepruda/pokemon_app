# Issues

### PokeAPI graphQL API beta

Is in Beta and is a little bit of a mess. It
[doesn't support images](https://gitmemory.com/issue/PokeAPI/pokeapi/614/826330809),
so I had to download all the pokemon images from a repo and put them in the
public folder. Obviously not ideal, but solves the issue.

Also it doesn't have a field for a total count of pokemons, so I had to get that
from a HTTP request for use in pagination.

Also it doesn't seem to support searching multiple fields, which is why I had to
split up the name and ability search functionality.

# Architechture

The App is build with React
([Create React App](https://reactjs.org/docs/create-a-new-react-app.html)) with
the TypeScript option. It's using
[React Query](https://react-query.tanstack.com/overview) and
[graphql code generator](https://www.graphql-code-generator.com/) to access the
schema on the GraphQL server and generate hooks for fetching data.

Styling is done with [Emotion](https://emotion.sh/docs/introduction), it's using
some [Material UI components](https://mui.com/).

Query parameters are integrated with
[react-router-dom](https://reactrouter.com/web/guides/quick-start).

Code quality is ensure by TypeScipt and pre-commit hooks using `husky`,
`prettier` and `eslint`.

# Running the app

In the project directory, you can run:

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best
performance (recommended).

After the build is finished, you can serve the app with `serve`.

```
serve -s build
```

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This also generates GraphQL schemas.

### `yarn test`

Launches the test runner in the interactive watch mode.

Currently there's only one basic smoke test set up mounting the `App` component.
