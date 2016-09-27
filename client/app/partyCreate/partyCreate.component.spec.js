'use strict';

describe('Component: PartyCreateComponent', function() {
  // load the controller's module
  beforeEach(module('partyModeApp.partyCreate'));

  var PartyCreateComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    PartyCreateComponent = $componentController('partyCreate', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
