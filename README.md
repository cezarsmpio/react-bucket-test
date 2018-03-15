# react-bucket-test

[![https://nodei.co/npm/react-bucket-test.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/react-bucket-test.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/react-bucket-test)

[![npm package][npm-badge]][npm]

[npm-badge]: https://img.shields.io/npm/v/react-bucket-test.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-bucket-test



> Simplifying bucket tests.

### :warning: UNDER DEVELOPMENT :warning:

## What's a "bucket test"?

> Bucket testing (sometimes referred to as A/B testing or split testing) is a term used to describe the method testing two versions of a website against one another to see which one performs better on specified key metrics (such as clicks, downloads or purchases).

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
import Hypothesis, { Variation, GoogleAnalytics } from 'react-bucket-test';

const driver = GoogleAnalytics({
  prefix: 'my_cool_prefix_',
});

const Header = () => (
  <header>
    <Hypothesis name="CTA Button" driver={driver}>
      <Variation
        label="Control"
        render={({ registerEvent }) => (
          <div>
            <button onClick={() => registerEvent({ action: 'click' })}>
              Get started for free
            </button>
          </div>
        )}
      />

      <Variation
        label="Variation"
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

### API

To be defined. Good things are coming!

### Creating your own drivers

To be defined. Awesome things are coming!

### Contributors

To be defined.

### A/B tests explanation

To be defined.

---

Made with :heart:
