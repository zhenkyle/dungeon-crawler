function Board({data, top, left}) {
  return (
    <table style={{top: `${top}px`, left: `${left}px`}}>
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
  }))).isRequired,
  top: React.PropTypes.number.isRequired,
  left: React.PropTypes.number.isRequired
};
