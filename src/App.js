import React, {Component} from 'react';
import CountdownTimer from './CountdownTimer';

export default class App extends Component {
  constructor() {
    super();
    // this.deadline = 'Oct 29 2020 00:00:50 UTC+0800';
    // // year-day-hour-minute-second
    // this.options = {format: 'year-day'};
  }
  render() {
    return (
      <CountdownTimer deadline={'Oct 29 2020 00:00:50 UTC+0800'} options={{format: 'year-day-hour-minute-second'}} size="200px"/>
    );
  }
}
