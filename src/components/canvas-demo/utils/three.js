import * as THREE from 'three'
import { Component } from 'vue'
/**
 * @type Component
 */
const three = {
    data() {
        return {
            // 场景
            scene: null,
            // 相机
            camera: null,
            // 渲染器
            renderer: null,
            // 物体
            cube:null

        }
    },
    methods: {
        getThree() {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(this.renderer.domElement);
            var geometry = new THREE.BoxBufferGeometry(1, 1, 1);
            var material = new THREE.MeshBasicMaterial({ color: '#fff' });
            this.cube = new THREE.Mesh(geometry, material);
            this.scene.add(this.cube);
            this.camera.position.z = 5;
            this.animate()
        },
        animate() {
            requestAnimationFrame(this.animate);
            this.cube.rotation.x += 0.01;
            this.cube.rotation.y += 0.01;
            this.renderer.render(this.scene, this.camera);
        }
    }
}
export default three