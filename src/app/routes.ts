import { BasicsPageComponent } from './basics-page/basics-page.component';
import { AdvancedPageComponent } from './advanced-page/advanced-page.component';
import { RoutingPageComponent } from './routing-page/routing-page.component';
import { BuilderPageComponent } from './builder-page/builder-page.component';
import { NewFeaturesPageComponent } from './new-features-page/new-features-page.component';

import { RoutePage1Component } from './route-page1/route-page1.component';
import { RoutePage2Component } from './route-page2/route-page2.component';
import { RoutePage3Component } from './route-page3/route-page3.component';
import { RoutePage4Component } from './route-page4/route-page4.component';

export const ROUTES = [
  {path:'', component: BasicsPageComponent},
  {path:'advanced', component: AdvancedPageComponent},
  {path:'routing',
   component: RoutingPageComponent,
   children: [
     { path: '', component: RoutePage1Component },
     { path: 'page2', component: RoutePage2Component },
     { path: 'page3', component: RoutePage3Component },
     { path: 'page4', component: RoutePage4Component }
   ]
  },
  {path:'programmatic', component: BuilderPageComponent},
  {path:'new-features', component: NewFeaturesPageComponent},
];
