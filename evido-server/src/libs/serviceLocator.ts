interface ConstructorType<T> {
  (): T;
}

class ServiceLocator {
  private dependencyMap: Map<string, () => any>;
  private dependencyCache: Map<string, any>;
  constructor() {
    this.dependencyMap = new Map();
    this.dependencyCache = new Map();
  }

  register<T>(dependencyName: string, constructor: ConstructorType<T>) {
    if (!dependencyName) {
      throw new Error('Dependency name must be provided');
    }
    if (typeof constructor !== 'function') {
      throw new Error('constructor is not a function');
    }
    this.dependencyMap.set(dependencyName, constructor);
  }

  get<T>(dependencyName: string): T {
    if (!this.dependencyMap.has(dependencyName)) {
      throw new Error(`${dependencyName} : Attempting to retrieve unknown dependency`);
    }
    const dependency = this.dependencyMap.get(dependencyName);
    if (typeof dependency !== 'function') {
      throw new Error(`${dependencyName} : Dependency constructor is not a function`);
    }

    if (!this.dependencyCache.has(dependencyName)) {
      const dependencyConstructor = this.dependencyMap.get(dependencyName);
      this.dependencyCache.set(dependencyName, dependencyConstructor());
    }
    return this.dependencyCache.get(dependencyName);
  }
}

const serviceLocatorSingleton = new ServiceLocator();
export default serviceLocatorSingleton;
