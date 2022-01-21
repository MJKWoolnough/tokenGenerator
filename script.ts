import type {Children, Props} from './lib/dom.js';
import {amendNode, clearNode} from './lib/dom.js';
import {br, input, label} from './lib/html.js';
import {path, svg} from './lib/svg.js';

declare const pageLoad: Promise<void>;

const labels = (() => {
        let next = 0;
        return (name: Children, input: HTMLInputElement | HTMLButtonElement | HTMLTextAreaElement | HTMLSelectElement, props: Props = {}) => {
                amendNode(input, {"id": props["for"] = `ID_${next++}`});
                const l = label(props, name);
                return [l, input];
        };
})();

pageLoad.then(() => {
	const update = () => {
	      },
	      headWidth = input({"type": "range", "min": 10, "max": 100, "value": 50, "onchange": update}),
	      headLength = input({"type": "range", "min": 10, "max": 100, "value": 50, "onchange": update}),
	      headDepth = input({"type": "range", "min": 10, "max": 100, "value": 50, "onchange": update}),
	      head = path({"fill": "#fca", "stroke": "#000"}),
	      s = svg({"viewBox": "0 0 1000 1000"}, head);
	update();
	clearNode(document.body, [
		labels("Head Width: ", headWidth),
		br(),
		labels("Head Length: ", headLength),
		br(),
		labels("Head Depth: ", headDepth),
		br(),
		s
	]);
});
