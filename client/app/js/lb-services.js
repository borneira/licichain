// CommonJS package manager support
if (typeof module !== 'undefined' && typeof exports !== 'undefined' &&
  module.exports === exports) {
  // Export the *name* of this Angular module
  // Sample usage:
  //
  //   import lbServices from './lb-services';
  //   angular.module('app', [lbServices]);
  //
  module.exports = "lbServices";
}

(function(window, angular, undefined) {
  'use strict';

  var urlBase = "/api";
  var authHeader = 'authorization';

  function getHost(url) {
    var m = url.match(/^(?:https?:)?\/\/([^\/]+)/);
    return m ? m[1] : null;
  }
  // need to use the urlBase as the base to handle multiple
  // loopback servers behind a proxy/gateway where the host
  // would be the same.
  var urlBaseHost = getHost(urlBase) ? urlBase : location.host;

/**
 * @ngdoc overview
 * @name lbServices
 * @module
 * @description
 *
 * The `lbServices` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
  var module = angular.module("lbServices", ['ngResource']);

/**
 * @ngdoc object
 * @name lbServices.Licitacion
 * @header lbServices.Licitacion
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Licitacion` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Licitacion",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/licitaciones/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Licitacion.oferta.findById() instead.
            "prototype$__findById__oferta": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/licitaciones/:id/oferta/:fk",
              method: "GET",
            },

            // INTERNAL. Use Licitacion.smartContract() instead.
            "prototype$__get__smartContract": {
              url: urlBase + "/licitaciones/:id/smartContract",
              method: "GET",
            },

            // INTERNAL. Use Licitacion.smartContract.create() instead.
            "prototype$__create__smartContract": {
              url: urlBase + "/licitaciones/:id/smartContract",
              method: "POST",
            },

            // INTERNAL. Use Licitacion.administracion() instead.
            "prototype$__get__administracion": {
              url: urlBase + "/licitaciones/:id/administracion",
              method: "GET",
            },

            // INTERNAL. Use Licitacion.administracion.create() instead.
            "prototype$__create__administracion": {
              url: urlBase + "/licitaciones/:id/administracion",
              method: "POST",
            },

            // INTERNAL. Use Licitacion.oferta() instead.
            "prototype$__get__oferta": {
              isArray: true,
              url: urlBase + "/licitaciones/:id/oferta",
              method: "GET",
            },

            // INTERNAL. Use Licitacion.oferta.create() instead.
            "prototype$__create__oferta": {
              url: urlBase + "/licitaciones/:id/oferta",
              method: "POST",
            },

            // INTERNAL. Use Licitacion.oferta.count() instead.
            "prototype$__count__oferta": {
              url: urlBase + "/licitaciones/:id/oferta/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Licitacion#create
             * @methodOf lbServices.Licitacion
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Licitacion` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/licitaciones",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Licitacion#patchOrCreate
             * @methodOf lbServices.Licitacion
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Licitacion` object.)
             * </em>
             */
            "patchOrCreate": {
              url: urlBase + "/licitaciones",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.Licitacion#findById
             * @methodOf lbServices.Licitacion
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Licitacion` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/licitaciones/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Licitacion#find
             * @methodOf lbServices.Licitacion
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string (`{"where":{"something":"value"}}`).  See https://loopback.io/doc/en/lb3/Querying-data.html#using-stringified-json-in-rest-queries for more details.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Licitacion` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/licitaciones",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Licitacion#getDetail
             * @methodOf lbServices.Licitacion
             *
             * @description
             *
             * Retrieve licitacion's information from the Blockchain
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `licitacionId` – `{string=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `licitacion` – `{Licitacion=}` -
             */
            "getDetail": {
              url: urlBase + "/licitaciones/getDetail",
              method: "POST",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }

            },

            /**
             * @ngdoc method
             * @name lbServices.Licitacion#getOfertasBl
             * @methodOf lbServices.Licitacion
             *
             * @description
             *
             * Retrieve ofertas' information from the Blockchain
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `licitacionId` – `{string=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `ofertas` – `{*=}` -
             */
            "getOfertasBl": {
              url: urlBase + "/licitaciones/getOfertasBl",
              method: "POST",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            },

            /**
             * @ngdoc method
             * @name lbServices.Licitacion#mesaAdministrativa
             * @methodOf lbServices.Licitacion
             *
             * @description
             *
             * Simulates the administrative meeting, revealing company' identities
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `licitacionId` – `{string=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{string=}` -
             */
            "mesaAdministrativa": {
              url: urlBase + "/licitaciones/mesaAdministrativa",
              method: "POST",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            },

            /**
             * @ngdoc method
             * @name lbServices.Licitacion#mesaSubjetiva
             * @methodOf lbServices.Licitacion
             *
             * @description
             *
             * Simulates the subjective criteria evalution meeting and gives scores for the offers
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `licitacionId` – `{string=}` -
             *
             *  - `ofertas` – `{*=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{string=}` -
             */
            "mesaSubjetiva": {
              url: urlBase + "/licitaciones/mesaSubjetiva",
              method: "POST",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            },

            /**
             * @ngdoc method
             * @name lbServices.Licitacion#mesaObjetiva
             * @methodOf lbServices.Licitacion
             *
             * @description
             *
             * Simulates the objective criteria evalution meeting and gives scores for the offers based on formulae
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `licitacionId` – `{string=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{string=}` -
             */
            "mesaObjetiva": {
              url: urlBase + "/licitaciones/mesaObjetiva",
              method: "POST",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            },

            /**
             * @ngdoc method
             * @name lbServices.Licitacion#revelaOferta
             * @methodOf lbServices.Licitacion
             *
             * @description
             *
             * Reveals offer to the administration
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `licitacionId` – `{string=}` -
             *
             *  - `oferta` – `{string=}` -
             *
             *  - `tipoOferta` – `{string=}` -
             *
             *  - `empresa` – `{string=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "revelaOferta": {
              url: urlBase + "/licitaciones/revelaOferta",
              method: "POST",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            },

            /**
             * @ngdoc method
             * @name lbServices.Licitacion#createMany
             * @methodOf lbServices.Licitacion
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Licitacion` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/licitaciones",
              method: "POST",
            },

            // INTERNAL. Use Oferta.licitacion() instead.
            "::get::Oferta::licitacion": {
              url: urlBase + "/ofertas/:id/licitacion",
              method: "GET",
            },

            // INTERNAL. Use Administracion.licitaciones.findById() instead.
            "::findById::Administracion::licitaciones": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/administraciones/:id/licitaciones/:fk",
              method: "GET",
            },

            // INTERNAL. Use Administracion.licitaciones.destroyById() instead.
            "::destroyById::Administracion::licitaciones": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/administraciones/:id/licitaciones/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Administracion.licitaciones() instead.
            "::get::Administracion::licitaciones": {
              isArray: true,
              url: urlBase + "/administraciones/:id/licitaciones",
              method: "GET",
            },

            // INTERNAL. Use Administracion.licitaciones.create() instead.
            "::create::Administracion::licitaciones": {
              url: urlBase + "/administraciones/:id/licitaciones",
              method: "POST",
            },

            // INTERNAL. Use Administracion.licitaciones.createMany() instead.
            "::createMany::Administracion::licitaciones": {
              isArray: true,
              url: urlBase + "/administraciones/:id/licitaciones",
              method: "POST",
            },

            // INTERNAL. Use Administracion.licitaciones.destroyAll() instead.
            "::delete::Administracion::licitaciones": {
              url: urlBase + "/administraciones/:id/licitaciones",
              method: "DELETE",
            },

            // INTERNAL. Use Administracion.licitaciones.count() instead.
            "::count::Administracion::licitaciones": {
              url: urlBase + "/administraciones/:id/licitaciones/count",
              method: "GET",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Licitacion#upsert
             * @methodOf lbServices.Licitacion
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Licitacion` object.)
             * </em>
             */
        R["upsert"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.Licitacion#updateOrCreate
             * @methodOf lbServices.Licitacion
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Licitacion` object.)
             * </em>
             */
        R["updateOrCreate"] = R["patchOrCreate"];


        /**
        * @ngdoc property
        * @name lbServices.Licitacion#modelName
        * @propertyOf lbServices.Licitacion
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Licitacion`.
        */
        R.modelName = "Licitacion";

    /**
     * @ngdoc object
     * @name lbServices.Licitacion.oferta
     * @header lbServices.Licitacion.oferta
     * @object
     * @description
     *
     * The object `Licitacion.oferta` groups methods
     * manipulating `Oferta` instances related to `Licitacion`.
     *
     * Call {@link lbServices.Licitacion#oferta Licitacion.oferta()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Licitacion#oferta
             * @methodOf lbServices.Licitacion
             *
             * @description
             *
             * Queries oferta of licitacion.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - licitacion id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Oferta` object.)
             * </em>
             */
        R.oferta = function() {
          var TargetResource = $injector.get("Oferta");
          var action = TargetResource["::get::Licitacion::oferta"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Licitacion.oferta#count
             * @methodOf lbServices.Licitacion.oferta
             *
             * @description
             *
             * Counts oferta of licitacion.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - licitacion id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.oferta.count = function() {
          var TargetResource = $injector.get("Oferta");
          var action = TargetResource["::count::Licitacion::oferta"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Licitacion.oferta#create
             * @methodOf lbServices.Licitacion.oferta
             *
             * @description
             *
             * Creates a new instance in oferta of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - licitacion id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Oferta` object.)
             * </em>
             */
        R.oferta.create = function() {
          var TargetResource = $injector.get("Oferta");
          var action = TargetResource["::create::Licitacion::oferta"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Licitacion.oferta#createMany
             * @methodOf lbServices.Licitacion.oferta
             *
             * @description
             *
             * Creates a new instance in oferta of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - licitacion id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Oferta` object.)
             * </em>
             */
        R.oferta.createMany = function() {
          var TargetResource = $injector.get("Oferta");
          var action = TargetResource["::createMany::Licitacion::oferta"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Licitacion.oferta#findById
             * @methodOf lbServices.Licitacion.oferta
             *
             * @description
             *
             * Find a related item by id for oferta.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - licitacion id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for oferta
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Oferta` object.)
             * </em>
             */
        R.oferta.findById = function() {
          var TargetResource = $injector.get("Oferta");
          var action = TargetResource["::findById::Licitacion::oferta"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Licitacion.smartContract
     * @header lbServices.Licitacion.smartContract
     * @object
     * @description
     *
     * The object `Licitacion.smartContract` groups methods
     * manipulating `SmartContract` instances related to `Licitacion`.
     *
     * Call {@link lbServices.Licitacion#smartContract Licitacion.smartContract()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Licitacion#smartContract
             * @methodOf lbServices.Licitacion
             *
             * @description
             *
             * Fetches hasOne relation smartContract.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - licitacion id
             *
             *  - `options` – `{object=}` -
             *
             *  - `refresh` – `{boolean=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `SmartContract` object.)
             * </em>
             */
        R.smartContract = function() {
          var TargetResource = $injector.get("SmartContract");
          var action = TargetResource["::get::Licitacion::smartContract"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Licitacion.smartContract#create
             * @methodOf lbServices.Licitacion.smartContract
             *
             * @description
             *
             * Creates a new instance in smartContract of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - licitacion id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `SmartContract` object.)
             * </em>
             */
        R.smartContract.create = function() {
          var TargetResource = $injector.get("SmartContract");
          var action = TargetResource["::create::Licitacion::smartContract"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Licitacion.smartContract#createMany
             * @methodOf lbServices.Licitacion.smartContract
             *
             * @description
             *
             * Creates a new instance in smartContract of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - licitacion id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `SmartContract` object.)
             * </em>
             */
        R.smartContract.createMany = function() {
          var TargetResource = $injector.get("SmartContract");
          var action = TargetResource["::createMany::Licitacion::smartContract"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Licitacion.administracion
     * @header lbServices.Licitacion.administracion
     * @object
     * @description
     *
     * The object `Licitacion.administracion` groups methods
     * manipulating `Administracion` instances related to `Licitacion`.
     *
     * Call {@link lbServices.Licitacion#administracion Licitacion.administracion()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Licitacion#administracion
             * @methodOf lbServices.Licitacion
             *
             * @description
             *
             * Fetches hasOne relation administracion.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - licitacion id
             *
             *  - `options` – `{object=}` -
             *
             *  - `refresh` – `{boolean=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Administracion` object.)
             * </em>
             */
        R.administracion = function() {
          var TargetResource = $injector.get("Administracion");
          var action = TargetResource["::get::Licitacion::administracion"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Licitacion.administracion#create
             * @methodOf lbServices.Licitacion.administracion
             *
             * @description
             *
             * Creates a new instance in administracion of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - licitacion id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Administracion` object.)
             * </em>
             */
        R.administracion.create = function() {
          var TargetResource = $injector.get("Administracion");
          var action = TargetResource["::create::Licitacion::administracion"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Licitacion.administracion#createMany
             * @methodOf lbServices.Licitacion.administracion
             *
             * @description
             *
             * Creates a new instance in administracion of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - licitacion id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Administracion` object.)
             * </em>
             */
        R.administracion.createMany = function() {
          var TargetResource = $injector.get("Administracion");
          var action = TargetResource["::createMany::Licitacion::administracion"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Empresa
 * @header lbServices.Empresa
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Empresa` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Empresa",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/empresas/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Empresa.ofertas.findById() instead.
            "prototype$__findById__ofertas": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/empresas/:id/ofertas/:fk",
              method: "GET",
            },

            // INTERNAL. Use Empresa.ofertas.destroyById() instead.
            "prototype$__destroyById__ofertas": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/empresas/:id/ofertas/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Empresa.usuarios.findById() instead.
            "prototype$__findById__usuarios": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/empresas/:id/usuarios/:fk",
              method: "GET",
            },

            // INTERNAL. Use Empresa.usuarios.destroyById() instead.
            "prototype$__destroyById__usuarios": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/empresas/:id/usuarios/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Empresa.ofertas() instead.
            "prototype$__get__ofertas": {
              isArray: true,
              url: urlBase + "/empresas/:id/ofertas",
              method: "GET",
            },

            // INTERNAL. Use Empresa.ofertas.create() instead.
            "prototype$__create__ofertas": {
              url: urlBase + "/empresas/:id/ofertas",
              method: "POST",
            },

            // INTERNAL. Use Empresa.ofertas.destroyAll() instead.
            "prototype$__delete__ofertas": {
              url: urlBase + "/empresas/:id/ofertas",
              method: "DELETE",
            },

            // INTERNAL. Use Empresa.ofertas.count() instead.
            "prototype$__count__ofertas": {
              url: urlBase + "/empresas/:id/ofertas/count",
              method: "GET",
            },

            // INTERNAL. Use Empresa.usuarios() instead.
            "prototype$__get__usuarios": {
              isArray: true,
              url: urlBase + "/empresas/:id/usuarios",
              method: "GET",
            },

            // INTERNAL. Use Empresa.usuarios.create() instead.
            "prototype$__create__usuarios": {
              url: urlBase + "/empresas/:id/usuarios",
              method: "POST",
            },

            // INTERNAL. Use Empresa.usuarios.destroyAll() instead.
            "prototype$__delete__usuarios": {
              url: urlBase + "/empresas/:id/usuarios",
              method: "DELETE",
            },

            // INTERNAL. Use Empresa.usuarios.count() instead.
            "prototype$__count__usuarios": {
              url: urlBase + "/empresas/:id/usuarios/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Empresa#create
             * @methodOf lbServices.Empresa
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Empresa` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/empresas",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Empresa#patchOrCreate
             * @methodOf lbServices.Empresa
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Empresa` object.)
             * </em>
             */
            "patchOrCreate": {
              url: urlBase + "/empresas",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.Empresa#findById
             * @methodOf lbServices.Empresa
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Empresa` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/empresas/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Empresa#find
             * @methodOf lbServices.Empresa
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string (`{"where":{"something":"value"}}`).  See https://loopback.io/doc/en/lb3/Querying-data.html#using-stringified-json-in-rest-queries for more details.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Empresa` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/empresas",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Empresa#createMany
             * @methodOf lbServices.Empresa
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Empresa` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/empresas",
              method: "POST",
            },

            // INTERNAL. Use Oferta.empresaOferente() instead.
            "::get::Oferta::empresaOferente": {
              url: urlBase + "/ofertas/:id/empresaOferente",
              method: "GET",
            },

            // INTERNAL. Use Oferta.empresaOferente.create() instead.
            "::create::Oferta::empresaOferente": {
              url: urlBase + "/ofertas/:id/empresaOferente",
              method: "POST",
            },

            // INTERNAL. Use Oferta.empresaOferente.createMany() instead.
            "::createMany::Oferta::empresaOferente": {
              isArray: true,
              url: urlBase + "/ofertas/:id/empresaOferente",
              method: "POST",
            },

            // INTERNAL. Use Oferta.empresaOferente.update() instead.
            "::update::Oferta::empresaOferente": {
              url: urlBase + "/ofertas/:id/empresaOferente",
              method: "PUT",
            },

            // INTERNAL. Use Oferta.empresaOferente.destroy() instead.
            "::destroy::Oferta::empresaOferente": {
              url: urlBase + "/ofertas/:id/empresaOferente",
              method: "DELETE",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Empresa#upsert
             * @methodOf lbServices.Empresa
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Empresa` object.)
             * </em>
             */
        R["upsert"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.Empresa#updateOrCreate
             * @methodOf lbServices.Empresa
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Empresa` object.)
             * </em>
             */
        R["updateOrCreate"] = R["patchOrCreate"];


        /**
        * @ngdoc property
        * @name lbServices.Empresa#modelName
        * @propertyOf lbServices.Empresa
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Empresa`.
        */
        R.modelName = "Empresa";

    /**
     * @ngdoc object
     * @name lbServices.Empresa.ofertas
     * @header lbServices.Empresa.ofertas
     * @object
     * @description
     *
     * The object `Empresa.ofertas` groups methods
     * manipulating `Oferta` instances related to `Empresa`.
     *
     * Call {@link lbServices.Empresa#ofertas Empresa.ofertas()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Empresa#ofertas
             * @methodOf lbServices.Empresa
             *
             * @description
             *
             * Queries ofertas of empresa.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - empresa id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Oferta` object.)
             * </em>
             */
        R.ofertas = function() {
          var TargetResource = $injector.get("Oferta");
          var action = TargetResource["::get::Empresa::ofertas"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Empresa.ofertas#count
             * @methodOf lbServices.Empresa.ofertas
             *
             * @description
             *
             * Counts ofertas of empresa.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - empresa id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.ofertas.count = function() {
          var TargetResource = $injector.get("Oferta");
          var action = TargetResource["::count::Empresa::ofertas"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Empresa.ofertas#create
             * @methodOf lbServices.Empresa.ofertas
             *
             * @description
             *
             * Creates a new instance in ofertas of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - empresa id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Oferta` object.)
             * </em>
             */
        R.ofertas.create = function() {
          var TargetResource = $injector.get("Oferta");
          var action = TargetResource["::create::Empresa::ofertas"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Empresa.ofertas#createMany
             * @methodOf lbServices.Empresa.ofertas
             *
             * @description
             *
             * Creates a new instance in ofertas of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - empresa id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Oferta` object.)
             * </em>
             */
        R.ofertas.createMany = function() {
          var TargetResource = $injector.get("Oferta");
          var action = TargetResource["::createMany::Empresa::ofertas"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Empresa.ofertas#destroyAll
             * @methodOf lbServices.Empresa.ofertas
             *
             * @description
             *
             * Deletes all ofertas of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - empresa id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.ofertas.destroyAll = function() {
          var TargetResource = $injector.get("Oferta");
          var action = TargetResource["::delete::Empresa::ofertas"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Empresa.ofertas#destroyById
             * @methodOf lbServices.Empresa.ofertas
             *
             * @description
             *
             * Delete a related item by id for ofertas.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - empresa id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for ofertas
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.ofertas.destroyById = function() {
          var TargetResource = $injector.get("Oferta");
          var action = TargetResource["::destroyById::Empresa::ofertas"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Empresa.ofertas#findById
             * @methodOf lbServices.Empresa.ofertas
             *
             * @description
             *
             * Find a related item by id for ofertas.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - empresa id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for ofertas
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Oferta` object.)
             * </em>
             */
        R.ofertas.findById = function() {
          var TargetResource = $injector.get("Oferta");
          var action = TargetResource["::findById::Empresa::ofertas"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Empresa.usuarios
     * @header lbServices.Empresa.usuarios
     * @object
     * @description
     *
     * The object `Empresa.usuarios` groups methods
     * manipulating `Usuario` instances related to `Empresa`.
     *
     * Call {@link lbServices.Empresa#usuarios Empresa.usuarios()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Empresa#usuarios
             * @methodOf lbServices.Empresa
             *
             * @description
             *
             * Queries usuarios of empresa.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - empresa id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
        R.usuarios = function() {
          var TargetResource = $injector.get("Usuario");
          var action = TargetResource["::get::Empresa::usuarios"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Empresa.usuarios#count
             * @methodOf lbServices.Empresa.usuarios
             *
             * @description
             *
             * Counts usuarios of empresa.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - empresa id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.usuarios.count = function() {
          var TargetResource = $injector.get("Usuario");
          var action = TargetResource["::count::Empresa::usuarios"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Empresa.usuarios#create
             * @methodOf lbServices.Empresa.usuarios
             *
             * @description
             *
             * Creates a new instance in usuarios of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - empresa id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
        R.usuarios.create = function() {
          var TargetResource = $injector.get("Usuario");
          var action = TargetResource["::create::Empresa::usuarios"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Empresa.usuarios#createMany
             * @methodOf lbServices.Empresa.usuarios
             *
             * @description
             *
             * Creates a new instance in usuarios of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - empresa id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
        R.usuarios.createMany = function() {
          var TargetResource = $injector.get("Usuario");
          var action = TargetResource["::createMany::Empresa::usuarios"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Empresa.usuarios#destroyAll
             * @methodOf lbServices.Empresa.usuarios
             *
             * @description
             *
             * Deletes all usuarios of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - empresa id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.usuarios.destroyAll = function() {
          var TargetResource = $injector.get("Usuario");
          var action = TargetResource["::delete::Empresa::usuarios"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Empresa.usuarios#destroyById
             * @methodOf lbServices.Empresa.usuarios
             *
             * @description
             *
             * Delete a related item by id for usuarios.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - empresa id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for usuarios
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.usuarios.destroyById = function() {
          var TargetResource = $injector.get("Usuario");
          var action = TargetResource["::destroyById::Empresa::usuarios"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Empresa.usuarios#findById
             * @methodOf lbServices.Empresa.usuarios
             *
             * @description
             *
             * Find a related item by id for usuarios.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - empresa id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for usuarios
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
        R.usuarios.findById = function() {
          var TargetResource = $injector.get("Usuario");
          var action = TargetResource["::findById::Empresa::usuarios"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Oferta
 * @header lbServices.Oferta
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Oferta` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Oferta",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/ofertas/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Oferta.licitacion() instead.
            "prototype$__get__licitacion": {
              url: urlBase + "/ofertas/:id/licitacion",
              method: "GET",
            },

            // INTERNAL. Use Oferta.empresaOferente() instead.
            "prototype$__get__empresaOferente": {
              url: urlBase + "/ofertas/:id/empresaOferente",
              method: "GET",
            },

            // INTERNAL. Use Oferta.empresaOferente.create() instead.
            "prototype$__create__empresaOferente": {
              url: urlBase + "/ofertas/:id/empresaOferente",
              method: "POST",
            },

            // INTERNAL. Use Oferta.empresaOferente.update() instead.
            "prototype$__update__empresaOferente": {
              url: urlBase + "/ofertas/:id/empresaOferente",
              method: "PUT",
            },

            // INTERNAL. Use Oferta.empresaOferente.destroy() instead.
            "prototype$__destroy__empresaOferente": {
              url: urlBase + "/ofertas/:id/empresaOferente",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Oferta#create
             * @methodOf lbServices.Oferta
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Oferta` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/ofertas",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Oferta#patchOrCreate
             * @methodOf lbServices.Oferta
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Oferta` object.)
             * </em>
             */
            "patchOrCreate": {
              url: urlBase + "/ofertas",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.Oferta#findById
             * @methodOf lbServices.Oferta
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Oferta` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/ofertas/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Oferta#find
             * @methodOf lbServices.Oferta
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string (`{"where":{"something":"value"}}`).  See https://loopback.io/doc/en/lb3/Querying-data.html#using-stringified-json-in-rest-queries for more details.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Oferta` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/ofertas",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Oferta#createMany
             * @methodOf lbServices.Oferta
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Oferta` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/ofertas",
              method: "POST",
            },

            // INTERNAL. Use Licitacion.oferta.findById() instead.
            "::findById::Licitacion::oferta": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/licitaciones/:id/oferta/:fk",
              method: "GET",
            },

            // INTERNAL. Use Licitacion.oferta() instead.
            "::get::Licitacion::oferta": {
              isArray: true,
              url: urlBase + "/licitaciones/:id/oferta",
              method: "GET",
            },

            // INTERNAL. Use Licitacion.oferta.create() instead.
            "::create::Licitacion::oferta": {
              url: urlBase + "/licitaciones/:id/oferta",
              method: "POST",
            },

            // INTERNAL. Use Licitacion.oferta.createMany() instead.
            "::createMany::Licitacion::oferta": {
              isArray: true,
              url: urlBase + "/licitaciones/:id/oferta",
              method: "POST",
            },

            // INTERNAL. Use Licitacion.oferta.count() instead.
            "::count::Licitacion::oferta": {
              url: urlBase + "/licitaciones/:id/oferta/count",
              method: "GET",
            },

            // INTERNAL. Use Empresa.ofertas.findById() instead.
            "::findById::Empresa::ofertas": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/empresas/:id/ofertas/:fk",
              method: "GET",
            },

            // INTERNAL. Use Empresa.ofertas.destroyById() instead.
            "::destroyById::Empresa::ofertas": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/empresas/:id/ofertas/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Empresa.ofertas() instead.
            "::get::Empresa::ofertas": {
              isArray: true,
              url: urlBase + "/empresas/:id/ofertas",
              method: "GET",
            },

            // INTERNAL. Use Empresa.ofertas.create() instead.
            "::create::Empresa::ofertas": {
              url: urlBase + "/empresas/:id/ofertas",
              method: "POST",
            },

            // INTERNAL. Use Empresa.ofertas.createMany() instead.
            "::createMany::Empresa::ofertas": {
              isArray: true,
              url: urlBase + "/empresas/:id/ofertas",
              method: "POST",
            },

            // INTERNAL. Use Empresa.ofertas.destroyAll() instead.
            "::delete::Empresa::ofertas": {
              url: urlBase + "/empresas/:id/ofertas",
              method: "DELETE",
            },

            // INTERNAL. Use Empresa.ofertas.count() instead.
            "::count::Empresa::ofertas": {
              url: urlBase + "/empresas/:id/ofertas/count",
              method: "GET",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Oferta#upsert
             * @methodOf lbServices.Oferta
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Oferta` object.)
             * </em>
             */
        R["upsert"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.Oferta#updateOrCreate
             * @methodOf lbServices.Oferta
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Oferta` object.)
             * </em>
             */
        R["updateOrCreate"] = R["patchOrCreate"];


        /**
        * @ngdoc property
        * @name lbServices.Oferta#modelName
        * @propertyOf lbServices.Oferta
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Oferta`.
        */
        R.modelName = "Oferta";


            /**
             * @ngdoc method
             * @name lbServices.Oferta#licitacion
             * @methodOf lbServices.Oferta
             *
             * @description
             *
             * Fetches belongsTo relation licitacion.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - oferta id
             *
             *  - `options` – `{object=}` -
             *
             *  - `refresh` – `{boolean=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Licitacion` object.)
             * </em>
             */
        R.licitacion = function() {
          var TargetResource = $injector.get("Licitacion");
          var action = TargetResource["::get::Oferta::licitacion"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Oferta.empresaOferente
     * @header lbServices.Oferta.empresaOferente
     * @object
     * @description
     *
     * The object `Oferta.empresaOferente` groups methods
     * manipulating `Empresa` instances related to `Oferta`.
     *
     * Call {@link lbServices.Oferta#empresaOferente Oferta.empresaOferente()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Oferta#empresaOferente
             * @methodOf lbServices.Oferta
             *
             * @description
             *
             * Fetches hasOne relation empresaOferente.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - oferta id
             *
             *  - `options` – `{object=}` -
             *
             *  - `refresh` – `{boolean=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Empresa` object.)
             * </em>
             */
        R.empresaOferente = function() {
          var TargetResource = $injector.get("Empresa");
          var action = TargetResource["::get::Oferta::empresaOferente"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Oferta.empresaOferente#create
             * @methodOf lbServices.Oferta.empresaOferente
             *
             * @description
             *
             * Creates a new instance in empresaOferente of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - oferta id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Empresa` object.)
             * </em>
             */
        R.empresaOferente.create = function() {
          var TargetResource = $injector.get("Empresa");
          var action = TargetResource["::create::Oferta::empresaOferente"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Oferta.empresaOferente#createMany
             * @methodOf lbServices.Oferta.empresaOferente
             *
             * @description
             *
             * Creates a new instance in empresaOferente of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - oferta id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Empresa` object.)
             * </em>
             */
        R.empresaOferente.createMany = function() {
          var TargetResource = $injector.get("Empresa");
          var action = TargetResource["::createMany::Oferta::empresaOferente"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Oferta.empresaOferente#destroy
             * @methodOf lbServices.Oferta.empresaOferente
             *
             * @description
             *
             * Deletes empresaOferente of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - oferta id
             *
             *  - `options` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.empresaOferente.destroy = function() {
          var TargetResource = $injector.get("Empresa");
          var action = TargetResource["::destroy::Oferta::empresaOferente"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Oferta.empresaOferente#update
             * @methodOf lbServices.Oferta.empresaOferente
             *
             * @description
             *
             * Update empresaOferente of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - oferta id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Empresa` object.)
             * </em>
             */
        R.empresaOferente.update = function() {
          var TargetResource = $injector.get("Empresa");
          var action = TargetResource["::update::Oferta::empresaOferente"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Usuario
 * @header lbServices.Usuario
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Usuario` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Usuario",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/usuarios/:id",
          { 'id': '@id' },
          {

            /**
             * @ngdoc method
             * @name lbServices.Usuario#prototype$__findById__accessTokens
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Find a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - usuario id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
            "prototype$__findById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/usuarios/:id/accessTokens/:fk",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#prototype$__destroyById__accessTokens
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Delete a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - usuario id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__destroyById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/usuarios/:id/accessTokens/:fk",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#prototype$__updateById__accessTokens
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Update a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - usuario id
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
            "prototype$__updateById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/usuarios/:id/accessTokens/:fk",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#prototype$__get__accessTokens
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Queries accessTokens of usuario.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - usuario id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
            "prototype$__get__accessTokens": {
              isArray: true,
              url: urlBase + "/usuarios/:id/accessTokens",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#prototype$__create__accessTokens
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Creates a new instance in accessTokens of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - usuario id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
            "prototype$__create__accessTokens": {
              url: urlBase + "/usuarios/:id/accessTokens",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#prototype$__delete__accessTokens
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Deletes all accessTokens of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - usuario id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__delete__accessTokens": {
              url: urlBase + "/usuarios/:id/accessTokens",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#prototype$__count__accessTokens
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Counts accessTokens of usuario.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - usuario id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "prototype$__count__accessTokens": {
              url: urlBase + "/usuarios/:id/accessTokens/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#create
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/usuarios",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#patchOrCreate
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
            "patchOrCreate": {
              url: urlBase + "/usuarios",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#replaceOrCreate
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/usuarios/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#upsertWithWhere
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/usuarios/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#exists
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/usuarios/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#findById
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/usuarios/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#replaceById
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/usuarios/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#find
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string (`{"where":{"something":"value"}}`).  See https://loopback.io/doc/en/lb3/Querying-data.html#using-stringified-json-in-rest-queries for more details.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/usuarios",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#findOne
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string (`{"where":{"something":"value"}}`).  See https://loopback.io/doc/en/lb3/Querying-data.html#using-stringified-json-in-rest-queries for more details.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/usuarios/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#updateAll
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/usuarios/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#deleteById
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/usuarios/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#count
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/usuarios/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#prototype$patchAttributes
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - usuario id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
            "prototype$patchAttributes": {
              url: urlBase + "/usuarios/:id",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#createChangeStream
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/usuarios/change-stream",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#login
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Login a user with username/email and password.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
             *   Default value: `user`.
             *
             *  - `rememberMe` - `boolean` - Whether the authentication credentials
             *     should be remembered in localStorage across app/browser restarts.
             *     Default: `true`.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The response body contains properties of the AccessToken created on login.
             * Depending on the value of `include` parameter, the body may contain additional properties:
             *   - `user` - `U+007BUserU+007D` - Data of the currently logged in user. (`include=user`)
             *
             */
            "login": {
              params: {
                include: 'user',
              },
              interceptor: {
                response: function(response) {
                  var accessToken = response.data;
                  LoopBackAuth.setUser(
                    accessToken.id, accessToken.userId, accessToken.user);
                  LoopBackAuth.rememberMe =
                    response.config.params.rememberMe !== false;
                  LoopBackAuth.save();
                  return response.resource;
                },
              },
              url: urlBase + "/usuarios/login",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#logout
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Logout a user with access token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `access_token` – `{string=}` - Do not supply this argument, it is automatically extracted from request headers.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "logout": {
              interceptor: {
                response: function(response) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return response.resource;
                },
                responseError: function(responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return responseError.resource;
                },
              },
              url: urlBase + "/usuarios/logout",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#prototype$verify
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Trigger user's identity verification with configured verifyOptions
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - usuario id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `verifyOptions` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$verify": {
              url: urlBase + "/usuarios/:id/verify",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#confirm
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Confirm a user registration with identity verification token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `uid` – `{string}` -
             *
             *  - `token` – `{string}` -
             *
             *  - `redirect` – `{string=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "confirm": {
              url: urlBase + "/usuarios/confirm",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#resetPassword
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Reset password for a user with email.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "resetPassword": {
              url: urlBase + "/usuarios/reset",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#changePassword
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Change a user's password.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `id` – `{*=}` -
             *
             *  - `oldPassword` – `{string}` -
             *
             *  - `newPassword` – `{string}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "changePassword": {
              url: urlBase + "/usuarios/change-password",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#setPassword
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Reset user's password via a password-reset token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `id` – `{*=}` -
             *
             *  - `newPassword` – `{string}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "setPassword": {
              url: urlBase + "/usuarios/reset-password",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#createMany
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/usuarios",
              method: "POST",
            },

            // INTERNAL. Use Empresa.usuarios.findById() instead.
            "::findById::Empresa::usuarios": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/empresas/:id/usuarios/:fk",
              method: "GET",
            },

            // INTERNAL. Use Empresa.usuarios.destroyById() instead.
            "::destroyById::Empresa::usuarios": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/empresas/:id/usuarios/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Empresa.usuarios() instead.
            "::get::Empresa::usuarios": {
              isArray: true,
              url: urlBase + "/empresas/:id/usuarios",
              method: "GET",
            },

            // INTERNAL. Use Empresa.usuarios.create() instead.
            "::create::Empresa::usuarios": {
              url: urlBase + "/empresas/:id/usuarios",
              method: "POST",
            },

            // INTERNAL. Use Empresa.usuarios.createMany() instead.
            "::createMany::Empresa::usuarios": {
              isArray: true,
              url: urlBase + "/empresas/:id/usuarios",
              method: "POST",
            },

            // INTERNAL. Use Empresa.usuarios.destroyAll() instead.
            "::delete::Empresa::usuarios": {
              url: urlBase + "/empresas/:id/usuarios",
              method: "DELETE",
            },

            // INTERNAL. Use Empresa.usuarios.count() instead.
            "::count::Empresa::usuarios": {
              url: urlBase + "/empresas/:id/usuarios/count",
              method: "GET",
            },

            // INTERNAL. Use Administracion.usuarios.findById() instead.
            "::findById::Administracion::usuarios": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/administraciones/:id/usuarios/:fk",
              method: "GET",
            },

            // INTERNAL. Use Administracion.usuarios.destroyById() instead.
            "::destroyById::Administracion::usuarios": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/administraciones/:id/usuarios/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Administracion.usuarios() instead.
            "::get::Administracion::usuarios": {
              isArray: true,
              url: urlBase + "/administraciones/:id/usuarios",
              method: "GET",
            },

            // INTERNAL. Use Administracion.usuarios.create() instead.
            "::create::Administracion::usuarios": {
              url: urlBase + "/administraciones/:id/usuarios",
              method: "POST",
            },

            // INTERNAL. Use Administracion.usuarios.createMany() instead.
            "::createMany::Administracion::usuarios": {
              isArray: true,
              url: urlBase + "/administraciones/:id/usuarios",
              method: "POST",
            },

            // INTERNAL. Use Administracion.usuarios.destroyAll() instead.
            "::delete::Administracion::usuarios": {
              url: urlBase + "/administraciones/:id/usuarios",
              method: "DELETE",
            },

            // INTERNAL. Use Administracion.usuarios.count() instead.
            "::count::Administracion::usuarios": {
              url: urlBase + "/administraciones/:id/usuarios/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Usuario#getCurrent
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Get data of the currently logged user. Fail with HTTP result 401
             * when there is no user logged in.
             *
             * @param {function(Object,Object)=} successCb
             *    Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *    `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             */
            'getCurrent': {
              url: urlBase + "/usuarios" + '/:id',
              method: 'GET',
              params: {
                id: function() {
                  var id = LoopBackAuth.currentUserId;
                  if (id == null) id = '__anonymous__';
                  return id;
                },
              },
              interceptor: {
                response: function(response) {
                  LoopBackAuth.currentUserData = response.data;
                  return response.resource;
                },
                responseError: function(responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return $q.reject(responseError);
                },
              },
              __isGetCurrentUser__: true,
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Usuario#upsert
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
        R["upsert"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.Usuario#updateOrCreate
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
        R["updateOrCreate"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.Usuario#patchOrCreateWithWhere
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.Usuario#update
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.Usuario#destroyById
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Usuario#removeById
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Usuario#prototype$updateAttributes
             * @methodOf lbServices.Usuario
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - usuario id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
        R["prototype$updateAttributes"] = R["prototype$patchAttributes"];

        /**
         * @ngdoc method
         * @name lbServices.Usuario#getCachedCurrent
         * @methodOf lbServices.Usuario
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.Usuario#login} or
         * {@link lbServices.Usuario#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A Usuario instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Usuario#isAuthenticated
         * @methodOf lbServices.Usuario
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Usuario#getCurrentId
         * @methodOf lbServices.Usuario
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

        /**
        * @ngdoc property
        * @name lbServices.Usuario#modelName
        * @propertyOf lbServices.Usuario
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Usuario`.
        */
        R.modelName = "Usuario";



        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.SmartContract
 * @header lbServices.SmartContract
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `SmartContract` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "SmartContract",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/smartContracts/:id",
          { 'id': '@id' },
          {

            /**
             * @ngdoc method
             * @name lbServices.SmartContract#create
             * @methodOf lbServices.SmartContract
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `SmartContract` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/smartContracts",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.SmartContract#patchOrCreate
             * @methodOf lbServices.SmartContract
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `SmartContract` object.)
             * </em>
             */
            "patchOrCreate": {
              url: urlBase + "/smartContracts",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.SmartContract#findById
             * @methodOf lbServices.SmartContract
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `SmartContract` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/smartContracts/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.SmartContract#find
             * @methodOf lbServices.SmartContract
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string (`{"where":{"something":"value"}}`).  See https://loopback.io/doc/en/lb3/Querying-data.html#using-stringified-json-in-rest-queries for more details.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `SmartContract` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/smartContracts",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.SmartContract#createMany
             * @methodOf lbServices.SmartContract
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `SmartContract` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/smartContracts",
              method: "POST",
            },

            // INTERNAL. Use Licitacion.smartContract() instead.
            "::get::Licitacion::smartContract": {
              url: urlBase + "/licitaciones/:id/smartContract",
              method: "GET",
            },

            // INTERNAL. Use Licitacion.smartContract.create() instead.
            "::create::Licitacion::smartContract": {
              url: urlBase + "/licitaciones/:id/smartContract",
              method: "POST",
            },

            // INTERNAL. Use Licitacion.smartContract.createMany() instead.
            "::createMany::Licitacion::smartContract": {
              isArray: true,
              url: urlBase + "/licitaciones/:id/smartContract",
              method: "POST",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.SmartContract#upsert
             * @methodOf lbServices.SmartContract
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `SmartContract` object.)
             * </em>
             */
        R["upsert"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.SmartContract#updateOrCreate
             * @methodOf lbServices.SmartContract
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `SmartContract` object.)
             * </em>
             */
        R["updateOrCreate"] = R["patchOrCreate"];


        /**
        * @ngdoc property
        * @name lbServices.SmartContract#modelName
        * @propertyOf lbServices.SmartContract
        * @description
        * The name of the model represented by this $resource,
        * i.e. `SmartContract`.
        */
        R.modelName = "SmartContract";



        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Administracion
 * @header lbServices.Administracion
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Administracion` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Administracion",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/administraciones/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Administracion.usuarios.findById() instead.
            "prototype$__findById__usuarios": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/administraciones/:id/usuarios/:fk",
              method: "GET",
            },

            // INTERNAL. Use Administracion.usuarios.destroyById() instead.
            "prototype$__destroyById__usuarios": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/administraciones/:id/usuarios/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Administracion.licitaciones.findById() instead.
            "prototype$__findById__licitaciones": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/administraciones/:id/licitaciones/:fk",
              method: "GET",
            },

            // INTERNAL. Use Administracion.licitaciones.destroyById() instead.
            "prototype$__destroyById__licitaciones": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/administraciones/:id/licitaciones/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Administracion.usuarios() instead.
            "prototype$__get__usuarios": {
              isArray: true,
              url: urlBase + "/administraciones/:id/usuarios",
              method: "GET",
            },

            // INTERNAL. Use Administracion.usuarios.create() instead.
            "prototype$__create__usuarios": {
              url: urlBase + "/administraciones/:id/usuarios",
              method: "POST",
            },

            // INTERNAL. Use Administracion.usuarios.destroyAll() instead.
            "prototype$__delete__usuarios": {
              url: urlBase + "/administraciones/:id/usuarios",
              method: "DELETE",
            },

            // INTERNAL. Use Administracion.usuarios.count() instead.
            "prototype$__count__usuarios": {
              url: urlBase + "/administraciones/:id/usuarios/count",
              method: "GET",
            },

            // INTERNAL. Use Administracion.licitaciones() instead.
            "prototype$__get__licitaciones": {
              isArray: true,
              url: urlBase + "/administraciones/:id/licitaciones",
              method: "GET",
            },

            // INTERNAL. Use Administracion.licitaciones.create() instead.
            "prototype$__create__licitaciones": {
              url: urlBase + "/administraciones/:id/licitaciones",
              method: "POST",
            },

            // INTERNAL. Use Administracion.licitaciones.destroyAll() instead.
            "prototype$__delete__licitaciones": {
              url: urlBase + "/administraciones/:id/licitaciones",
              method: "DELETE",
            },

            // INTERNAL. Use Administracion.licitaciones.count() instead.
            "prototype$__count__licitaciones": {
              url: urlBase + "/administraciones/:id/licitaciones/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Administracion#create
             * @methodOf lbServices.Administracion
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Administracion` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/administraciones",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Administracion#patchOrCreate
             * @methodOf lbServices.Administracion
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Administracion` object.)
             * </em>
             */
            "patchOrCreate": {
              url: urlBase + "/administraciones",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.Administracion#findById
             * @methodOf lbServices.Administracion
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Administracion` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/administraciones/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Administracion#find
             * @methodOf lbServices.Administracion
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string (`{"where":{"something":"value"}}`).  See https://loopback.io/doc/en/lb3/Querying-data.html#using-stringified-json-in-rest-queries for more details.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Administracion` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/administraciones",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Administracion#createMany
             * @methodOf lbServices.Administracion
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Administracion` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/administraciones",
              method: "POST",
            },

            // INTERNAL. Use Licitacion.administracion() instead.
            "::get::Licitacion::administracion": {
              url: urlBase + "/licitaciones/:id/administracion",
              method: "GET",
            },

            // INTERNAL. Use Licitacion.administracion.create() instead.
            "::create::Licitacion::administracion": {
              url: urlBase + "/licitaciones/:id/administracion",
              method: "POST",
            },

            // INTERNAL. Use Licitacion.administracion.createMany() instead.
            "::createMany::Licitacion::administracion": {
              isArray: true,
              url: urlBase + "/licitaciones/:id/administracion",
              method: "POST",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Administracion#upsert
             * @methodOf lbServices.Administracion
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Administracion` object.)
             * </em>
             */
        R["upsert"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.Administracion#updateOrCreate
             * @methodOf lbServices.Administracion
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Administracion` object.)
             * </em>
             */
        R["updateOrCreate"] = R["patchOrCreate"];


        /**
        * @ngdoc property
        * @name lbServices.Administracion#modelName
        * @propertyOf lbServices.Administracion
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Administracion`.
        */
        R.modelName = "Administracion";

    /**
     * @ngdoc object
     * @name lbServices.Administracion.usuarios
     * @header lbServices.Administracion.usuarios
     * @object
     * @description
     *
     * The object `Administracion.usuarios` groups methods
     * manipulating `Usuario` instances related to `Administracion`.
     *
     * Call {@link lbServices.Administracion#usuarios Administracion.usuarios()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Administracion#usuarios
             * @methodOf lbServices.Administracion
             *
             * @description
             *
             * Queries usuarios of administracion.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - administracion id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
        R.usuarios = function() {
          var TargetResource = $injector.get("Usuario");
          var action = TargetResource["::get::Administracion::usuarios"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Administracion.usuarios#count
             * @methodOf lbServices.Administracion.usuarios
             *
             * @description
             *
             * Counts usuarios of administracion.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - administracion id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.usuarios.count = function() {
          var TargetResource = $injector.get("Usuario");
          var action = TargetResource["::count::Administracion::usuarios"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Administracion.usuarios#create
             * @methodOf lbServices.Administracion.usuarios
             *
             * @description
             *
             * Creates a new instance in usuarios of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - administracion id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
        R.usuarios.create = function() {
          var TargetResource = $injector.get("Usuario");
          var action = TargetResource["::create::Administracion::usuarios"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Administracion.usuarios#createMany
             * @methodOf lbServices.Administracion.usuarios
             *
             * @description
             *
             * Creates a new instance in usuarios of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - administracion id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
        R.usuarios.createMany = function() {
          var TargetResource = $injector.get("Usuario");
          var action = TargetResource["::createMany::Administracion::usuarios"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Administracion.usuarios#destroyAll
             * @methodOf lbServices.Administracion.usuarios
             *
             * @description
             *
             * Deletes all usuarios of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - administracion id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.usuarios.destroyAll = function() {
          var TargetResource = $injector.get("Usuario");
          var action = TargetResource["::delete::Administracion::usuarios"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Administracion.usuarios#destroyById
             * @methodOf lbServices.Administracion.usuarios
             *
             * @description
             *
             * Delete a related item by id for usuarios.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - administracion id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for usuarios
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.usuarios.destroyById = function() {
          var TargetResource = $injector.get("Usuario");
          var action = TargetResource["::destroyById::Administracion::usuarios"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Administracion.usuarios#findById
             * @methodOf lbServices.Administracion.usuarios
             *
             * @description
             *
             * Find a related item by id for usuarios.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - administracion id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for usuarios
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Usuario` object.)
             * </em>
             */
        R.usuarios.findById = function() {
          var TargetResource = $injector.get("Usuario");
          var action = TargetResource["::findById::Administracion::usuarios"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Administracion.licitaciones
     * @header lbServices.Administracion.licitaciones
     * @object
     * @description
     *
     * The object `Administracion.licitaciones` groups methods
     * manipulating `Licitacion` instances related to `Administracion`.
     *
     * Call {@link lbServices.Administracion#licitaciones Administracion.licitaciones()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Administracion#licitaciones
             * @methodOf lbServices.Administracion
             *
             * @description
             *
             * Queries licitaciones of administracion.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - administracion id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Licitacion` object.)
             * </em>
             */
        R.licitaciones = function() {
          var TargetResource = $injector.get("Licitacion");
          var action = TargetResource["::get::Administracion::licitaciones"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Administracion.licitaciones#count
             * @methodOf lbServices.Administracion.licitaciones
             *
             * @description
             *
             * Counts licitaciones of administracion.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - administracion id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.licitaciones.count = function() {
          var TargetResource = $injector.get("Licitacion");
          var action = TargetResource["::count::Administracion::licitaciones"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Administracion.licitaciones#create
             * @methodOf lbServices.Administracion.licitaciones
             *
             * @description
             *
             * Creates a new instance in licitaciones of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - administracion id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Licitacion` object.)
             * </em>
             */
        R.licitaciones.create = function() {
          var TargetResource = $injector.get("Licitacion");
          var action = TargetResource["::create::Administracion::licitaciones"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Administracion.licitaciones#createMany
             * @methodOf lbServices.Administracion.licitaciones
             *
             * @description
             *
             * Creates a new instance in licitaciones of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - administracion id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Licitacion` object.)
             * </em>
             */
        R.licitaciones.createMany = function() {
          var TargetResource = $injector.get("Licitacion");
          var action = TargetResource["::createMany::Administracion::licitaciones"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Administracion.licitaciones#destroyAll
             * @methodOf lbServices.Administracion.licitaciones
             *
             * @description
             *
             * Deletes all licitaciones of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - administracion id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.licitaciones.destroyAll = function() {
          var TargetResource = $injector.get("Licitacion");
          var action = TargetResource["::delete::Administracion::licitaciones"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Administracion.licitaciones#destroyById
             * @methodOf lbServices.Administracion.licitaciones
             *
             * @description
             *
             * Delete a related item by id for licitaciones.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - administracion id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for licitaciones
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.licitaciones.destroyById = function() {
          var TargetResource = $injector.get("Licitacion");
          var action = TargetResource["::destroyById::Administracion::licitaciones"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Administracion.licitaciones#findById
             * @methodOf lbServices.Administracion.licitaciones
             *
             * @description
             *
             * Find a related item by id for licitaciones.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - administracion id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for licitaciones
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Licitacion` object.)
             * </em>
             */
        R.licitaciones.findById = function() {
          var TargetResource = $injector.get("Licitacion");
          var action = TargetResource["::findById::Administracion::licitaciones"];
          return action.apply(R, arguments);
        };


        return R;
      }]);


  module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId', 'rememberMe'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    };

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    };

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      try {
        var key = propsPrefix + name;
        if (value == null) value = '';
        storage[key] = value;
      } catch (err) {
        console.log('Cannot access local/session storage:', err);
      }
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', ['$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {
          // filter out external requests
          var host = getHost(config.url);
          if (host && config.url.indexOf(urlBaseHost) === -1) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 }},
              status: 401,
              config: config,
              headers: function() { return undefined; },
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        },
      };
    }])

  /**
   * @ngdoc object
   * @name lbServices.LoopBackResourceProvider
   * @header lbServices.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#getAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @description
     * Get the header name that is used for sending the authentication token.
     */
    this.getAuthHeader = function() {
      return authHeader;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
      urlBaseHost = getHost(urlBase) || location.host;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#getUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @description
     * Get the URL of the REST API server. The URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.getUrlBase = function() {
      return urlBase;
    };

    this.$get = ['$resource', function($resource) {
      var LoopBackResource = function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };

      LoopBackResource.getUrlBase = function() {
        return urlBase;
      };

      LoopBackResource.getAuthHeader = function() {
        return authHeader;
      };

      return LoopBackResource;
    }];
  });
})(window, window.angular);
