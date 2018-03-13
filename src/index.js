// const GoogleAnalytics = {
//   onLoad: (props) => {
//       ga('send', 'event', {
//           eventCategory: props.name,
//       });
//   },
//   willMount: () => {

//   },
//   didMount: () => {

//   },
//   willUnmount: () => {

//   },
// };

// <Test name="Homepage CTA" driver?={GoogleAnalytics}>
//   <Control id?="Control" traffic?="20">
//       <div>Control</div>
//   </Control>
//   <Variation id?="Control" traffic?="40">
//       <div>Variation 1</div>
//   </Variation>
//   <Variation id?="Control 2" traffic?="40">
//       <div>Variation 2</div>
//   </Variation>
// </Test>

// --

// Category
// Action
// Label
// Event Value

import React, {Component} from 'react'

export default class extends Component {
  render() {
    return <div>
      <h2>Welcome to React components</h2>
    </div>
  }
}
