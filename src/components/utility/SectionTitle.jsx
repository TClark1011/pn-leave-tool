import React from 'react';

import Typography from "@material-ui/core/Typography";

class SectionTitle extends React.Component {

  style = {
      marginBottom:6
  }

  render() {
    return <Typography component="h2" variant="h2" className="section-title" style={this.style}>{this.props.children}</Typography>;
  }

}

export default SectionTitle;