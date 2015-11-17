import React, {Component} from 'react';
import CountdownTimer from './CountdownTimer';

export default class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <CountdownTimer
        deadline={'Oct 29 2020 00:00:50 UTC+0800'}
        options={{format: 'year-day-hour-minute-second'}}
        size="200px" />
    );
  }
}
