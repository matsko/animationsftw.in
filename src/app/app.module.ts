import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CodeExampleService } from './code-example.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { BasicsPageComponent } from './basics-page/basics-page.component';
import { AdvancedPageComponent } from './advanced-page/advanced-page.component';
import { RoutingPageComponent } from './routing-page/routing-page.component';
import { BuilderPageComponent } from './builder-page/builder-page.component';
import { NewFeaturesPageComponent } from './new-features-page/new-features-page.component';
import { CodeExampleComponent } from './code-example/code-example.component';

import { ROUTES } from './routes';
import { RoutePage1Component } from './route-page1/route-page1.component';
import { RoutePage2Component } from './route-page2/route-page2.component';
import { RoutePage3Component } from './route-page3/route-page3.component';
import { RoutePage4Component } from './route-page4/route-page4.component';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { ModalComponent } from './modal/modal.component';

import { ModalService } from './modal.service';
import { AnimationCountService } from './animation-count.service';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ToolTipComponent } from './tool-tip/tool-tip.component';
import { ToolTipService } from './tool-tip.service';
import { ToolTipHoverDirective } from './tool-tip-hover.directive';
import { AnimationDetailsComponent } from './animation-details/animation-details.component';
import { CodeModalClickDirective } from './code-modal-click.directive';
import { PhotoPipe } from './photo.pipe';
import { RoutePage5Component } from './route-page5/route-page5.component';
import { PhotoScrubberComponent } from './photo-scrubber/photo-scrubber.component';
import { ResourcesPageComponent } from './resources-page/resources-page.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicsPageComponent,
    AdvancedPageComponent,
    RoutingPageComponent,
    BuilderPageComponent,
    NewFeaturesPageComponent,
    CodeExampleComponent,
    RoutePage1Component,
    RoutePage2Component,
    RoutePage3Component,
    RoutePage4Component,
    IntroPageComponent,
    ModalComponent,
    CodeSnippetComponent,
    NavigationComponent,
    ToolTipComponent,
    ToolTipHoverDirective,
    AnimationDetailsComponent,
    CodeModalClickDirective,
    PhotoPipe,
    RoutePage5Component,
    PhotoScrubberComponent,
    ResourcesPageComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    CodeExampleService,
    ModalService,
    AnimationCountService,
    ToolTipService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
