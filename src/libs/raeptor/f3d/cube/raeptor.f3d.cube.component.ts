import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, HostListener, Inject, Input, OnDestroy, PLATFORM_ID, QueryList, TemplateRef, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { RaeptorF3DCubeFaceDirective } from './raeptor.f3d.cube.face.directive';
import { Face } from '@raeptor/webgl/raeptor.webgl.mesh.core';
import { TranslateModule } from '@ngx-translate/core';

enum FaceID {
  Front,
  Back,
  Left,
  Right,
  Top,
  Bottom
}

const FACE_NORMALS = {
  [FaceID.Front]:  [ 0,  0,  1],
  [FaceID.Back]:   [ 0,  0, -1],
  [FaceID.Left]:   [-1,  0,  0],
  [FaceID.Right]:  [ 1,  0,  0],
  [FaceID.Top]:    [ 0, -1,  0],
  [FaceID.Bottom]: [ 0,  1,  0],
};

const FACE_RIGHTS = {
  [FaceID.Front]:  FaceID.Right,
  [FaceID.Back]:   FaceID.Left,
  [FaceID.Left]:   FaceID.Front,
  [FaceID.Right]:  FaceID.Back,
  [FaceID.Top]:    FaceID.Right,
  [FaceID.Bottom]: FaceID.Right,
}

const FACE_UPS = {
  [FaceID.Front]:  FaceID.Top,
  [FaceID.Back]:   FaceID.Top,
  [FaceID.Left]:   FaceID.Top,
  [FaceID.Right]:  FaceID.Top,
  [FaceID.Top]:    FaceID.Back,
  [FaceID.Bottom]: FaceID.Front,
}

const FACE_LEFTS = {
  [FaceID.Front]:  FaceID.Left,
  [FaceID.Back]:   FaceID.Right,
  [FaceID.Left]:   FaceID.Back,
  [FaceID.Right]:  FaceID.Front,
  [FaceID.Top]:    FaceID.Left,
  [FaceID.Bottom]: FaceID.Left,
}

const FACE_DOWNS = {
  [FaceID.Front]:  FaceID.Bottom,
  [FaceID.Back]:   FaceID.Bottom,
  [FaceID.Left]:   FaceID.Bottom,
  [FaceID.Right]:  FaceID.Bottom,
  [FaceID.Top]:    FaceID.Front,
  [FaceID.Bottom]: FaceID.Back,
}

const FACE_STRINGS = {
  [FaceID.Front]:  'front',
  [FaceID.Back]:   'back',
  [FaceID.Left]:   'left',
  [FaceID.Right]:  'right',
  [FaceID.Top]:    'top',
  [FaceID.Bottom]: 'bottom',
};

function mulQ(a: {x:number, y:number, z:number, w:number}, b: {x:number, y:number, z:number, w:number}) : {x:number, y:number, z:number, w:number} {
  return {
    w: a.w*b.w - a.x*b.x - a.y*b.y - a.z*b.z,
    x: a.w*b.x + a.x*b.w + a.y*b.z - a.z*b.y,
    y: a.w*b.y - a.x*b.z + a.y*b.w + a.z*b.x,
    z: a.w*b.z + a.x*b.y - a.y*b.x + a.z*b.w
  };
}

function fromAxisAngle(axis: [number, number, number], deg: number) : {x:number, y:number, z:number, w:number} {
  const rad = deg * Math.PI / 180;
  const s = Math.sin(rad/2);
  return {
    w: Math.cos(rad/2),
    x: axis[0] * s,
    y: axis[1] * s,
    z: axis[2] * s
  };
}

function normalizeQ(q: {x:number, y:number, z:number, w:number}) : {x:number, y:number, z:number, w:number} {
  const len = Math.hypot(q.w, q.x, q.y, q.z) || 1;
  return { w: q.w/len, x: q.x/len, y: q.y/len, z: q.z/len };
}

function cross(a: [number, number, number], b: [number, number, number]) : [number, number, number] {
  return [
    a[1]*b[2] - a[2]*b[1],
    a[2]*b[0] - a[0]*b[2],
    a[0]*b[1] - a[1]*b[0]
  ];
}

function dot(a: [number, number, number], b: [number, number, number]) : number {
  return a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
}

