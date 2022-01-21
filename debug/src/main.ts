import { Pane } from "tweakpane";
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import { FpsGraphBladeApi } from '@tweakpane/plugin-essentials/dist/types/fps-graph/api/fps-graph'
import { Sketch } from '@jocabola/gfx';

export function initPane(sketch:Sketch, title:string='Debug Controls'):Pane {
    const pane = new Pane({
        title: title
    });
    pane.registerPlugin(EssentialsPlugin);

    const f = pane.addFolder({
        title: 'FPS Graph',
        expanded: false
    });

    const fpsGraph = f.addBlade({
        view: 'fpsgraph',
        lineCount: 2,
    }) as FpsGraphBladeApi;

    pane.addSeparator();

    const customRaf = () => {
        requestAnimationFrame(customRaf);
        fpsGraph.begin();
        sketch.update();
        sketch.render();
        fpsGraph.end();
    }

    sketch.start(customRaf);

    return pane;
}