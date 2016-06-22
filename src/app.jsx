var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var rootURL = 'https://blinding-inferno-5136.firebaseio.com/';
var Header = require('./header');
var List = require('./list')

var Hello = React.createClass({
	mixins:  [ ReactFire], //a mixin is a group of methods that sits on one object that gets copied to another object
	getInitialState: function() {
    return {
      items: {},
      loaded: false
    }
  },

  componentWillMount: function() {
    this.fb = new Firebase(rootURL + 'items/');
		this.bindAsObject(new Firebase(rootURL + 'items/'), 'items');
    this.fb.on('value', this.handleDataLoaded);
		// this.state.items => {}
	},
  render: function() {
  	
    return <div className = "row panel panel-default">
      <div className = "col-md-8 col-md-offset-2">
        <h2 className = "text-center">
          To-Do List
        </h2>
          <Header itemsStore={this.firebaseRefs.items} />
          <hr />
          <div className={"content " + (this.state.loaded ? 'loaded' : '')}> 
          <List items={this.state.items} />
          {this.deleteButton()}
          </div>

      </div>
    </div>

  },
  deleteButton: function() {
    if(!this.state.loaded) {
      return 
    } else {
      return <div className="text-center clear-complete">
      <hr />
      <button 
        type="button"
        onClick={this.onDeleteDoneClick}
        className="btn btn-default">
        Clear Completed
      </button>
    </div>
     }
  },
  onDeleteDoneClick: function() {
    for (var key in this.state.items) {
      if(this.state.items[key].done === true) {
        this.fb.child(key).remove();
      }
    }
  },
  handleDataLoaded: function() {
    this.setState({loaded: true});

  }
});

var element = React.createElement(Hello, {});
React.render(element, document.querySelector('.container'));
