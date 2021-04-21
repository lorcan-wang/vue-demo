import * as THREE from 'three'
import { Component } from 'vue'

/**
 * @type Component
 */
const three = {
    data() {
        return {
             
            /**
             * 场景
             * @type THREE.Scene
             */
            scene: null,
            
            /**
             * 相机
             * @type THREE.PerspectiveCamera
             */
            camera: null,
            // 渲染器
            renderer: null,
            // 物体
            cubes:null

        }
    },
    methods: {
        getThree() {
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color('#f6f6f6')
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(this.renderer.domElement);
            var geometry = new THREE.BoxGeometry(145, 20, 900);
            var material = new THREE.MeshPhongMaterial({color:'rgb(139,105,20)',aoMapIntensity:0.5});
            console.log(material)
            this.cube = new THREE.Mesh(geometry, material);
            console.log(this.cube)
            // this.cube.rotation.x = 0.51
            var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
            this.scene.add(directionalLight)
            this.scene.add(this.cube);
            
            // this.camera.position.z = 5;
            this.camera.position.set( 0, 0, 900 );
            // this.camera.lookAt( 0, 0, 0 );
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