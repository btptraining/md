sap.ui.define(["sap/m/Button"], function (Button) {
  var HoverButton = Button.extend("com.ibm.md.controls.HoverButton", {
    metadata: {
      events: {
        hover: {}, // this Button has also a "hover" event, in addition to "press" of the normal Button
      },
    },

    // the hover event handler:
    onmouseover: function (evt) {
      // is called when the Button is hovered - no event registration required
      this.fireHover();
    },

    renderer: {}, // add nothing, just inherit the ButtonRenderer as is;
  });

  return HoverButton;
});
