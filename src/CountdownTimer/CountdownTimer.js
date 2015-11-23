import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

const styles = require('./CountdownTimer.css');

class CountdownTimer extends Component {
  static displayName = 'CountdownTimer';

  static propTypes = {
    deadline: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    size: PropTypes.string,
    colorFinished: PropTypes.string,
    colorGoing: PropTypes.string,
    textColor: PropTypes.string,
  }

  constructor() {
    super();
    this._format;
    this._parsedFormatArr;
    this._radius;
    this._fraction;
    this._secondCanvasContext;
    this._minuteCanvasContext;
    this._hourCanvasContext;
    this._dayCanvasContext;
    this._yearCanvasContext;
    this._timeMeasure = {
      second: 60,
      minute: 60,
      hour: 24,
      day: 365,
      year: 5,
    };
    this.state = {
      year: '',
      day: '',
      hour: '',
      minute: '',
      second: '',
    };
  }

  componentWillMount() {
    this._radius = parseInt(this.props.size, 10) / 2;
    this._format = this.props.options.format;
    const parsedFormat = this._parseFormat(this._format);
    this._parsedFormatArr = Object.keys(parsedFormat).filter(key => parsedFormat[key]);
  }

  componentDidMount() {
    this._setupCanvas();
    this._drawBackground();
    this.initializeClock(this.props.deadline, this.props.options);
    this.setState({deadline: this.props.deadline});
  }

  initializeClock = (endtime, options) => {
    const format = options.format.split('-').map((form) => {
      return {[form]: form};
    }).reduce((previousValue, currentValue) => {
      return Object.assign(
        {},
        previousValue,
        currentValue
      );
    });
    this._updateClock(endtime, format);
  }

  _updateClock() {
    const time = this._getTime(this.state.deadline);
    /* loop through format to compute period */
    const basePeriod = [365, 24, 60, 60, 1];
    const yearInSeconds = 365 * 24 * 60 * 60 * 1;
    const period = basePeriod.reduce((preValue, currentValue, index) => {
      console.log(this._parsedFormatArr[index - 1]);
      return (yearInSeconds /
          preValue * (this._parsedFormatArr[index - 1] ? currentValue : 1)
      );
    });

    console.log(period);
    if (time.total <= 0) {
      clearTimeout(timeinterval);
    }

    this.setState({
      year: time.years,
      day: time.days,
      hour: ('0' + time.hours).slice(-2),
      minute: ('0' + time.minutes).slice(-2),
      second: ('0' + time.seconds).slice(-2),
    });

    this._clearTimer();
    this._drawTimer();

    // here!!
    const timeinterval = setTimeout(this._updateClock.bind(this), 1000);
  }

  _getTime(endtime) {
    const total   = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours   = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days    = Math.floor(total / (1000 * 60 * 60 * 24) % 365);
    const years   = Math.floor(total / (1000 * 60 * 60 * 24 * 365));
    return {
      total,
      years,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  _parseFormat = (format) => {
    const parsedFormat = format.split('-').map((form) => {
      return {[form]: form};
    }).reduce((previousValue, currentValue) => {
      return Object.assign(
        {},
        previousValue,
        currentValue
      );
    });

    return parsedFormat;
  }

  _setupCanvas = () => {
    this._parsedFormatArr.map(format => {
      const propsName = '_' + format + 'CanvasContext';
      const refsName = format + '_canvas';
      const canvas  = ReactDOM.findDOMNode(this.refs[refsName]);
      this[propsName] = canvas.getContext('2d');
      this[propsName].textAlign = 'center';
      this[propsName].textBaseline = 'middle';
      this[propsName].font = 'bold 20px Arial';
    });
  }

  _drawBackground = () => {
    this._parsedFormatArr.map(format => {
      const propsName = '_' + format + 'CanvasContext';
      const timeMeasure = this._timeMeasure[format];
      const isRemainderZero = parseInt(this.state[format], 10) % timeMeasure === 0;
      this[propsName].beginPath();
      this[propsName].globalAlpha = 1 / 3;
      isRemainderZero
        ? this[propsName].fillStyle = this.props.colorFinished
        : this[propsName].fillStyle = this.props.colorGoing;
      this[propsName].arc(this._radius, this._radius, this._radius, 0, Math.PI * 2, false);
      this[propsName].arc(this._radius, this._radius, this._radius / 1.3, Math.PI * 2, 0, true);
      this[propsName].fill();
    });
  }

  _clearTimer = () => {
    this._parsedFormatArr.map(format => {
      const propsName = '_' + format + 'CanvasContext';
      this[propsName].clearRect(0, 0, 2000, 2000);
    });
    this._drawBackground();
  }

  _drawTimer = () => {
    this._parsedFormatArr.map(format => {
      const timeMeasure = this._timeMeasure[format];
      const isRemainderZero = parseInt(this.state[format], 10) % timeMeasure === 0;
      const percent = 2 * parseInt(this.state[format], 10) / timeMeasure - 4.5;
      const propsName = '_' + format + 'CanvasContext';
      this[propsName].globalAlpha = 2 / 3;
      this[propsName].fillStyle = this.props.textColor;
      this[propsName].font = '32px Roboto';
      this[propsName].fillText(this.state[format], this._radius, this._radius - 15, );
      this[propsName].font = '24px Roboto';
      this[propsName].fillText(format, this._radius, this._radius + 15);
      this[propsName].beginPath();
      isRemainderZero
        ? this[propsName].fillStyle = this.props.colorFinished
        : this[propsName].fillStyle = this.props.colorGoing;
      this[propsName].arc(this._radius, this._radius, this._radius, Math.PI * 1.5, Math.PI * percent, false);
      this[propsName].arc(this._radius, this._radius, this._radius / 1.3, Math.PI * percent, Math.PI * 1.5, true);
      this[propsName].fill();
    });
  }

  render() {
    const format = (this._parseFormat(this._format));
    return (
      <div className={ styles.root_container }>
        <section
          className={ styles.timer_container }
          id="countdown"
          ref="countdown">
            {format.day ? (
            <div className={styles.canvas_container}>
              <canvas
                className="react-countdown-clock"
                ref="year_canvas"
                width={this.props.size}
                height={this.props.size}>
              </canvas>
            </div> ) : null}
            {format.day ? (
            <div className={styles.canvas_container}>
              <canvas
                className="react-countdown-clock"
                ref="day_canvas"
                width={this.props.size}
                height={this.props.size}>
              </canvas>
            </div> ) : null}
            {format.hour ? (
            <div className={styles.canvas_container}>
              <canvas
                className="react-countdown-clock"
                ref="hour_canvas"
                width={this.props.size}
                height={this.props.size}>
              </canvas>
            </div> ) : null}
            {format.minute ? (
            <div className={styles.canvas_container}>
              <canvas
                className="react-countdown-clock"
                ref="minute_canvas"
                width={this.props.size}
                height={this.props.size}>
              </canvas>
            </div> ) : null}
            {format.second ? (
            <div className={styles.canvas_container}>
              <canvas
                className="react-countdown-clock"
                ref="second_canvas"
                width={this.props.size}
                height={this.props.size}>
              </canvas>
            </div> ) : null}
          </section>
      </div>
    );
  }
}

export default CountdownTimer;
