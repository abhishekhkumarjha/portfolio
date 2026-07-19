import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeCanvasProps {
  activeSection: number;
  scrollPercent: number; // 0 to 100 overall
  activeProjectIndex: number | null;
}

export default function ThreeCanvas({
  activeSection,
  scrollPercent,
  activeProjectIndex,
}: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Use refs in the render loop to avoid re-initializing THREE on every prop change
  const stateRef = useRef({
    activeSection,
    scrollPercent,
    activeProjectIndex,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
  });

  // Synchronize dynamic state
  useEffect(() => {
    stateRef.current.activeSection = activeSection;
    stateRef.current.scrollPercent = scrollPercent;
    stateRef.current.activeProjectIndex = activeProjectIndex;
  }, [activeSection, scrollPercent, activeProjectIndex]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Standard Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080605, 0.08);

    // Initial size from container
    let width = container.clientWidth;
    let height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights - Americas Warm Sunset Sand
    const ambientLight = new THREE.AmbientLight(0x22130c, 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xff6f59, 2.8); // Molten Terracotta
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffd166, 2.2); // Warm Golden
    dirLight2.position.set(-5, -5, 5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xe5ba73, 3, 10); // Amber core light
    scene.add(pointLight);

    // --- 3D Objects Setup ---

    // 1. Starfield / Floating Particles
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    const colorGold = new THREE.Color(0xffd166);
    const colorTerracotta = new THREE.Color(0xff6f59);
    const colorDust = new THREE.Color(0x503b31); // dark charcoal dust

    for (let i = 0; i < particleCount; i++) {
      // Spheroid distribution
      const r = 5 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const px = r * Math.sin(phi) * Math.cos(theta);
      const py = r * Math.sin(phi) * Math.sin(theta);
      const pz = r * Math.cos(phi);

      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;

      originalPositions[i * 3] = px;
      originalPositions[i * 3 + 1] = py;
      originalPositions[i * 3 + 2] = pz;

      // Color variation
      let mixedColor = colorDust;
      const rand = Math.random();
      if (rand > 0.6) {
        mixedColor = colorGold;
      } else if (rand > 0.3) {
        mixedColor = colorTerracotta;
      }

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom glow circular point texture using canvas
    const createCircleTexture = () => {
      const size = 16;
      const canvasMat = document.createElement("canvas");
      canvasMat.width = size;
      canvasMat.height = size;
      const ctx = canvasMat.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(
          size / 2, size / 2, 0,
          size / 2, size / 2, size / 2
        );
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.2, "rgba(255,111,89,0.8)"); // sunset terracotta glow
        gradient.addColorStop(0.5, "rgba(229,186,115,0.2)"); // gold amber halo
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
      }
      return new THREE.CanvasTexture(canvasMat);
    };

    const particleMat = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      map: createCircleTexture(),
      blending: THREE.AdditiveBlending,
    });

    const starParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(starParticles);

    // 2. Central Core / Torus Knot (Main Hero Mesh)
    const coreGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 120, 16);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1a120b, // Obsidian walnut
      emissive: 0x2d1a0e, // warm embers
      roughness: 0.2,
      metalness: 0.9,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Glowing outer cage
    const cageGeo = new THREE.IcosahedronGeometry(2, 2);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0xffb703, // Amber gold cage
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    scene.add(cageMesh);

    // 3. Experience Nodes Group
    const expGroup = new THREE.Group();
    scene.add(expGroup);

    const expNodes: THREE.Mesh[] = [];
    const expDetails = [
      { color: 0xffd166, pos: new THREE.Vector3(-2.5, 1, -1) }, // Solar Gold
      { color: 0xff6f59, pos: new THREE.Vector3(0, -1.5, -0.5) }, // Sunset Terracotta
      { color: 0xf4f1de, pos: new THREE.Vector3(2.5, 1, -1) }, // Desert Champagne
    ];

    expDetails.forEach((details) => {
      // Sphere
      const sphereGeo = new THREE.SphereGeometry(0.4, 32, 32);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: details.color,
        emissive: details.color,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8,
      });
      const node = new THREE.Mesh(sphereGeo, sphereMat);
      node.position.copy(details.pos);
      expGroup.add(node);
      expNodes.push(node);

      // Orbital wire around each node
      const ringGeo = new THREE.RingGeometry(0.6, 0.65, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: details.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      node.add(ring);
    });

    // Glowing connection lines for experience
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffb703, // amber golden link
      transparent: true,
      opacity: 0.4,
    });
    const linePoints: THREE.Vector3[] = [
      expDetails[0].pos,
      new THREE.Vector3(0, 0, 0),
      expDetails[1].pos,
      new THREE.Vector3(0, 0, 0),
      expDetails[2].pos,
    ];
    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const expLines = new THREE.Line(lineGeo, lineMaterial);
    scene.add(expLines);

    // 4. Projects Geometries Group
    const projGroup = new THREE.Group();
    scene.add(projGroup);

    const projMeshes: THREE.Group[] = [];
    const projColors = [0xffd166, 0xff6f59, 0x60a5fa, 0x34d399, 0xc084fc, 0x22d3ee]; // Yellow, Terracotta, Blue, Emerald, Purple, Cyan

    // Dynamic positioning helper for 6 projects
    const getProjPos = (idx: number) => {
      const x = -3.75 + idx * 1.5;
      const y = idx % 2 === 0 ? 1.5 : -1.8;
      const z = idx % 2 === 0 ? -2 : -1.8;
      return new THREE.Vector3(x, y, z);
    };

    // Project 1 Shape: Compliance Checker - Document scroll mesh
    const proj1Group = new THREE.Group();
    const docGrid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 1.2, 16, 4, true),
      new THREE.MeshStandardMaterial({
        color: projColors[0],
        wireframe: true,
        emissive: projColors[0],
        emissiveIntensity: 0.5,
      })
    );
    proj1Group.add(docGrid);
    proj1Group.position.copy(getProjPos(0));
    projGroup.add(proj1Group);
    projMeshes.push(proj1Group);

    // Project 2 Shape: SecureMind AI - Icosahedron inside custom shield
    const proj2Group = new THREE.Group();
    const brainMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.6, 1),
      new THREE.MeshStandardMaterial({
        color: projColors[1],
        wireframe: true,
        emissive: projColors[1],
        emissiveIntensity: 0.6,
      })
    );
    const shieldMesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.9, 0),
      new THREE.MeshBasicMaterial({
        color: projColors[1],
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      })
    );
    proj2Group.add(brainMesh);
    proj2Group.add(shieldMesh);
    proj2Group.position.copy(getProjPos(1));
    projGroup.add(proj2Group);
    projMeshes.push(proj2Group);

    // Project 3 Shape: Hollow Socks - Torus / ring of points (sock loop shape)
    const proj3Group = new THREE.Group();
    const torusMesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.55, 0.22, 8, 24),
      new THREE.MeshStandardMaterial({
        color: projColors[2],
        wireframe: true,
        emissive: projColors[2],
        emissiveIntensity: 0.5,
      })
    );
    proj3Group.add(torusMesh);
    proj3Group.position.copy(getProjPos(2));
    projGroup.add(proj3Group);
    projMeshes.push(proj3Group);

    // Project 4 Shape: PlumPlay UK - Cone / double helix structure
    const proj4Group = new THREE.Group();
    const coneMesh = new THREE.Mesh(
      new THREE.ConeGeometry(0.55, 1.1, 8, 4, true),
      new THREE.MeshStandardMaterial({
        color: projColors[3],
        wireframe: true,
        emissive: projColors[3],
        emissiveIntensity: 0.5,
      })
    );
    proj4Group.add(coneMesh);
    proj4Group.position.copy(getProjPos(3));
    projGroup.add(proj4Group);
    projMeshes.push(proj4Group);

    // Project 5 Shape: Dash into Learning - Dodecahedron with outer ring
    const proj5Group = new THREE.Group();
    const dodecaMesh = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.55),
      new THREE.MeshStandardMaterial({
        color: projColors[4],
        wireframe: true,
        emissive: projColors[4],
        emissiveIntensity: 0.5,
      })
    );
    const ringMesh5 = new THREE.Mesh(
      new THREE.TorusGeometry(0.8, 0.015, 8, 32),
      new THREE.MeshBasicMaterial({ color: projColors[4], transparent: true, opacity: 0.4 })
    );
    proj5Group.add(dodecaMesh);
    proj5Group.add(ringMesh5);
    proj5Group.position.copy(getProjPos(4));
    projGroup.add(proj5Group);
    projMeshes.push(proj5Group);

    // Project 6 Shape: Vitamin H2 - Sphere with horizontal rings
    const proj6Group = new THREE.Group();
    const sphereMesh6 = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 12, 12),
      new THREE.MeshStandardMaterial({
        color: projColors[5],
        wireframe: true,
        emissive: projColors[5],
        emissiveIntensity: 0.5,
      })
    );
    const ringMesh6 = new THREE.Mesh(
      new THREE.TorusGeometry(0.75, 0.015, 8, 32),
      new THREE.MeshBasicMaterial({ color: projColors[5], transparent: true, opacity: 0.4 })
    );
    ringMesh6.rotation.x = Math.PI / 2;
    proj6Group.add(sphereMesh6);
    proj6Group.add(ringMesh6);
    proj6Group.position.copy(getProjPos(5));
    projGroup.add(proj6Group);
    projMeshes.push(proj6Group);


    // Handle Resize strictly using ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const entry = entries[0];
      const { width: newWidth, height: newHeight } = entry.contentRect;

      width = newWidth;
      height = newHeight || 300; // fallback

      camera.aspect = width / height;

      // Adjust FOV for smaller layouts dynamically so 3D remains visible and nice
      if (width < 640) {
        camera.fov = 75;
      } else if (width < 1024) {
        camera.fov = 65;
      } else {
        camera.fov = 55;
      }

      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    resizeObserver.observe(container);

    // Track Mouse Pointer for Parallax tilting
    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / width) * 2 - 1;
      const y = -((event.clientY - rect.top) / height) * 2 + 1;
      stateRef.current.targetMouseX = x * 0.5;
      stateRef.current.targetMouseY = y * 0.5;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const state = stateRef.current;

      // Smooth mouse lerp
      state.mouseX += (state.targetMouseX - state.mouseX) * 0.08;
      state.mouseY += (state.targetMouseY - state.mouseY) * 0.08;

      // Rotate starfield slowly
      starParticles.rotation.y = elapsedTime * 0.02 + state.scrollPercent * 0.001;
      starParticles.rotation.x = elapsedTime * 0.005;

      // Gentle movement on particles to look organic
      const positionsArray = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const offset = i * 3;
        // Wave ripple depending on elapsed time & position
        const oy = originalPositions[offset + 1];
        positionsArray[offset + 1] = oy + Math.sin(elapsedTime * 0.8 + originalPositions[offset]) * 0.15;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Base rotation for Central Core
      coreMesh.rotation.y = elapsedTime * 0.15;
      coreMesh.rotation.x = elapsedTime * 0.07;
      cageMesh.rotation.y = -elapsedTime * 0.05;

      // Rotate Project shapes
      projMeshes.forEach((mesh, index) => {
        mesh.rotation.y = elapsedTime * 0.3 + index * 10;
        mesh.rotation.x = elapsedTime * 0.1 + index * 5;

        // Pulse projects based on mouse selection
        let targetScale = 0.8;
        if (state.activeSection === 2) {
          if (state.activeProjectIndex === index) {
            targetScale = 1.35;
          } else if (state.activeProjectIndex !== null) {
            targetScale = 0.45; // shrink others
          } else {
            targetScale = 0.95; // default active screen scale
          }
        } else {
          targetScale = 0.1; // hide or push away when not in projects
        }

        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      });

      // Experience group actions
      expNodes.forEach((node, idx) => {
        // Floating motion
        node.position.y = expDetails[idx].pos.y + Math.sin(elapsedTime * 1.5 + idx) * 0.15;
        node.rotation.y = elapsedTime * 0.5;
      });

      // Animate PointLight color depending on section
      let targetLightColor = new THREE.Color(0xffb703);
      if (state.activeSection === 0) {
        targetLightColor.setHex(0xff6f59); // Hero: Sunset Terracotta
      } else if (state.activeSection === 1) {
        targetLightColor.setHex(0xffd166); // Experience: Warm Golden
      } else if (state.activeSection === 2) {
        if (state.activeProjectIndex !== null) {
          targetLightColor.setHex(projColors[state.activeProjectIndex]);
        } else {
          targetLightColor.setHex(0xca8a04); // Projects: Deep Brass
        }
      } else if (state.activeSection === 3) {
        targetLightColor.setHex(0xffb703); // Skills: Gold Amber
      } else {
        targetLightColor.setHex(0xff6f59); // Contact: Metallic Clay
      }
      pointLight.color.lerp(targetLightColor, 0.05);

      // Camera positions & lookup target paths depending on current section
      let targetCamX = 0;
      let targetCamY = 0;
      let targetCamZ = 6;
      let targetLookAt = new THREE.Vector3(0, 0, 0);

      // Layout animations for sections
      if (state.activeSection === 0) {
        // Section 1: Hero
        targetCamX = state.mouseX * 1.5;
        targetCamY = state.mouseY * 1.5;
        targetCamZ = 5.2 - (state.scrollPercent * 0.01);
        coreMesh.visible = true;
        cageMesh.visible = true;
        expGroup.visible = false;
        expLines.visible = false;
        projGroup.visible = false;
      } else if (state.activeSection === 1) {
        // Section 2: Experience
        targetCamX = state.mouseX * 1.2;
        targetCamY = 0.5 + state.mouseY * 1.2;
        targetCamZ = 5.8;
        coreMesh.visible = true;
        cageMesh.visible = true;
        expGroup.visible = true;
        expLines.visible = true;
        projGroup.visible = false;

        // Shrink the core mesh to let nodes stand out
        const coreS = 0.45;
        coreMesh.scale.lerp(new THREE.Vector3(coreS, coreS, coreS), 0.08);
        cageMesh.scale.lerp(new THREE.Vector3(0.5, 0.5, 0.5), 0.08);

        // Slide core out an offset
        coreMesh.position.lerp(new THREE.Vector3(0, 0, -1), 0.08);
        cageMesh.position.lerp(new THREE.Vector3(0, 0, -1), 0.08);
      } else if (state.activeSection === 2) {
        // Section 3: Projects
        // Focus strongly on project objects
        coreMesh.visible = false;
        cageMesh.visible = false;
        expGroup.visible = false;
        expLines.visible = false;
        projGroup.visible = true;

        targetCamZ = 4.8;
        if (state.activeProjectIndex !== null) {
          const focusedPos = projMeshes[state.activeProjectIndex].position;
          // Zoom towards project camera path
          targetCamX = focusedPos.x * 0.8 + state.mouseX * 0.6;
          targetCamY = focusedPos.y * 0.8 + state.mouseY * 0.6;
          targetLookAt.copy(focusedPos);
        } else {
          targetCamX = state.mouseX * 1.0;
          targetCamY = state.mouseY * 1.0;
        }
      } else if (state.activeSection === 3) {
        // Section 4: Skills - particles helix whirlpool
        coreMesh.visible = true;
        cageMesh.visible = true;
        expGroup.visible = false;
        expLines.visible = false;
        projGroup.visible = false;

        coreMesh.position.set(0, 0, 0);
        cageMesh.position.set(0, 0, 0);

        const sScale = 0.8 + Math.sin(elapsedTime * 2) * 0.1;
        coreMesh.scale.lerp(new THREE.Vector3(sScale, sScale, sScale), 0.08);
        cageMesh.scale.lerp(new THREE.Vector3(sScale * 1.4, sScale * 1.4, sScale * 1.4), 0.08);

        targetCamX = Math.sin(elapsedTime * 0.25) * 1.5 + state.mouseX;
        targetCamY = state.mouseY * 1.5;
        targetCamZ = 6.4;

        // Custom morph particles to form vertical helix/tornado in skills
        for (let i = 0; i < particleCount; i++) {
          const offset = i * 3;
          const origX = originalPositions[offset];
          const origZ = originalPositions[offset + 2];
          // Spiral factors
          const tHeight = originalPositions[offset + 1];
          const spiralAngle = tHeight * 0.8 + elapsedTime * 1.0;
          const radius = 2.2 + Math.sin(tHeight * 0.4) * 0.5;

          // Target helix coords
          const tx = Math.cos(spiralAngle) * radius;
          const tz = Math.sin(spiralAngle) * radius;

          // Lerp original sphere coords into helix coords
          positionsArray[offset] = THREE.MathUtils.lerp(positionsArray[offset], tx, 0.05);
          positionsArray[offset + 2] = THREE.MathUtils.lerp(positionsArray[offset + 2], tz, 0.05);
        }
      } else {
        // Section 5: Certifications & Contact: Particles form infinite Saturn ring
        coreMesh.visible = true;
        cageMesh.visible = true;
        expGroup.visible = false;
        expLines.visible = false;
        projGroup.visible = false;

        const sScale = 1.1;
        coreMesh.scale.lerp(new THREE.Vector3(sScale, sScale, sScale), 0.08);
        cageMesh.scale.lerp(new THREE.Vector3(sScale * 1.3, sScale * 1.3, sScale * 1.3), 0.08);

        targetCamX = state.mouseX * 0.8;
        targetCamY = state.mouseY * 0.8;
        targetCamZ = 3.6; // Get close into the ring

        // Morph particles to flat ring
        for (let i = 0; i < particleCount; i++) {
          const offset = i * 3;
          const angle = Math.atan2(originalPositions[offset + 2], originalPositions[offset]);
          const dist = 3.0 + (Math.abs(originalPositions[offset + 1]) * 0.6); // ring radius
          const tx = Math.cos(angle + elapsedTime * 0.05) * dist;
          const ty = (Math.random() - 0.5) * 0.08; // extremely thin on y
          const tz = Math.sin(angle + elapsedTime * 0.05) * dist;

          positionsArray[offset] = THREE.MathUtils.lerp(positionsArray[offset], tx, 0.06);
          positionsArray[offset + 1] = THREE.MathUtils.lerp(positionsArray[offset + 1], ty, 0.06);
          positionsArray[offset + 2] = THREE.MathUtils.lerp(positionsArray[offset + 2], tz, 0.06);
        }
      }

      // Restore core positions back when returning to 0 Hero
      if (state.activeSection === 0) {
        const resetScale = 1.0;
        coreMesh.scale.lerp(new THREE.Vector3(resetScale, resetScale, resetScale), 0.08);
        cageMesh.scale.lerp(new THREE.Vector3(resetScale, resetScale, resetScale), 0.08);
        coreMesh.position.lerp(new THREE.Vector3(0, 0, 0), 0.08);
        cageMesh.position.lerp(new THREE.Vector3(0, 0, 0), 0.08);

        // Put particles back to spherical distribution easily
        for (let i = 0; i < particleCount; i++) {
          const offset = i * 3;
          positionsArray[offset] = THREE.MathUtils.lerp(positionsArray[offset], originalPositions[offset], 0.04);
          positionsArray[offset + 1] = THREE.MathUtils.lerp(positionsArray[offset + 1], originalPositions[offset + 1], 0.04);
          positionsArray[offset + 2] = THREE.MathUtils.lerp(positionsArray[offset + 2], originalPositions[offset + 2], 0.04);
        }
      }

      // Smooth camera interpolation
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;

      // Make camera look smoothly at target
      const currentLookAt = new THREE.Vector3(0, 0, 0);
      currentLookAt.lerp(targetLookAt, 0.1);
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      // Dispose materials & geometries
      particleGeo.dispose();
      particleMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      expNodes.forEach((node) => {
        node.geometry.dispose();
        if (Array.isArray(node.material)) {
          node.material.forEach((m) => m.dispose());
        } else {
          node.material.dispose();
        }
      });
      docGrid.geometry.dispose();
      (docGrid.material as THREE.Material).dispose();
      brainMesh.geometry.dispose();
      (brainMesh.material as THREE.Material).dispose();
      shieldMesh.geometry.dispose();
      (shieldMesh.material as THREE.Material).dispose();
      torusMesh.geometry.dispose();
      (torusMesh.material as THREE.Material).dispose();
      coneMesh.geometry.dispose();
      (coneMesh.material as THREE.Material).dispose();
      dodecaMesh.geometry.dispose();
      (dodecaMesh.material as THREE.Material).dispose();
      ringMesh5.geometry.dispose();
      (ringMesh5.material as THREE.Material).dispose();
      sphereMesh6.geometry.dispose();
      (sphereMesh6.material as THREE.Material).dispose();
      ringMesh6.geometry.dispose();
      (ringMesh6.material as THREE.Material).dispose();
      lineGeo.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      style={{ minHeight: "300px" }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block bg-[#080605] transition-colors duration-1000"
      />
    </div>
  );
}
