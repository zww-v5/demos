import _ from 'lodash';
import './style.css';
import Data from './data.xml';
import printMe from './print.js';

function component(){
  var element = document.createElement('div');
  var button = document.createElement('button');
  var br = document.createElement('br');

  button.innerHTML = 'Click me and look at the console!';
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.appendChild(br);
  element.appendChild(button);

  // button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
  //   var print = module.default;

  //   print();
  // });

  console.log(Data);
  printMe();

  return element;
}

document.body.appendChild(component());