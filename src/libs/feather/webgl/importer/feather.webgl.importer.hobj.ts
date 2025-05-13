import { HyperMesh, Face } from '@feather/webgl/feather.webgl.mesh.core';
import { vec2, vec3, vec4 } from 'gl-matrix';

export function parseHOBJ(data: string): HyperMesh {
    const vertices: Array<vec4> = [];
    const normals: Array<vec3> = [];
    const barycentric: Array<vec3> = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    const uvs: Array<vec2> = [];
    const faces: Array<Face> = [];

    const lines = data.split('\n');
    for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        switch (parts[0]) {
            case 'v':
                vertices.push([parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3]), parseFloat(parts[4])]);
                break;
            case 'vn':
                normals.push([parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])]);
                break;
            case 'vt':
                uvs.push([parseFloat(parts[1]), parseFloat(parts[2])]);
                break;
            case 'f':
                const faceVerts = parts.slice(1).map((p, i) => {
                    const [v, vt, vn] = p.split('/');
                    return [
                        parseInt(v) - 1,
                        vt ? parseInt(vt) - 1 : -1,
                        vn ? parseInt(vn) - 1 : -1,
                        i,
                    ] as [number, number, number, number];
                });

                for (let i = 1; i < faceVerts.length - 1; i++) {
                    const face: Face = [
                        faceVerts[0],
                        faceVerts[i],
                        faceVerts[i + 1],
                    ];
                    faces.push(face);
                }
                break;
        }
    }
    return { vertices, normals, barycentric, uvs, faces };
}