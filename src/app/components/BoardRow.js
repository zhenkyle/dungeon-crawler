class BoardRow extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data;
  }
  render() {
    return (
      <tr>
      {this.props.data.map((v, i) =>
        <BoardCell key={i} data={v.type}/>
      )}
      </tr>
    );
  }
}
BoardRow.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.shape({
    type: React.PropTypes.number
  })).isRequired
};
