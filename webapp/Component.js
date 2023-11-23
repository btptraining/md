sap.ui.define(
  [
    "jquery.sap.global",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/f/FlexibleColumnLayoutSemanticHelper",
    "sap/ui/Device",
  ],
  function (
    jQuery,
    UIComponent,
    JSONModel,
    FlexibleColumnLayoutSemanticHelper,
    Device
  ) {
    "use strict";

    var Component = UIComponent.extend("com.ibm.md.Component", {
      metadata: {
        manifest: "json",
      },

      init: function () {
        UIComponent.prototype.init.apply(this, arguments);
        // set device model
        const oDeviceModel = new JSONModel(Device);
        oDeviceModel.setDefaultBindingMode("OneWay");
        this.setModel(oDeviceModel, "device");

        var oModel = new JSONModel();
        this.setModel(oModel);

        // set products demo model on this sample
        var oProductsModel = new JSONModel(
          sap.ui.require.toUrl("com/ibm/md/mockdata") + "/products.json"
        );
        oProductsModel.setSizeLimit(1000);
        this.setModel(oProductsModel, "products");

        this.getRouter().initialize();
      },

      createContent: function () {
        return sap.ui.view({
          viewName: "com.ibm.md.view.FlexibleColumnLayout",
          type: "XML",
        });
      },

      /**
       * Returns an instance of the semantic helper
       * @returns {sap.f.FlexibleColumnLayoutSemanticHelper} An instance of the semantic helper
       */
      getHelper: function () {
        var oFCL = this.getRootControl().byId("fcl"),
          oParams = jQuery.sap.getUriParameters(),
          oSettings = {
            defaultTwoColumnLayoutType: sap.f.LayoutType.TwoColumnsMidExpanded,
            defaultThreeColumnLayoutType:
              sap.f.LayoutType.ThreeColumnsMidExpanded,
            mode: oParams.get("mode"),
            initialColumnsCount: 2,
            maxColumnsCount: oParams.get("max"),
          };

        return FlexibleColumnLayoutSemanticHelper.getInstanceFor(
          oFCL,
          oSettings
        );
      },
    });
    return Component;
  },
  true
);
