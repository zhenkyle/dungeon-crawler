function BoardCell({data}) {
  let className;
  switch (data) {
    case SOIL:
      className = null;
      break;
    case SPACE:
      className = "room";
      break;
    case ENEMY:
      className = "enemy";
      break;
    case MEDICINE:
      className = "medicine";
      break;
    case PLAYER:
      className = "player";
      break;
    case WEAPON:
      className = "weapon";
      break;
    case STAIRS:
      className = "stairs";
      break;
    case BLACK:
      className = "black";
      break;
    default:
      className = null;
  }
  return (
    <td className={className}>
    </td>
  );
}
BoardCell.propTypes = {
  data: React.PropTypes.number.isRequired
};

function BoardRow({data}) {
  return (
    <tr>
    {data.map((v, i) =>
      <BoardCell key={i} data={v}/>
    )}
    </tr>
  );
}
BoardRow.propTypes = {
  data: React.PropTypes.array.isRequired
};

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
  data: React.PropTypes.array.isRequired,
  top: React.PropTypes.number.isRequired,
  left: React.PropTypes.number.isRequired
};
