sap.ui.define(
  "com/ibm/md/controls/CurrencyCode",
  ["sap/ui/base/DataType"],
  function (DataType) {
    "use strict";

    return DataType.createType(
      "com.ibm.md.controls.CurrencyCode",
      {
        isValid: function (sValue) {
          return sValue === "EUR" || sValue === "USD";
        },
      },
      DataType.getType("string")
    );
  },
  true
);
