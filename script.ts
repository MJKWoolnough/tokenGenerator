import type {Children, Props} from './lib/dom.js';
import {amendNode, clearNode} from './lib/dom.js';
import {br, input, label} from './lib/html.js';
import pageLoad from './lib/load.js';
import {path, svg} from './lib/svg.js';

const labels = (() => {
        let next = 0;
        return (name: Children, input: HTMLInputElement | HTMLButtonElement | HTMLTextAreaElement | HTMLSelectElement, props: Exclude<Props, NamedNodeMap> = {}) => {
                amendNode(input, {"id": props["for"] = `ID_${next++}`});
                const l = label(props, name);
                return [l, input];
        };
})();

pageLoad.then(() => {
	const update = () => {
		const ckW = parseInt(cheekWidth.value),
		      cnW = parseInt(chinWidth.value),
		      hL = parseInt(headLength.value),
		      hD = parseInt(headDepth.value);
		amendNode(head, {"d": `M${1 + ckW},${hL + (3 * (2 * ckW + cnW) + 4 * hD) / 8} q${-2 * ckW / 5},${-hL / 5} ${-2 * ckW / 3},${-hL / 2} q${-ckW / 3},${-hL / 2} ${-ckW / 3},${-(hL + hD) / 2} a3,2 0,0,1 ${2 * ckW + cnW},0 q0,${hD / 2} ${-ckW / 3},${(hL + hD) / 2} q${-4 * ckW / 15},${3 * hL / 10} ${-2 * ckW / 3},${hL / 2} q${-cnW / 2},${cnW / 2} ${-cnW},0 ${-cnW},0 z`});
	      },
	      cheekWidth = input({"type": "range", "min": 10, "max": 100, "value": 30, "onchange": update}),
	      chinWidth = input({"type": "range", "min": 1, "max": 100, "value": 10, "onchange": update}),
	      headLength = input({"type": "range", "min": 10, "max": 100, "value": 40, "onchange": update}),
	      headDepth = input({"type": "range", "min": 10, "max": 100, "value": 40, "onchange": update}),
	      head = path({"fill": "#fca", "stroke": "#000"}),
	      s = svg({"viewBox": "0 0 1000 1000"}, head);
	update();
	clearNode(document.body, [
		labels("Cheek Width: ", cheekWidth),
		br(),
		labels("Chin Width: ", chinWidth),
		br(),
		labels("Head Length: ", headLength),
		br(),
		labels("Head Depth: ", headDepth),
		br(),
		s
	]);
});
