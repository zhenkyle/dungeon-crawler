class Pos extends React.Component {
  render() {
    const children = this.props.children;
    return (
      <div style={{top: `${this.props.top}px`, left: `${this.props.left}px`}}>{children}</div>
    );
  }
}

Pos.propTypes = {
  top: React.PropTypes.number.isRequired,
  left: React.PropTypes.number.isRequired,
  children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired
};
