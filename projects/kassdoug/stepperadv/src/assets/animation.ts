import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

export const fadeState = trigger('fadeState', [
  state(
    'hide',
    style({
      transform:"scale(.95)",
      opacity:'0',
    })
  ),
  state(
    'show',
    style({
      transform:"scale(1)",
      opacity:'1',
    })
  ),
  transition('show => hide', animate('400ms ease-out')),
  transition('hide => show', animate('300ms ease-in')),
]);
