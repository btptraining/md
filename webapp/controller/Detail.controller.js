sap.ui.define(
  [
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
  ],
  function (JSONModel, Controller, Fragment) {
    "use strict";

    return Controller.extend("com.ibm.md.controller.Detail", {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oModel = this.getOwnerComponent().getModel();

        this.oRouter
          .getRoute("master")
          .attachPatternMatched(this._onProductMatched, this);
        this.oRouter
          .getRoute("detail")
          .attachPatternMatched(this._onProductMatched, this);
        this.oRouter
          .getRoute("detailDetail")
          .attachPatternMatched(this._onProductMatched, this);

        this._messageManager();
      },
      _messageManager: function () {
        var oMessageProcessor =
          new sap.ui.core.message.ControlMessageProcessor();
        var oMessageManager = sap.ui.getCore().getMessageManager();

        oMessageManager.registerMessageProcessor(oMessageProcessor);
        var oInput = this.getView().byId("myInputId");
        oMessageManager.addMessages(
          new sap.ui.core.message.Message({
            message: "Product code must have 7 digits",
            type: sap.ui.core.MessageType.Error,
            target: oInput.getId() + "/value",
            processor: oMessageProcessor,
          })
        );
      },
      onButtonHover: function (oEvent) {
        var oButton = oEvent.getSource(),
          oView = this.getView();

        // create popover
        if (!this._pPopover) {
          this._pPopover = Fragment.load({
            id: oView.getId(),
            name: "com.ibm.md.view.Popover",
            controller: this,
          }).then(function (oPopover) {
            oView.addDependent(oPopover);
            //   oPopover.bindElement("/ProductCollection/0");
            return oPopover;
          });
        }
        this._pPopover.then(function (oPopover) {
          oPopover.openBy(oButton);
        });
      },
      handleItemPress: function (oEvent) {
        var oNextUIState = this.getOwnerComponent()
            .getHelper()
            .getNextUIState(2),
          supplierPath = oEvent
            .getSource()
            .getBindingContext("products")
            .getPath(),
          supplier = supplierPath.split("/").slice(-1).pop();

        this.oRouter.navTo("detailDetail", {
          layout: oNextUIState.layout,
          product: this._product,
          supplier: supplier,
        });
      },
      handleFullScreen: function () {
        var sNextLayout = this.oModel.getProperty(
          "/actionButtonsInfo/midColumn/fullScreen"
        );
        this.oRouter.navTo("detail", {
          layout: sNextLayout,
          product: this._product,
        });
      },
      handleExitFullScreen: function () {
        var sNextLayout = this.oModel.getProperty(
          "/actionButtonsInfo/midColumn/exitFullScreen"
        );
        this.oRouter.navTo("detail", {
          layout: sNextLayout,
          product: this._product,
        });
      },
      handleClose: function () {
        var sNextLayout = this.oModel.getProperty(
          "/actionButtonsInfo/midColumn/closeColumn"
        );
        this.oRouter.navTo("master", { layout: sNextLayout });
      },
      _onProductMatched: function (oEvent) {
        this._product =
          oEvent.getParameter("arguments").product || this._product || "0";
        this.getView().bindElement({
          path: "/ProductCollection/" + this._product,
          model: "products",
        });
      },
    });
  },
  true
);
