'use strict';
var yeoman = require( 'yeoman-generator' );
var fs = require('fs.extra');
var chalk = require( 'chalk' );
var rimraf = require( 'rimraf' );
var yosay = require('yosay');

var MoxieBehaviour = yeoman.generators.Base.extend( {
  initializing: function () {
    this.pkg = require( '../package.json' );
  },
  prompting: function(){
    var done = this.async();
    var prompt = {
      name: 'behaviour',
      message: 'Name of the Behaviour:'
    };

    this.log(yosay(
      'Welcome to the Moxie Wordpress generator. ' +
      'This will create a new JS Behaviour'
    ));

    this.prompt(prompt, function(answers){
      this.behaviour = answers.behaviour.toLowerCase();
      done();
    }.bind( this));
  },

  createNames: function(){
    this.behaviour = this.behaviour.trim();
    this.behaviour = this.behaviour.toLowerCase();

    this.behaviourName = this.behaviour.replace(/\b\w/g, function(match){
      return match.toUpperCase();
    });
    this.behaviourName = this.behaviourName.replace(/\s|-/g, '');
    this.filename = this.behaviour.replace(/\s/g, '-') + '.js';
  },

  getBaseName: function(){
    var content = this.fs.read( './assets/js/production.js', {
      defaults: 'window.MoxieLean2 = {};'
    });

    var re = /^window\.(\w+)\.Behaviors = {};$/gm;
    var results = re.exec( content );
    if( results.length >= 1 ){
      this.baseName = results[1];
    }
  },

  createBehaviour: function(){
    this.fs.copyTpl(
      this.templatePath('behaviour'),
      this.destinationPath('./assets/js/app/behaviors/' + this.filename ),
      {
        name: this.behaviourName,
        base: this.baseName
      }
    );
  }
});

module.exports = MoxieBehaviour;
