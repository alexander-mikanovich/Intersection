import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {interSection} from './inersection_function.js';

class InputList extends React.Component {
	  
  listItems() {
    return (
      this.props.numbers.map((number) =>
        <li key={number.id}>
		  <label>
            {number.value}
		  </label> 
		  <button 
		    key={number.id} 
			value={number.value} 
			onClick={(e) => this.props.handleMinus(number.id, e)}
		  >
		    -
		  </button>
        </li>
      )
	);
  }
  
  addElem() {
    return (
      <li key="add">
		<label>
          <input 
		    type="number" 
			value={this.props.newElem.value} 
			onChange={this.props.handleChange} 
		  />
        </label>
        <button onClick={this.props.handlePlus}>
		  +
		</button>
      </li>
	);
  }
  
  render() {
    return (
      <ul>
	    {this.listItems()}
	    {this.addElem()}
	  </ul>
    );
  }
}


class OutputList extends React.Component {
	  
  listItems() {
    return (
      this.props.numbers.map((number) =>
        <li key={number.id}>
		  <label>
            {number.value}
		  </label>		
        </li>
      )
	);
  }
    
  render() {
    return (
      <ul>
	    {this.listItems()}
	  </ul>
    );
  }
}


class InterSectionMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstArray: this.props.firstArray,
      secondArray: this.props.secondArray,
	  newElemFirst: {value:''},
	  newElemSecond: {value:''},
    };
  }	
	
  handleChange(array, event) {
	if (array !== 'first' && array !== 'second') {
      return;
	}	
	
	if (array === 'first') {
	  const maxIndex = this.state.firstArray[this.state.firstArray.length-1].id;	
	  this.setState(
	    { newElemFirst: 
	      {id:maxIndex + 1,value: parseInt(event.target.value)},
	    }
	  );
	}
	
	if (array === 'second') {
	  const maxIndex = this.state.secondArray[this.state.secondArray.length-1].id;	
	  this.setState(
	    { newElemSecond: 
	      {id:maxIndex + 1,value: parseInt(event.target.value)},
	    }
	  );
	}
  }

  handlePlus(array, event) {
	if (array !== 'first' && array !== 'second') {
      return;
	}		
	
	if (array === 'first') {	  
	  if (this.state.newElemFirst.id === undefined) {
        return;
	  }
      this.setState({
	    firstArray : [...this.state.firstArray, this.state.newElemFirst], 
	    newElemFirst: {value:''},
	  });
	}
	
	if (array === 'second') {	  
	  if (this.state.newElemSecond.id === undefined) {
        return;
	  }
      this.setState({
	    secondArray : [...this.state.secondArray, this.state.newElemSecond], 
	    newElemSecond: {value:''},
	  });
	}
  }

  handleMinus(array, id, event) {
	if (array !== 'first' && array !== 'second') {
      return;
	}		
	
	if (array === 'first') {	  
      const new_numbers = this.state.firstArray.slice(); 
      this.setState({
	    firstArray : new_numbers.filter((number) => { return number.id !== id; }), 
	  });
	}

	if (array === 'second') {	  
      const new_numbers = this.state.secondArray.slice(); 
      this.setState({
	    secondArray : new_numbers.filter((number) => { return number.id !== id; }), 
	  });
	}
  }  
    
  render() {

    return (
	  <div className="intersection">	
        <div className="input-data">
	      <div className="array">
		    <div className="title">Первый массив:</div> 
            <InputList 
		      numbers={this.state.firstArray} 
			  newElem={this.state.newElemFirst} 
			  handleChange={(e) => this.handleChange('first', e )}
			  handlePlus={(e) => this.handlePlus('first', e )}
			  handleMinus={(id, e) => this.handleMinus('first', id, e )}
		    />
          </div>
		  <div className="array"> 
		    <div className="title">Второй массив:</div> 
            <InputList 
		      numbers={this.state.secondArray} 
			  newElem={this.state.newElemSecond} 
			  handleChange={(e) => this.handleChange('second', e )}
			  handlePlus={(e) => this.handlePlus('second', e )}
			  handleMinus={(id, e) => this.handleMinus('second', id, e )}			
		    />
          </div>
		</div>  
		<div className="output-data">  
		  <div className="array"> 
		    <div className="title">Пересечение:</div> 
            <OutputList 
		      numbers={interSection(this.state.firstArray, this.state.secondArray)} 
		    />
          </div>		
        </div>
	  </div>
	  
	  
    );
  }
}




const first = [ 
	    {id:0, value:1} ,
		{id:1, value:8} ,
		{id:2, value:3} ,
		{id:3, value:4} ,
		{id:4, value:7} ,		
		];
const second = [
	    {id:0, value:2} ,
		{id:1, value:6} ,
		{id:2, value:8} ,
		{id:3, value:3} ,
		{id:4, value:5} ,		
		];	  



// ========================================


ReactDOM.render(
  <InterSectionMain firstArray={first} secondArray={second} />,
  document.getElementById('root')
);


