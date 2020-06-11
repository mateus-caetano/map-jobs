import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Swipe from '../../components/swipe';
import * as actions from '../../actions/index';

function Jobs(props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
      <Swipe data={props.jobs} />
    </View>
  );
}

function mapStateToProps({ jobs }) {
  return { jobs: jobs.results };
}

export default connect(mapStateToProps, actions)(Jobs);
