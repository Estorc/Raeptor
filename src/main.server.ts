import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { MainComponent } from './app/main/main.component';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) => bootstrapApplication(MainComponent, config, context);

export default bootstrap;
