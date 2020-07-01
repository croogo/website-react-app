import React from 'react';
import PropTypes from 'prop-types';

class Feature extends React.Component {
  render () {
    const { imgPath } = this.props;
    return (
      <div className="feature text-center">
        { imgPath
            ? <img alt='' src={ imgPath } class='img-fluid mb-5' style={{ maxHeight: '120px' }}/>
            : null
        }
        <h5 className={`text-${this.props.color}`}>{this.props.title}</h5>
        <p className="lead">{this.props.text}</p>
      </div>
    );
  }
};

Feature.propType = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string
};

Feature.defaultProps = {
  color: "primary",
  icon: "tools",
  title: "Work with Bootstrap",
  text: "Bootstrap 4 is a toolkit of front-end components for websites. It provides multiple utilities and components for writing responsive websites."
};

export default Feature;
