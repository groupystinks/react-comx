import React, {Component} from 'react';
import CountdownTimer from './CountdownTimer/CountdownTimer';
import Hr from './Hr/Hr';
import Colors from 'utils/ColorCollection';

const styles = require('./App.css');
const asean = require('assets/asean-logo-sm.png');

export default class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <section className="root">
        <div className={styles.content_container}>
            <div className={styles.header_container}>
              <h3 className={styles.header}>Time Left <span className={styles.header_sm}>to Haze-Free</span></h3>
              <img className={styles.img} src={asean}/>
            </div>
        </div>
        <Hr />
        <CountdownTimer
          deadline={'Oct 29 2020 00:00:50 UTC+0800'}
          options={{format: 'year-day-hour'}}
          size="180px"
          fontSize={32}
          colorFinished={Colors.white}
          colorGoing={Colors.greenyRed}
          textColor={Colors.grey800} />
      </section>
    );
  }
}
