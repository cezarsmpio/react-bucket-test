# react-bucket-test


[![https://nodei.co/npm/react-bucket-test.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/react-bucket-test.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/react-bucket-test)

<!-- badge -->
[![npm version](https://img.shields.io/npm/v/react-bucket-test.svg)](https://www.npmjs.com/package/react-bucket-test)
[![npm download](https://img.shields.io/npm/dm/react-bucket-test.svg)](https://www.npmjs.com/package/react-bucket-test)

[![GitHub stars](https://img.shields.io/github/stars/cezarlz/react-bucket-test.svg?style=social&label=Star)](https://github.com/cezarlz/react-bucket-test)
[![GitHub issues](https://img.shields.io/github/issues/cezarlz/react-bucket-test.svg)](https://github.com/cezarlz/react-bucket-test/issues)
[![GitHub contributors](https://img.shields.io/github/contributors/cezarlz/react-bucket-test.svg)](https://GitHub.com/cezarlz/react-bucket-test/graphs/contributors/)

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

<!-- endbadge -->


> Simplifying experiments with React.

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
import Hypothesis, { Variation, GoogleTagManager } from 'react-bucket-test';

const driver = GoogleTagManager({
  prefix: 'my_cool_prefix_',
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
