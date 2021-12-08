import CookieOptions from './CookieOptions';
import Tracker from './Tracker';

export default interface Config {
	cookie?: CookieOptions,
	trackers: Tracker[]
}
