import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PlayButton() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'


  return (
      <PlayArrowIcon  style={{ fontSize: 80 }}  ></PlayArrowIcon>
  );
}

export default connect(mapStoreToProps)(PlayButton);
