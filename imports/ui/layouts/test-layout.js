Polymer({
  is: 'test-layout',
  behaviors: [mwcMixin, mwcRouter],
  tracker() {
    this.set('status', Meteor.status().status);
    if (!Meteor.isCordova) {
      this.notCordova = true;
    }
  },
  properties: {
    mwcRoute: {
      type: Object,
      name: 'landing',
      params: { view: 'home' },
    },
    status: {
      type: String,
    },
    notCordova: Boolean,
  },
  second() {
    this.set('mwcRoute.params.view', 'second');
  },
  home() {
    this.set('mwcRoute.params.view', 'home');
  },
});
