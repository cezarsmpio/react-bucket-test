# react-bucket-test

[![https://nodei.co/npm/react-bucket-test.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/react-bucket-test.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/react-bucket-test)

<!-- badge -->

[![minified + gzip](https://badgen.net/bundlephobia/minzip/react-bucket-test)](https://bundlephobia.com/result?p=react-bucket-test)
[![npm version](https://img.shields.io/npm/v/react-bucket-test.svg)](https://www.npmjs.com/package/react-bucket-test)
[![npm download](https://img.shields.io/npm/dm/react-bucket-test.svg)](https://www.npmjs.com/package/react-bucket-test)
[![GitHub stars](https://img.shields.io/github/stars/cezarlz/react-bucket-test.svg?style=social&label=Star)](https://github.com/cezarlz/react-bucket-test)
[![GitHub issues](https://img.shields.io/github/issues/cezarlz/react-bucket-test.svg)](https://github.com/cezarlz/react-bucket-test/issues)
[![GitHub contributors](https://img.shields.io/github/contributors/cezarlz/react-bucket-test.svg)](https://GitHub.com/cezarlz/react-bucket-test/graphs/contributors/)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

<!-- endbadge -->

> Simplifying experiments with React.

## What's a "bucket test"?

> Bucket testing (sometimes referred to as A/B testing or split testing) is a term used to describe the method testing two versions of a website against one another to see which one performs better on specified key metrics (such as clicks, downloads or purchases).

[A/B testing on Wikipedia](https://en.m.wikipedia.org/wiki/A/B_testing)

## Installing

#### npm

```
npm install react-bucket-test
```

#### yarn

```
yarn add react-bucket-test
```

### Using

```js
import Hypothesis, { Variation, GoogleTagManager } from 'react-bucket-test';

const driver = GoogleTagManager({
  prefix: 'my_cool_prefix_'
});

const Header = () => (
  <header>
    <Hypothesis name="CTA Button" driver={driver}>
      <Variation
        name="Control"
        traffic={80}
        render={({ registerEvent }) => (
          <div>
            <button onClick={() => registerEvent({ action: 'click' })}>
              Get started for free
            </button>
          </div>
        )}
      />

      <Variation
        name="Variation"
        traffic={20}
        render={({ registerEvent }) => (
          <div>
            <button onClick={() => registerEvent({ action: 'click' })}>
              Create your account
            </button>
          </div>
        )}
      />
    </Hypothesis>
  </header>
);
```

That's it!

## Components

### `<Hypothesis>`

```js
const driver = myCustomDriver();

const HeroBanner = () => (
  <Hypothesis name="Homepage Hero Banner with Video" driver={driver}>
    ...
  </Hypothesis>
);
```

This is the container for your tests, that's the component that will read and set your variations, dispatch the events to the driver, all logic is here. It accepts only `<Variation>` as children.

#### `name`: string - required

It passes this value to the driver. It is an id like for your tests. It's better to have unique names for each hypothesis.

#### `driver`: object - required

This library provides some drivers, such as Google Tag Manager (more are coming). Drivers must follow an interface, you can check the section to create your own drivers.

### `<Variation>`

```js
<Variation
  name="Video with cats"
  traffic={50}
  render={({ registerEvent }) => (
    <HeroWithVideo
      video="cats.mp4"
      onPlay={() => registerEvent({ action: 'play', category: 'cats' })}
    />
  )}
/>
```

#### `name`: string - required

#### `traffic`: number

You can specify how to split the traffic of your tests. It must be a number. If you don't specify a traffic, it will split the traffic automatically through your variations equally. If you have 4 variations and the traffic is not specified, the traffic will be split into 25% for each variation.

**If you specify a traffic for one variation, you must specify for all of your variations.**

It uses weights, not percentage. This means you can use for example, 2, 1, 1 instead of 50, 25, 25.

#### `render`: ({ registerEvent: func, category: string, name: string, traffic: number | null }) => Component

To render your component. It passes down the following parameters:

- `registerEvent`: function - it accepts an object of any property as parameter, the driver will receive this object.
- `category`: string - the hypothesis name.
- `name`: string - the variation name.
- `traffic`: number - the variation traffic.

## Creating your own drivers

Drivers are used to register the events to a tracking tool, such as Google Tag Manager. You can pass any driver to the `<Hypothesis>` component. This library provides drivers for the following tracking tools:

- Google Tag Manager

To create your own driver, you just need to create an object with the following properties:

#### `prefix`: string

Default: `react_bucket_test_`

It's useful to create a namespace for your application.

#### `get`: (key: string) => string

Default: `localStorage.getItem`

Used by `<Hypothesis>` to render the correct variation.

#### `set`: (key: string, value: string) => void

Default: `localStorage.setItem`

Used by `<Hypothesis>` to set a variation in case if none exists.

#### `onMount`: ({ category: string, name: string, traffic: number | null }) => any

#### `onUnmount`: ({ category: string, name: string, traffic: number | null }) => any

`onMount` is called by `<Hypothesis>` when `componentDidMount`.

`onUnmount` is called by `<Hypothesis>` when `componentWillUnmount`.

- `category`: string - the hypothesis name.
- `name`: string - the variation name.
- `traffic`: number - the variation traffic.

#### `registerEvent`: (props: object) => any

That's the method that your `<Variation>` receives when rendered.

`props` receives at least:

- `category`: string - the hypothesis name.
- `name`: string - the variation name.
- `traffic`: number - the variation traffic.

**You will override these properties if you pass properties with those names.**

[Check all drivers we support.](https://github.com/cezarlz/react-bucket-test/tree/master/src/drivers)

### Google Tag Manager

It uses `dataLayer` variable to publish events to GTM.

Default:

- `prefix`: 'react*bucket_test_gtm*'
- `onMount`: `{ action: 'load', ...props }`
- `onUnmount`: `{ action: 'unmount', ...props }`
- `registerEvent`: `{ action: 'registerEvent', ...props }`

You can override any property:

```js
// drivers are not included to the final bundle size
import GoogleTagManager from 'react-bucket-test/lib/drivers/GoogleTagManager';

const driver = GoogleTagManager({
  prefix: 'experiment_'
});
```

![GTM Example](https://user-images.githubusercontent.com/954889/49771079-95b61200-fcce-11e8-9091-f4117d6e05d4.png)

---

Made with :heart:
