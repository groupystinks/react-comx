import React         from 'react';

const propTypes = {
  currentUser: React.PropTypes.object,
};

class HomePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
          <div>
            Home
          </div>
    );
  }

}

HomePage.propTypes = propTypes;

export default HomePage;
