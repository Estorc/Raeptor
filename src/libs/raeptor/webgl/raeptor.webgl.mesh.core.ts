import { vec2, vec3, vec4 } from "gl-matrix";
export type Vertex = [number, number, number, number];
export type Face = [Vertex, Vertex, Vertex];

export interface Mesh {
    vertices: Array<vec3>;
    normals: Array<vec3>;
    barycentric: Array<vec3>;
    uvs: Array<vec2>;
    faces: Array<Face>;
}

export interface HyperMesh {
    vertices: Array<vec4>;
    normals: Array<vec3>;
    barycentric: Array<vec3>;
    uvs: Array<vec2>;
    faces: Array<Face>;
}