import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

class CountdownTimer extends Component {
  static displayName = 'CountdownTimer';
  static propTypes = {
    deadline: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    size: PropTypes.string,
  }
  constructor() {
    super();
    this._radius = null;
    this._fraction = null;
    this._secondCanvasContext = null;
    this.state = {
      years: null,
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
    };
  }

  componentDidMount() {
    this._setupCanvas();
    this._drawBackground();
    this.initializeClock(this.props.deadline, this.props.options);
    this.setState({deadline: this.props.deadline});
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
  initializeClock(endtime, options) {
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
  _setupCanvas = () => {
    const secondCanvas  = ReactDOM.findDOMNode(this.refs.second_canvas);
    this._secondCanvasContext = secondCanvas.getContext('2d');
    this._secondCanvasContext.textAlign = 'center';
    this._secondCanvasContext.textBaseline = 'middle';
    this._secondCanvasContext.font = 'bold 20px Arial';
  }

  _updateClock(endtime, format) {
    const time = this._getTime(this.state.deadline);

    if (time.total <= 0) {
      clearTimeout(timeinterval);
    }

    this.setState({
      years: time.years,
      days: time.days,
      hours: ('0' + time.hours).slice(-2),
      minutes: ('0' + time.minutes).slice(-2),
      seconds: ('0' + time.seconds).slice(-2),
    });
    // this._updateClock();
    this._clearTimer();
    this._drawTimer();

    const timeinterval = setTimeout(this._updateClock.bind(this), 1000);
  }

  _drawBackground = () => {
    this._secondCanvasContext.beginPath();
    this._secondCanvasContext.globalAlpha = 1 / 3;
    this._secondCanvasContext.arc(80.64, 80.64, 80.64, 0, Math.PI * 2, false);
    this._secondCanvasContext.arc(80.64, 80.64, 80.64 / 1.3, Math.PI * 2, 0, true);
    this._secondCanvasContext.fill();
  }

  _clearTimer = () => {
    this._secondCanvasContext.clearRect(0, 0, 1240, 1240);
    this._drawBackground();
  }

  _drawTimer = () => {
    const percent = 2 * parseInt(this.state.seconds, 10) / 60 - 4.5;
    console.log(this.state.seconds);
    this._secondCanvasContext.globalAlpha = 1 / 3;
    this._secondCanvasContext.fillStyle = 'grey';
    this._secondCanvasContext.beginPath();
    this._secondCanvasContext.arc(80.64, 80.64, 80.64, Math.PI * 1.5, Math.PI * percent, false);
    this._secondCanvasContext.arc(80.64, 80.64, 80.64 / 1.3, Math.PI * percent, Math.PI * 1.5, true);
    this._secondCanvasContext.fill();
  }

  render() {
    return (
      <div className="root-container">
        <section
          id="countdown"
          ref="countdown">
            <div className="years-container">
              <span className="years" ref="years">{this.state.years}</span>
              <div>Years</div>
            </div>
            <div>
              <span className="days" ref="days">{this.state.days}</span>
              <div>Days</div>
            </div>
            <div>
              <span className="hours" ref="hours">{this.state.hours}</span>
              <div>Hours</div>
            </div>
            <div>
              <span className="minutes"  ref="minutes">{this.state.minutes}</span>
              <div>Minutes</div>
            </div>
            <div>
              <span className="seconds"  ref="seconds">{this.state.seconds}</span>
              <canvas
                className="react-countdown-clock"
                ref="second_canvas"
                width={this.props.size}
                height={this.props.size}>
              </canvas>
              <div>Seconds</div>
            </div>
          </section>
      </div>
    );
  }
}

export default CountdownTimer;
