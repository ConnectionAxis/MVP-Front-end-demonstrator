import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import cookie from 'react-cookies';
import Util from './Util';
import format from 'string-format';

let db;
let ds;

export default class DataManager {
	static storeData(key, value) {}

	static getData(key) {
		return 'getData';
	}

	static getObject(collection, id) {
		if( !db )
			db = firebase.firestore();

		return new Promise((resolve, reject) => {
    	var connection = db.collection(collection);

    	connection
    		.doc(id)
    		.get()
    		.then((data) => {
    			if( !Util.isEmpty(data.data()) ) {
    				let output = data.data();
    				output['id'] = id;
    				resolve(output);
    			} else {
    				reject(null);
    			}
    		})
    		.catch((error) => {
    			reject(null);
    		})
		});
	}

	static getObjects(collection, condition, limit, order) {
		if( !db )
			db = firebase.firestore();

    return new Promise((resolve, reject) => {
    	var connection = db.collection(collection),
    			query;

    	if( condition ) {
    		condition.forEach(i => {
    			query = connection.where(i[0], i[1], i[2]);
    		})

    		if( !query )
    			query = connection;
    	}

    	if( limit )
    		query = query.limit(limit);

    	if( order ) {
    		if( order.length > 1 )
    			query = query.orderBy(order[0], order[1])
    		else
    			query = query.orderBy(order[0])
    	}

	    query
	    	.get()
	      .then((data) => {
	        var output = [];
	        data.forEach((o) => {
	        	output.push(o.data());
	          output[output.length-1]['id'] = o.id;
	        });
	        resolve(output);
	      })
	      .catch((error) => {
	      	console.error('[DataManager:getObjects] error: %s', error);
	      	reject([]);
	      });
    });
	}

	static addObject(collection, data) {
		if( !db )
			db = firebase.firestore();

		const connection = db.collection(collection);

		return new Promise((resolve, reject) => {
			connection.add(data)
				.then((newObject) => {
					resolve(newObject.id);
				})
				.catch((error) => {
					console.error('[DataManager:addObject] error: %s', error);
					reject(null);
				});
		});
	}

	static updateObject(collection, id, data) {
		if( !db )
			db = firebase.firestore();

		const connection = db.collection(collection).doc(id);

		return new Promise((resolve, reject) => {
			connection.update(data)
				.then(() => {
					resolve(data);
				})
				.catch((error) => {
					console.error('[DataManager:updateObject] error: %s', error);
					reject(null);
				});
		});
	}

	static getFileRef(collection, name) {
		if( !ds )
			ds = firebase.storage();

		return ds.ref(format('{0}/{1}', collection, name));
	}

	static getCookieObject(name) {
		return cookie.load(name);
	}

	static setCookieObject(name, data) {
		cookie.save(name, data);
		return this.getCookieObject(name);
	}

	static updateCookieObject(name, data) {
		var object = this.getCookieObject(name);
		if( !Util.isEmpty(object) ) {
			Util.eachInObject(data, (key, value) => {
				if( object.hasOwnProperty(key) ) {
					object[key] = value;
				}
			});
			cookie.save(name, object);
		} else {
			console.error('[DataManager:updateCookieObject] No Cookie object "%s" found', name);
		}
	}

	static removeCookieObject(name, callback) {
		cookie.remove(name);

		if( typeof(callback) === 'function' )
			callback();
	}
}