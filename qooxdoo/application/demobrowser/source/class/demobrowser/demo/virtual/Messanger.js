/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
   * Fabian Jakobs (fjakobs)

************************************************************************ */

/* ************************************************************************

#asset(custom/*)

************************************************************************ */

qx.Class.define("demobrowser.demo.virtual.Messanger",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
    main : function()
    {
      this.base(arguments);

      var win = new qx.ui.window.Window("Contacts").set({
        contentPadding: 0,
        showClose: false,
        showMinimize: false
      });
      win.setLayout(new qx.ui.layout.Grow());
      win.moveTo(30, 50);
      win.open();
      
      width = 200;
      
      var scroller = new qx.ui.virtual.core.Scroller(400, 1, 28, width).set({
        scrollbarX: "off",
        scrollbarY: "auto",
        width: width,
        height: 300
      });
      scroller.pane.addListener("resize", function(e)
      {
        scroller.pane.columnConfig.setItemSize(0, e.getData().width);
        scroller.pane.fullUpdate();
      });
      

      var groupColor = "rgb(60, 97, 226)";
      var rowLayer = new qx.ui.virtual.layer.Row("white", "rgb(238, 243, 255)");
      var messangerLayer = new demobrowser.demo.virtual.MessangerLayer();
      
      for (var row in messangerLayer.groupPositions) 
      {
        row = parseInt(row);
        scroller.pane.rowConfig.setItemSize(row, 15);
        rowLayer.setRowColor(row, groupColor);
      }
      
      scroller.pane.addLayer(rowLayer);
      scroller.pane.addLayer(messangerLayer);
      win.add(scroller);
    }
  }
});
