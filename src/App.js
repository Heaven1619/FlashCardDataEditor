import React, { Component } from 'react';
import Data from './BundledData';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Sets : Data,
      SetIndex: 0
    }
  }
  openSet(i) {
    this.setState({SetIndex: i});
    this.setState({showSet: true});
  }
  handleInputChange(index, side, event) {
    var cards = this.state.Sets[this.state.SetIndex].cards.slice();
    cards[index][side] = event.target.value;
    this.setState(prev => {
      prev.Sets[prev.SetIndex].cards = cards;
    })
  }
  handleExport() {
    console.log(JSON.stringify(this.state.Sets))
  }
  render() {
    return (
      <div className="App">
        <div onClick={this.handleExport.bind(this)}>استخراج</div>
        {!this.state.showSet?<div className="Sets">
          {this.state.Sets.map((Set, i)=> {
            return <div onClick={this.openSet.bind(this, i)} className="Set"><img src={Set.image} style={{width: 200, height: 250}} /><span style={{marginTop: 10}}>{Set.setName}</span></div>
          })}
        </div> :
        <div className="SetScreen">
          {this.state.Sets[this.state.SetIndex].setName}
          {this.state.Sets[this.state.SetIndex].cards.map((card, i) => {
            return <div className="Card">
                <input type="text" onChange={this.handleInputChange.bind(this, i, 0)} value={card[0]}></input>
                <input type="text" style={{direction: 'rtl'}} onChange={this.handleInputChange.bind(this, i, 1)} value={card[1]}></input>
                <input type="text" onChange={this.handleInputChange.bind(this, i, 2)} value={card[2]}></input>
                <input type="text" onChange={this.handleInputChange.bind(this, i, 3)} value={card[3]? card[3] : ''}></input>
              </div>
          })}
          <div onClick={() => {this.setState({showSet: false})}}>بازگشت</div>
          <div onClick={() => this.setState({SetIndex: this.state.SetIndex + 1})}>جعبه بعدی</div>
        </div>}
      </div>
    );
  }
}

export default App;
