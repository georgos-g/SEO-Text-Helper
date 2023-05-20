import React from 'react';

function ProgressBar({ bgcolor, completed, completedColor }) {
  const containerStyles = {
    width: '100%',
    paddingRight: '16%',
    backgroundColor: 'grey',
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
    height: 20,
    // eslint-disable-next-line
    width: '100%',
  };
  const fillerStyles = {
    height: '100%',
    width: `${completedColor}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
    fontSize: '0.8em',
  };

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
}
export default ProgressBar;
