
import './style.css'
import { log } from '../common/index.js'
log('this is page1')

import $ from 'jQuery'
$('body')
	.append('<p>this is jQuery render 111111</p>')
	.css('color', '#FFF')