function normalFromQ(v: [number, number, number], q: {x:number, y:number, z:number, w:number}) : [number, number, number] {
    let u = [q.x, q.y, q.z] as [number, number, number];
    let s = q.w;

    let cross1 = cross(u, v);
    let cross2 = cross(u, cross1);

    return v.map((val, i) => Math.round(val + 2.0 * (s * cross1[i] + cross2[i]))) as [number, number, number];
}

function getFaceFromQ(faceID: FaceID, q: {x:number, y:number, z:number, w:number}) : FaceID {
  let normal = normalFromQ(FACE_NORMALS[faceID] as [number, number, number], q);;
  return Object.keys(FACE_NORMALS).find(key => {
    let n = FACE_NORMALS[key as unknown as FaceID] as [number, number, number];
    return n[0] === normal[0] && n[1] === normal[1] && n[2] === normal[2];
  }) as unknown as FaceID;
}

function getFaceTwistAngle(faceID: FaceID, q: {x:number, y:number, z:number, w:number}) : number {
    let rightFaceID = getFaceFromQ(FACE_RIGHTS[faceID], q);
    faceID = getFaceFromQ(faceID, q);
    if (rightFaceID == FACE_RIGHTS[faceID]) return 0;
    if (rightFaceID == FACE_LEFTS[faceID]) return 180;
    if (rightFaceID == FACE_UPS[faceID]) return -90;
    if (rightFaceID == FACE_DOWNS[faceID]) return 90;
    return 0;
}

interface FaceTemplate {
  template: TemplateRef<any>;
  up: string;
  right: string;
  left: string;
  down: string;
  callOnFocus? : () => void;
  callOnLeave? : () => void;
  [key: string]: string | TemplateRef<any> | (() => void) | undefined;
}

  

