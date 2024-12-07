import { SpecificEventModule } from './specific-event.module';

describe('EventsModule', () => {
  let eventsModule: SpecificEventModule;

  beforeEach(() => {
    eventsModule = new SpecificEventModule();
  });

  it('should create an instance', () => {
    expect(eventsModule).toBeTruthy();
  });
});
