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

	static uniqueValue(len) {
		var output = '';
		const ts = new Date();

		if( this.isEmpty(len) )
			len = 5;

		output = this.getHash(ts.getTime());

    return output.substring(0, len);
	}
}