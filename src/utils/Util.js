import MD5 from 'js-md5';
// import format from 'string-format';
// import Cookies from 'react-cookie';

export default class Util {
	static validateEmail(value) {
		return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))
	}

	static getHash() {
		return MD5(Array.from(arguments).join('-'));
	}

	static isEmpty(object) {
		switch( typeof(object) ) {
			case 'object':
				return Object.keys(object).length === 0;
			case 'array':
			case 'string':
				return object.length === 0;
			case 'undefined':
				return true;
			default:
				return false;
		}
	}

	static eachInArray(array, callback) {
		for (var i = 0; i < array.length; i++) {
			if( i === array.length-1 ) {
				callback(array[i], i, true);
			} else {
				callback(array[i], i, false);
			}
		}
	}

	static eachInObject(object, callback) {
		const keys = Object.keys(object);
		for (var i = 0; i < keys.length; i++) {
			callback(keys[i], object[keys[i]]);
		}
	}

	static uniqueValue(len) {
		var output = '';
		const ts = new Date();

		if( this.isEmpty(len) )
			len = 5;

		output = this.getHash(ts.getTime());

    return output.substring(0, len);
	}

	static getDaysAgo(dt) {
		let dtn = new Date();
		dtn.setFullYear(dt.split("/")[2]);
		dtn.setMonth(dt.split("/")[1]);
		dtn.setDate(dt.split("/")[0]);

		let dtc = Math.round((new Date().setHours(23) - new Date(new Date().getYear()+1900, 0, 1, 0, 0, 0))/1000/60/60/24);
		let dt2 = Math.round((dtn.setHours(23) - new Date(dtn.getYear()+1900, 0, 1, 0, 0, 0))/1000/60/60/24);

		return dtc - dt2;
	}
}