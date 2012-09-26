/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)
     * Mustafa Sak (msak)

************************************************************************ */
qx.Class.define("qx.test.ui.command.GroupManager",
{
  extend : qx.dev.unit.TestCase,
  include : qx.dev.unit.MMock,

  members :
  {
    testGroupManager : function()
    {
      var handler = this.spy();
      
      var manager = new qx.ui.command.GroupManager();
      
      var group = new qx.ui.command.Group();
      var cmd = new qx.ui.command.Command("Meta+T");
      
      var group2 = new qx.ui.command.Group();
      var cmd2 = new qx.ui.command.Command("Meta+T");
      
      cmd.addListener("execute", handler);
      cmd2.addListener("execute", handler);
      group.addCommand("test", cmd);
      group2.addCommand("test", cmd2);
      
      manager.addGroup(group);
      manager.addGroup(group2);
      
      manager.setActiveGroup(group);
      
      cmd.execute();
      cmd2.execute();
      this.assertCallCount(handler, 1);
      
      manager.setActiveGroup(group);
      cmd.execute();
      cmd2.execute();
      this.assertCallCount(handler, 2);
      
      manager.blockAll(group);
      cmd.execute();
      cmd2.execute();
      this.assertCallCount(handler, 2);
      
      manager.unblockActiveGroup(group);
      cmd.execute();
      cmd2.execute();
      this.assertCallCount(handler, 3);
      
      manager.blockActiveGroup(group);
      cmd.execute();
      cmd2.execute();
      this.assertCallCount(handler, 3);
    }
  }
});