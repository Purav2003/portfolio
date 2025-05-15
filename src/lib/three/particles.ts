import * as THREE from "three";

export const initParticles = (container: HTMLElement) => {
  // Scene setup
  const scene = new THREE.Scene();
  
  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 2;
  
  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  
  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 2000;
  
  const posArray = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
  }
  
  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );
  
  // Materials
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0x3B82F6, // Primary color
    transparent: true,
    blending: THREE.AdditiveBlending
  });
  
  // Mesh
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
  
  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;
  
  const handleMouseMove = (event: MouseEvent) => {
    mouseX = (event.clientX - window.innerWidth / 2) / 100;
    mouseY = (event.clientY - window.innerHeight / 2) / 100;
  };
  
  document.addEventListener("mousemove", handleMouseMove);
  
  // Handle window resize
  const handleResize = () => {
    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };
  
  window.addEventListener("resize", handleResize);
  
  // Animation loop
  let animationFrameId: number;
  
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    
    // Rotate particles
    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.001;
    
    // Mouse interaction
    if (mouseX && mouseY) {
      particlesMesh.rotation.x += mouseY * 0.0003;
      particlesMesh.rotation.y += mouseX * 0.0003;
    }
    
    renderer.render(scene, camera);
  };
  
  animate();
  
  // Cleanup function
  return () => {
    window.removeEventListener("resize", handleResize);
    document.removeEventListener("mousemove", handleMouseMove);
    cancelAnimationFrame(animationFrameId);
    container.removeChild(renderer.domElement);
    
    // Dispose resources
    particlesGeometry.dispose();
    particlesMaterial.dispose();
    renderer.dispose();
  };
};
