'use strict';

describe('Component: PartyDetailViewComponent', function() {
  // load the controller's module
  beforeEach(module('partyModeApp.partyDetailView'));

  var PartyDetailViewComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    PartyDetailViewComponent = $componentController('partyDetailView', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