@Component({
  selector: 'raeptor-f3d-cube',
  templateUrl: './raeptor.f3d.cube.component.html',
  styleUrl: './raeptor.f3d.cube.component.scss',
  imports: [CommonModule, TranslateModule],
  encapsulation: ViewEncapsulation.None
})
export class RaeptorF3DCubeComponent implements OnDestroy, AfterContentInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private elementRef : ElementRef) {}
  @Input('main') mainFaceID: string = 'main';
  @ViewChild('cube', { static: true}) cubeRef!: ElementRef;
  @ContentChildren(RaeptorF3DCubeFaceDirective) faces!: QueryList<RaeptorF3DCubeFaceDirective>;
  faceTemplates: {[key: string]: FaceTemplate} = {};
  currentFace: FaceTemplate | null = null;
  currentFaces: {[key: string]: TemplateRef<any> | null} = {};
  running : boolean = true;
  animationFrameId : number = 0;
  q : {x:number, y:number, z:number, w:number} = { x:0, y:0, z:0, w:1 }; // identity rotation

  updateFaceTemplate(direction: string, faceID: FaceID) : void {
    if (!this.currentFace) return;
    switch (direction) {
      case 'up':
        this.currentFaces[FACE_STRINGS[getFaceFromQ(faceID, this.q)]] = this.faceTemplates[this.currentFace.up]?.template || null;
        break;
      case 'right':
        this.currentFaces[FACE_STRINGS[getFaceFromQ(faceID, this.q)]] = this.faceTemplates[this.currentFace.right]?.template || null;
        break;
      case 'left':
        this.currentFaces[FACE_STRINGS[getFaceFromQ(faceID, this.q)]] = this.faceTemplates[this.currentFace.left]?.template || null;
        break;
      case 'down':
        this.currentFaces[FACE_STRINGS[getFaceFromQ(faceID, this.q)]] = this.faceTemplates[this.currentFace.down]?.template || null;
        break;
      default:
        // main face
        this.currentFaces[FACE_STRINGS[getFaceFromQ(faceID, this.q)]] = this.currentFace.template;
        break;
    }
    this.elementRef.nativeElement.querySelector(`.f3d-cube-${FACE_STRINGS[getFaceFromQ(faceID, this.q)]} .content`)?.classList.remove('twist-0', 'twist-90', 'twist--90', 'twist-180');
    const angle = getFaceTwistAngle(faceID, this.q);
    this.elementRef.nativeElement.querySelector(`.f3d-cube-${FACE_STRINGS[getFaceFromQ(faceID, this.q)]} .content`)?.classList.add(`twist-${angle}`);
  }

  updateFaceTemplates() {
    this.updateFaceTemplate('main', FaceID.Front);
    this.updateFaceTemplate('up', FaceID.Top);
    this.updateFaceTemplate('right', FaceID.Right);
    this.updateFaceTemplate('left', FaceID.Left);
    this.updateFaceTemplate('down', FaceID.Bottom);
  }

  ngAfterContentInit() {
    const arr = this.faces.toArray();
    for (let face of arr) {
      if (!this.faceTemplates[face.id]) this.faceTemplates[face.id] = {
        template: face.faceTpl,
        up: face.up,
        right: face.right,
        left: face.left,
        down: face.down,
        callOnFocus: face.callOnFocus,
        callOnLeave: face.callOnLeave
      };
    }
    this.currentFace = this.faceTemplates[this.mainFaceID] || null;
    this.currentFaces[FACE_STRINGS[FaceID.Back]] = null;
    this.updateFaceTemplates();
  }


  updateCSS() : void {
    let cube = document.getElementsByClassName("f3d-cube")[0];

    const {x, y, z, w} = this.q;

    const m11 = 1 - 2*y*y - 2*z*z;
    const m12 = 2*x*y - 2*z*w;
    const m13 = 2*x*z + 2*y*w;

    const m21 = 2*x*y + 2*z*w;
    const m22 = 1 - 2*x*x - 2*z*z;
    const m23 = 2*y*z - 2*x*w;

    const m31 = 2*x*z - 2*y*w;
    const m32 = 2*y*z + 2*x*w;
    const m33 = 1 - 2*x*x - 2*y*y;

    (cube as HTMLElement).style.setProperty('--m11', m11.toString());
    (cube as HTMLElement).style.setProperty('--m12', m12.toString());
    (cube as HTMLElement).style.setProperty('--m13', m13.toString());
    (cube as HTMLElement).style.setProperty('--m21', m21.toString());
    (cube as HTMLElement).style.setProperty('--m22', m22.toString());
    (cube as HTMLElement).style.setProperty('--m23', m23.toString());
    (cube as HTMLElement).style.setProperty('--m31', m31.toString());
    (cube as HTMLElement).style.setProperty('--m32', m32.toString());
    (cube as HTMLElement).style.setProperty('--m33', m33.toString());
  }

  applyLocalRotation(axis: [number, number, number], deg: number) : void {
    const r = fromAxisAngle(axis, deg);
    this.q = normalizeQ(mulQ(this.q, r)); // IMPORTANT: q <- q * r (local)
    this.updateCSS();
    // Update currentFaces
    this.updateFaceTemplates();
  }

  go(direction: 'up' | 'down' | 'left' | 'right') : void {
    if (!this.currentFace) return;
    let axis: [number, number, number];
    let deg: number;
    let nextFace: FaceTemplate;
    switch (direction) {
      case 'up':
        if (!this.faceTemplates[this.currentFace.up]) return;
        nextFace = this.faceTemplates[this.currentFace.up];
        axis = [1, 0, 0];
        deg = 90;
        break;
      case 'down':
        if (!this.faceTemplates[this.currentFace.down]) return;
        nextFace = this.faceTemplates[this.currentFace.down];
        axis = [1, 0, 0];
        deg = -90;
        break;
      case 'left':
        if (!this.faceTemplates[this.currentFace.left]) return;
        nextFace = this.faceTemplates[this.currentFace.left];
        axis = [0, 1, 0];
        deg = -90;
        break;
      case 'right':
        if (!this.faceTemplates[this.currentFace.right]) return;
        nextFace = this.faceTemplates[this.currentFace.right];
        axis = [0, 1, 0];
        deg = 90;
        break;
    }
    if (this.currentFace.callOnLeave) this.currentFace.callOnLeave();
    if (nextFace.callOnFocus) nextFace.callOnFocus();
    this.currentFace = nextFace;
    this.applyLocalRotation(axis, deg);
  }


  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    
    switch (e.key) {
      case "ArrowUp":    this.go('up'); break;
      case "ArrowDown":  this.go('down'); break;
      case "ArrowRight": this.go('right'); break;
      case "ArrowLeft":  this.go('left'); break;
    }
    
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.running = false;
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}