
import './style.css'
import { log } from '../common/index.js'

log('this is page2')
import $ from 'jQuery'

$('body')
	.append('<p>this is jQuery render  22222</p>')
	.css('color', '#3f3f3f')