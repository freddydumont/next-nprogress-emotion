# next-nprogress-emotion

Theme aware NProgress component to use in Next.js apps using Emotion or ThemeUI.

This component borrows heavily from the [`next-nprogress`](https://github.com/sergiodxa/next-nprogress) package. It was refactored to fix [this issue](https://github.com/sergiodxa/next-nprogress/issues/76).

The original component was converted into a functional component using TypeScript and Emotion. It is theme aware so can be used with ThemeUI, or with any valid css color.

## Installation

```bash
yarn add next-nprogress-emotion
```

or

```bash
npm install next-nprogress-emotion
```

## Usage

### Component

Import it inside your `pages/_app.js`;

```js
import NProgress from 'next-nprogress-emotion';
```

Render the component in your [custom App container](https://nextjs.org/docs#custom-%3Capp%3E):

```jsx
<NProgress />
```

If you're using ThemeUI, that's all you need to do. The component will use the primary color by default.

You can change the color using a theme color or any css color:

```jsx
// using a theme color
<NProgress color="accent" />
```

```jsx
// using css
<NProgress color="#fff" />
```

### Advanced Config

You can configure NProgress using its [configuration options](https://github.com/rstacruz/nprogress#configuration).

```jsx
<NProgress
  color="#29d"
  options={{ trickleSpeed: 50 }}
  showAfterMs={300}
  spinner
/>
```
