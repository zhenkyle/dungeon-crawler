function Board({data}) {
  return (
    <table>
      <tbody>
      {data.map((v, i) =>
        <BoardRow key={i} data={v}/>
      )}
      </tbody>
    </table>
  );
}

Board.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.shape({
    type: React.PropTypes.number
  }))).isRequired
};
