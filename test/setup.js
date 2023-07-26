import { JSDOM } from 'jsdom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';


// Setup JSDOM
const dom = new JSDOM('', {
	// Enable `requestAnimationFrame` which Preact uses internally.
	pretendToBeVisual: true
});
//window object has been defined

global.Event = dom.window.Event;
global.Node = dom.window.Node;
global.window = dom.window;
global.document = dom.window.document;
global.requestAnimationFrame = dom.window.requestAnimationFrame;
global.clevertap = {
	event : {
		push: jest.fn()
	}
};
// Setup Enzyme
configure({ adapter: new Adapter() });