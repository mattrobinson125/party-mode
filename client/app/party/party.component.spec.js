'use strict';

describe('Component: PartyComponent', function() {
  // load the controller's module
  beforeEach(module('partyModeApp.party'));

  var PartyComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    PartyComponent = $componentController('party', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
