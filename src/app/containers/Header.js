const connect = ReactRedux.connect;

let Header = function ({onToggleDarknessClick}) {
  return (
    <header className="HolyGrail-header">
      <h1>Dungeon Crawler</h1>
      <h4>Kill the boss in dungeon 4</h4>
      <p><strong>Health:</strong> 100 <strong>Weapon:</strong> stick <strong>Attack:</strong> 7 <strong>Level:</strong> 0 <strong>Next Level:</strong> 60XP <strong>Dungeon:</strong> 0 <button onClick={onToggleDarknessClick}>Toggle Darkness</button></p>
    </header>
  );
};
Header.propTypes = {
  onToggleDarknessClick: React.PropTypes.func.isRequired
};

function mapStateToPropsHeader(state) {
  return {};
}

function mapDispatchToPropsHeader(dispatch) {
  return {
    onToggleDarknessClick: () => {
      dispatch(toggleDarkness());
    }
  };
}

Header = connect(
  mapStateToPropsHeader,
  mapDispatchToPropsHeader
)(Header);
