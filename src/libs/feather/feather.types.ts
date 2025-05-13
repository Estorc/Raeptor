export type Vector2 = [number, number];
export type Vector3 = [number, number, number];
export type Vector4 = [number, number, number, number];

export class SmartVector2 {
  constructor(x: number, y: number) {
    this[0] = x;
    this[1] = y;
  }

  [index: number]: number;

  // Getters and setters for x and y
  get x(): number {
    return this[0];
  }

  set x(value: number) {
    this[0] = value;
  }

  get y(): number {
    return this[1];
  }

  set y(value: number) {
    this[1] = value;
  }

  // We can also use methods if needed
  getMagnitude() {
    return Math.sqrt(this[0] ** 2 + this[1] ** 2);
  }

  getMagnitudeSquared() {
      return this[0] ** 2 + this[1] ** 2;
  }

  getMagnitude2() {
      return this.getMagnitudeSquared();
  }
};

export class SmartVector3 {
  constructor(x: number, y: number, z: number) {
    this[0] = x;
    this[1] = y;
    this[2] = z;
  }

  [index: number]: number;

  // Getters and setters for x, y, and z
  get x(): number {
    return this[0];
  }

  set x(value: number) {
    this[0] = value;
  }

  get y(): number {
    return this[1];
  }

  set y(value: number) {
    this[1] = value;
  }

  get z(): number {
    return this[2];
  }

  set z(value: number) {
    this[2] = value;
  }

  // We can also use methods if needed
  getMagnitude() {
    return Math.sqrt(this[0] ** 2 + this[1] ** 2 + this[2] ** 2);
  }

  getMagnitudeSquared() {
      return this[0] ** 2 + this[1] ** 2 + this[2] ** 2;
  }

  getMagnitude2() {
      return this.getMagnitudeSquared();
  }
};


export class SmartVector4 {
  constructor(x: number, y: number, z: number, w: number) {
    this[0] = x;
    this[1] = y;
    this[2] = z;
    this[3] = w;
  }

  [index: number]: number;

  // Getters and setters for x, y, z, and w
  get x(): number {
    return this[0];
  }
  set x(value: number) {
    this[0] = value;
  }
  get y(): number {
    return this[1];
  }
  set y(value: number) {
    this[1] = value;
  }
  get z(): number {
    return this[2];
  }
  set z(value: number) {
    this[2] = value;
  }
  get w(): number {
    return this[3];
  }
  set w(value: number) {
    this[3] = value;
  }
  // We can also use methods if needed
  getMagnitude() {
    return Math.sqrt(this[0] ** 2 + this[1] ** 2 + this[2] ** 2 + this[3] ** 2);
  }
  getMagnitudeSquared() {
      return this[0] ** 2 + this[1] ** 2 + this[2] ** 2 + this[3] ** 2;
  }
  getMagnitude2() {
      return this.getMagnitudeSquared();
  }
};