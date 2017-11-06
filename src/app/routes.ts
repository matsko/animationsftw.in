import { IntroPageComponent } from './intro-page/intro-page.component';
import { BasicsPageComponent } from './basics-page/basics-page.component';
import { AdvancedPageComponent } from './advanced-page/advanced-page.component';
import { RoutingPageComponent } from './routing-page/routing-page.component';
import { BuilderPageComponent } from './builder-page/builder-page.component';
import { ResourcesPageComponent } from './resources-page/resources-page.component';

import { RoutePage1Component } from './route-page1/route-page1.component';
import { RoutePage2Component } from './route-page2/route-page2.component';
import { RoutePage3Component } from './route-page3/route-page3.component';
import { RoutePage4Component } from './route-page4/route-page4.component';
import { RoutePage5Component } from './route-page5/route-page5.component';

export const ROUTES = [
  {path:'', component: IntroPageComponent, data: {animation:'intro'}},
  {path:'basics', component: BasicsPageComponent, data: {animation:'basics'}},
  {path:'advanced', component: AdvancedPageComponent, data: {animation:'advanced'}},
  {path:'routing',
   component: RoutingPageComponent,
   data: {
     animation: 'routing'
   },
   children: [
     { path: '', component: RoutePage1Component, data: { animation: '1' } },
     { path: 'page2', component: RoutePage2Component, data: { animation: '2' } },
     { path: 'page3', component: RoutePage3Component, data: { animation: '3' } },
     { path: 'page4', component: RoutePage4Component, data: { animation: '4' } },
     { path: 'page5', component: RoutePage5Component, data: { animation: '5' } }
   ]
  },
  {path:'programmatic', component: BuilderPageComponent, data: {animation:'programmatic'}},
  {path:'resources', component: ResourcesPageComponent, data: {animation:'resources'}},
];
