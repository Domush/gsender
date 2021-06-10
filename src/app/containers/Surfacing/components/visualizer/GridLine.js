/*
 * Copyright (C) 2021 Sienci Labs Inc.
 *
 * This file is part of gSender.
 *
 * gSender is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, under version 3 of the License.
 *
 * gSender is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with gSender.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Contact for information regarding this program and its license
 * can be sent through gSender@sienci.com or mailed to the main office
 * of Sienci Labs Inc. in Waterloo, Ontario, Canada.
 *
 */

import * as THREE from 'three';

class GridLine {
    group = new THREE.Object3D();

    colorCenterLine = new THREE.Color(0x444444);

    colorGrid = new THREE.Color(0x888888);

    constructor(sizeX, stepX, sizeY, stepY, colorCenterLine, colorGrid) {
        colorCenterLine = new THREE.Color(colorCenterLine) || this.colorCenterLine;
        colorGrid = new THREE.Color(colorGrid) || this.colorGrid;

        sizeY = (typeof sizeY === 'undefined') ? sizeX : sizeY;
        stepY = (typeof stepY === 'undefined') ? stepX : stepY;

        for (let i = -1 * sizeX; i <= sizeX; i += stepX) {
            const geometry = new THREE.Geometry();
            const material = new THREE.LineBasicMaterial({
                vertexColors: THREE.VertexColors
            });
            const color = (i === 0) ? colorCenterLine : colorGrid;

            geometry.vertices.push(
                new THREE.Vector3(-sizeX, i, 0),
                new THREE.Vector3(sizeX, i, 0),
            );
            geometry.colors.push(color, color);

            this.group.add(new THREE.Line(geometry, material));
        }

        for (let i = -1 * sizeY; i <= sizeY; i += stepY) {
            const geometry = new THREE.Geometry();
            const material = new THREE.LineBasicMaterial({
                vertexColors: THREE.VertexColors
            });
            const color = (i === 0) ? colorCenterLine : colorGrid;

            geometry.vertices.push(
                new THREE.Vector3(i, -sizeY, 0),
                new THREE.Vector3(i, sizeY, 0),
            );
            geometry.colors.push(color, color);

            this.group.add(new THREE.Line(geometry, material));
        }

        return this.group;
    }
}

export default GridLine;