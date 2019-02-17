import MD5 from 'js-md5';
import format from 'string-format';
import Cookies from 'react-cookie';

export default class Util {
	static validateEmail(value) {
		// return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
		return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))
	}
}