/*

Goal of this extension:

change brightness by scrolling over the power (battery) icon

Compare with volume icon scroll to change volume

*/

// adapting from https://gitlab.gnome.org/GNOME/gnome-shell/blob/master/js/ui/status/volume.js#L316


// init, enable, disable functions
// And disconnect in disable, of course
function init() {

}

function enable() {
	_onScrollEvent: function(actor, event) {
		let result = this._powerMenu.scroll(event);
		if (result == Clutter.EVENT_PROPAGATE || this.menu.actor.mapped)
		    return result;

		let gicon = new Gio.ThemedIcon({ name: this._powerMenu.getIcon() });
		let level = this._powerMenu.getLevel();
		Main.osdWindowManager.show(-1, gicon, null, level);
		return result;
	    }
}

function disable() {
	powerIndicator.indicators.disconnect();
}




