import React, { Component } from 'react';
import { render } from 'react-dom';
import './main.css';
import Hypothesis from '../../src';
import Variation from '../../src/Variation';
import GoogleTagManager from '../../src/drivers/GoogleTagManager';

const driver = GoogleTagManager();

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      times: 1
    };

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

  render() {
    const { times } = this.state;

    return (
      <main className="main">
        <h1>React Bucket Test</h1>

        <Hypothesis name="Homepage CTA" driver={driver}>
          <Variation
            name="Control"
            traffic={50}
            render={({ registerEvent }) => (
              <div
                role="presentation"
                onClick={() => registerEvent({ action: 'click' })}
                className="variation variation--control"
              >
                Control | {times}
              </div>
            )}
          />
          <Variation
            name="Variation"
            traffic={25}
            render={({ registerEvent }) => (
              <div
                role="presentation"
                onClick={() => registerEvent({ action: 'click' })}
                className="variation variation--one"
              >
                Variation One | {times}
              </div>
            )}
          />
          <Variation
            name="Variation 2"
            traffic={25}
            render={({ registerEvent }) => (
              <div
                role="presentation"
                onClick={() => registerEvent({ action: 'click' })}
                className="variation variation--two"
              >
                Variation Two | {times}
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
                times: times + 1
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
