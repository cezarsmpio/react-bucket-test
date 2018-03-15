import React, { Component } from 'react';
import { render } from 'react-dom';
import './main.css';
import Hypothesis from '../../src';
import Variation from '../../src/Variation';
import GoogleAnalytics from '../../src/drivers/GoogleAnalytics';

const driver = GoogleAnalytics();

class Demo extends Component {
  constructor(props) {
    super(props);

    const gaScript = document.createElement('script');
    gaScript.src = '//www.googletagmanager.com/gtag/js?id=UA-66499040-5';

    const gaTextScript = document.createElement('script');
    const gaContent = document.createTextNode(`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-66499040-5');
    `);

    gaTextScript.appendChild(gaContent);

    document.body.appendChild(gaScript);
    document.body.appendChild(gaTextScript);
  }

  state = {
    times: 1,
  };

  render() {
    return (
      <main className="main">
        <h1>React Bucket Test</h1>

        <Hypothesis name="Homepage CTA" driver={driver} key={+new Date()}>
          <Variation
            label="Control"
            render={({ registerEvent }) => (
              <div
                onClick={() => registerEvent({ action: 'click' })}
                className="variation variation--control"
              >
                Control | {this.state.times}
              </div>
            )}
          />
          <Variation
            label="Variation"
            render={({ registerEvent }) => (
              <div
                onClick={() => registerEvent({ action: 'click' })}
                className="variation variation--one"
              >
                Variation One | {this.state.times}
              </div>
            )}
          />
          <Variation
            label="Variation 2"
            render={({ registerEvent }) => (
              <div
                onClick={() => registerEvent({ action: 'click' })}
                className="variation variation--two"
              >
                Variation Two | {this.state.times}
              </div>
            )}
          >
            <div>Variation 2</div>
          </Variation>
        </Hypothesis>

        <div className="button-groups">
          <button
            className="button button--green"
            type="button"
            onClick={() => window.location.reload()}
          >
            Refresh the page
          </button>
          <button
            className="button button--blue"
            type="button"
            onClick={() => {
              localStorage.clear();

              this.setState({
                times: this.state.times + 1,
              });
            }}
          >
            Pick new variation
          </button>
        </div>
      </main>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
