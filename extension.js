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
	// https://github.com/julio641742/gnome-shell-extension-reference/blob/master/REFERENCE.md#powerjs
	panelMenu.SystemIndicator.indicators.connect(_onScrollEvent);	
}

function disable() {
	panelMenu.SystemIndicator.indicators.disconnect();
}

_onScrollEvent: function(actor, event) {
		let result = this._panelMenu.SystemIndicator.scroll(event);
		if (result == Clutter.EVENT_PROPAGATE || this.menu.actor.mapped)
		    return result;

		let gicon = new Gio.ThemedIcon({ name: this._panelMenu.SystemIndicator.getIcon() });
		let level = this._panelMenu.SystemIndicator.getLevel();
		Main.osdWindowManager.show(-1, gicon, null, level);
		return result;
}
