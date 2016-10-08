class Board extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data;
  }
  render() {
    return (
      <table>
        <tbody>
        {this.props.data.map((v, i) =>
          <BoardRow key={i} data={v}/>
        )}
        </tbody>
      </table>
    );
  }
}

Board.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.shape({
    type: React.PropTypes.number
  }))).isRequired
};
