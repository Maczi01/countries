import {Routes} from '@angular/router';
import {ExploreComponent} from "./pages/explore/explore.component";
import {GuessComponent} from "./pages/guess/guess.component";

export const routes: Routes = [
  {path: "", component: ExploreComponent},
  {path: "guess", component: GuessComponent},
];
