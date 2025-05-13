import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'works/:workName1',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Return an array of parameter sets
      return [
        { workName1: '2DFluidSimulation' },
        { workName1: '3DSoftBody' },
        { workName1: '3DSoftBodyPureJS' },
        { workName1: 'In-the-hall-of-the-King-Kong' },
        { workName1: 'museum' },
        { workName1: 'Welcome-to-Red-Zone' },
        { workName1: 'You-gonna-be-eaten-by-a-fish' },
        { workName1: 'You-gonna-have-a-Genophobia' },
        { workName1: 'old' },
      ];
    }
  },
  {
    path: 'works/:workName1/:workName2',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Return an array of parameter sets
      return [
        { workName1: 'old', workName2: "Les voleurs d'esprit" },
        { workName1: 'old', workName2: "Oujnish Game" },
        { workName1: 'old', workName2: "The Dark Storm" },
      ];
    }
  }
];
