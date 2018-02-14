// adapting from https://gitlab.gnome.org/GNOME/gnome-shell/blob/master/js/ui/status/volume.js#L316
const Clutter = imports.gi.Clutter;
const Lang = imports.lang;
const Gio = imports.gi.Gio;
const Gvc = imports.gi.Gvc;
const St = imports.gi.St;
const Signals = imports.signals;

const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Slider = imports.ui.slider;

var Indicator = new Lang.Class({
    Name: 'PowerIndicator',
    Extends: PanelMenu.SystemIndicator,

    _init: function() {
        this.parent();

        this._primaryIndicator = this._addIndicator();

        this._control = getPowerControl();
        this._powerMenu = new PowerMenu(this._control);
        this._powerMenu.connect('icon-changed', Lang.bind(this, function(menu) {
            let icon = this._powerMenu.getIcon();

            if (icon != null) {
                this.indicators.show();
                this._primaryIndicator.icon_name = icon;
            } else {
                this.indicators.hide();
            }
        }));

        this.menu.addMenuItem(this._powerMenu);

        this.indicators.connect('scroll-event', Lang.bind(this, this._onScrollEvent));
    },

    _onScrollEvent: function(actor, event) {
        let result = this._powerMenu.scroll(event);
        if (result == Clutter.EVENT_PROPAGATE || this.menu.actor.mapped)
            return result;

        let gicon = new Gio.ThemedIcon({ name: this._powerMenu.getIcon() });
        let level = this._powerMenu.getLevel();
        Main.osdWindowManager.show(-1, gicon, null, level);
        return result;
    }
});                                                                  
