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
		const hW = parseInt(headWidth.value),
		      hL = parseInt(headLength.value),
		      hD = parseInt(headDepth.value);
		amendNode(head, {"d": `M${1 + hW/10},${hL + (3 * hW + 4 * hD) / 8} q${-2 * hW / 10},${-hL / 5} ${-hW/3},${-hL/2} q${-hW/6},${-hL/2} ${-hW/6},${-(hL + hD) / 2} a3,2 0,0,1 ${hW},0 q0,${hD / 2} ${-hW/6},${(hL + hD) / 2} q${(-2 * hW) / 15},${3 * hL / 10} ${-hW/3},${hL/2}`});
	      },
	      headWidth = input({"type": "range", "min": 10, "max": 100, "value": 60, "onchange": update}),
	      headLength = input({"type": "range", "min": 10, "max": 100, "value": 40, "onchange": update}),
	      headDepth = input({"type": "range", "min": 10, "max": 100, "value": 40, "onchange": update}),
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
