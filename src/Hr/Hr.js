/*
 * from https://css-tricks.com/examples/hrs/
*/

import React, {Component} from 'react';

const styles = require('./Hr.css');

class Hr extends Component {
  render() {
    return (
      <section className={styles.hr}>
        <span className={styles.hr_after}>§</span>
      </section>
    );
  }
}

export default Hr;
