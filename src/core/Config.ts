import CookieOptions from './CookieOptions';
import Purpose from './Purpose';

export default interface Config {
	cookie?: CookieOptions,
	purposes: Purpose[]
}
