define([
    'backbone',
    'scripts/communicator'
],
function (Backbone, Communicator) {

    var RegionManager = Backbone.Marionette.Controller.extend({

        initialize: function (options) {

            this._regionManager = new Backbone.Marionette.RegionManager();

            Communicator.reqres.setHandler("rm:addRegion", this.addRegion, this);
            Communicator.reqres.setHandler("rm:removeRegion", this.removeRegion, this);
            Communicator.reqres.setHandler("rm:getRegion", this.getRegion, this);
        },

        addRegion: function (regionName, regionId) {
            var region = this.getRegion(regionName);

            if(region) {
                console.log("REGION ALREADY CREATED TO JUST RETURN REF");
                return region;
            }

            return this._regionManager.addRegion(regionName, regionId);
        },

        addRegions: function (regions) {
            this._regionManager.addRegions(regions);
        },

        removeRegion: function (regionName) {
            this._regionManager.removeRegion(regionName);
        },

        getRegion: function (regionName) {
            return this._regionManager.get(regionName);
        }
    });

    return new RegionManager();

});
