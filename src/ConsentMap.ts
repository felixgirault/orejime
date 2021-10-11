type Values<T> = {
	[key: string]: T;
};

type Observer<T> = (values: Values<T>) => void;

export default class ObservableMap<T> {
	public readonly defaults: Values<T>;
	public values: Values<T>;
	private observers: Set<Observer<T>>;

	constructor(values: Values<T>) {
		this.observers = new Set();
		this.defaults = {...values};
		this.values = {...values};
	}

	has(key: string) {
		return key in this.values;
	}

	get(key: string) {
		return this.values[key] || false;
	}

	getAll() {
		return {...this.values};
	}

	set(key: string, value: T) {
		this.values[key] = value;
		this.emit();
	}

	setAll(values: Values<T>) {
		this.values = {...values};
		this.emit();
	}

	reset() {
		this.setAll(this.defaults);
	}

	subscribe(callback: Observer<T>) {
		this.observers.add(callback);
	}

	unsubscribe(callback: Observer<T>) {
		this.observers.delete(callback);
	}

	private emit() {
		this.observers.forEach((callback) => {
			callback(this.getAll());
		});
	}
}
