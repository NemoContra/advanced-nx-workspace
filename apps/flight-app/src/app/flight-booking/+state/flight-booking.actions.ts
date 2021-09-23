import { Flight } from '@flight-workspace/flight-lib';
import { createAction, props } from '@ngrx/store';

export const flightsLoaded = createAction(
  '[FlightBooking] FlightsLoaded',
  props<{ flights: Flight[] }>()
);

export const updateFlight = createAction(
  '[FlightBooking] Update Flight',
  props<{ flight: Flight }>()
);
