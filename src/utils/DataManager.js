import firebase from 'firebase/app';
import 'firebase/firestore';
import cookie from 'react-cookies';

let db;

export default class DataManager {
	static storeData(key, value) {}

	static getData(key) {
		return 'getData';
	}

	static getObjects(collection, condition) {
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
					resolve();
				})
				.catch((error) => {
					console.error('[DataManager:updateObject] error: %s', error);
					reject(null);
				});
		});
	}

	static getCookieObject(name) {
		return cookie.load(name);
	}

	static setCookieObject(name, data) {
		cookie.save(name, data);
		return this.getCookieObject(name);
	}

	static removeCookieObject(name, callback) {
		cookie.remove(name);

		if( typeof(callback) === 'function' )
			callback();
	}
}