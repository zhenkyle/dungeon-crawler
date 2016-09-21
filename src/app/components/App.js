function App() {
  return (
    <div className="HolyGrail">
      <Header/>
      <div className="HolyGrail-body">
        <main className="HolyGrail-content">
          <Board/>
          <Mask/>
        </main>
      </div>
      <Footer/>
    </div>
  );
}
