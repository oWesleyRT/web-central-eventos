import { Routes, RouterModule } from '@angular/router';
import { PublicLayoutComponent } from './_layout/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './_layout/private-layout/private-layout.component';
import { AuthGuard } from './_guards/auth.guard';
import { RegisterComponent } from './register';
import { LoginComponent } from './login';
import { ChangelogComponent } from './changelog/changelog.component';

const appRoutes: Routes = [
  // Public layout
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: '', component: LoginComponent }
    ]
  },
  // Private layout
  {
    path: '',
    component: PrivateLayoutComponent,
    children: [
      { path: 'logout', component: LoginComponent, canActivate: [AuthGuard] },
      { path: 'changelog', component: ChangelogComponent, canActivate: [AuthGuard] },
      {
        path: 'agents', loadChildren: () => import('../app/content/contacts/contacts.module').then(m => m.ContactsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'events', loadChildren: () => import('../app/content/events/events.module').then(m => m.EventsModule),
        canActivate: [AuthGuard]
      },
      { path: 'event/:id', loadChildren: () => import('../app/content/specific-event/specific-event.module').then(m => m.SpecificEventModule)}
    ],
  },
  // otherwise redirect to home
  { path: '**', redirectTo: 'changelog' }
];

export const routing = RouterModule.forRoot(appRoutes, { scrollOffset: [0, 0], scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' });
