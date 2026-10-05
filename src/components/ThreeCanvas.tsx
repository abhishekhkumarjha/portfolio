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

    // Lights
    const ambientLight = new THREE.AmbientLight(0x22130c, 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xff6f59, 2.8);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffd166, 2.2);
    dirLight2.position.set(-5, -5, 5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xe5ba73, 3, 10);
    scene.add(pointLight);

    // 1. Starfield / Floating Particles
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    const colorGold = new THREE.Color(0xffd166);
    const colorTerracotta = new THREE.Color(0xff6f59);
    const colorDust = new THREE.Color(0x503b31);

    for (let i = 0; i < particleCount; i++) {
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
        gradient.addColorStop(0.2, "rgba(255,111,89,0.8)");
        gradient.addColorStop(0.5, "rgba(229,186,115,0.2)");
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

    // 2. Central Core / Torus Knot
    const coreGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 120, 16);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1a120b,
      emissive: 0x2d1a0e,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    const cageGeo = new THREE.IcosahedronGeometry(2, 2);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0xffb703,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    scene.add(cageMesh);

    // 3. Experience Nodes Group (5 nodes matching 5 roles)
    const expGroup = new THREE.Group();
    scene.add(expGroup);

    const expNodes: THREE.Mesh[] = [];
    const expDetails = [
      { color: 0xffd166, pos: new THREE.Vector3(-2.8, 1.2, -1) }, // Cloudinntech AI/ML (Gold)
      { color: 0x34d399, pos: new THREE.Vector3(-1.4, -1.2, -0.6) }, // Cloudinntech Cyber (Emerald)
      { color: 0xff6f59, pos: new THREE.Vector3(0, 1.2, -0.8) }, // Infosys (Terracotta)
      { color: 0x60a5fa, pos: new THREE.Vector3(1.4, -1.0, -0.6) }, // Salesforce (Blue)
      { color: 0xc084fc, pos: new THREE.Vector3(2.8, 1.0, -1) }, // J&J MedTech (Purple)
    ];

    expDetails.forEach((details) => {
      const sphereGeo = new THREE.SphereGeometry(0.35, 32, 32);
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

      const ringGeo = new THREE.RingGeometry(0.55, 0.6, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: details.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      node.add(ring);
    });

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffb703,
      transparent: true,
      opacity: 0.35,
    });
    const linePoints: THREE.Vector3[] = expDetails.map(d => d.pos);
    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const expLines = new THREE.Line(lineGeo, lineMaterial);
    scene.add(expLines);

    // 4. Projects Geometries Group (4 projects from resume)
    const projGroup = new THREE.Group();
    scene.add(projGroup);

    const projMeshes: THREE.Group[] = [];
    const projColors = [0xffd166, 0xff6f59, 0x34d399, 0x38bdf8]; // Gold, Terracotta, Emerald, Cyan

    const getProjPos = (idx: number) => {
      switch (idx) {
        case 0:
          return new THREE.Vector3(-2.8, 0.3, -1.6);
        case 1:
          return new THREE.Vector3(-0.9, -0.4, -1.4);
        case 2:
          return new THREE.Vector3(0.9, 0.3, -1.4);
        case 3:
          return new THREE.Vector3(2.8, -0.4, -1.6);
        default:
          return new THREE.Vector3(0, 0, -2);
      }
    };

    // Project 1: Compliance Checker - Document Cylinder + scan ring
    const proj1Group = new THREE.Group();
    const docGrid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 1.2, 16, 4, true),
      new THREE.MeshStandardMaterial({
        color: projColors[0],
        wireframe: true,
        emissive: projColors[0],
        emissiveIntensity: 0.6,
      })
    );
    const scanRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.65, 0.02, 8, 32),
      new THREE.MeshBasicMaterial({ color: 0xffe066, transparent: true, opacity: 0.6 })
    );
    scanRing.rotation.x = Math.PI / 2;
    proj1Group.add(docGrid);
    proj1Group.add(scanRing);
    proj1Group.position.copy(getProjPos(0));
    projGroup.add(proj1Group);
    projMeshes.push(proj1Group);

    // Project 2: SecureMind AI - Icosahedron + Octahedron shield
    const proj2Group = new THREE.Group();
    const brainMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.6, 1),
      new THREE.MeshStandardMaterial({
        color: projColors[1],
        wireframe: true,
        emissive: projColors[1],
        emissiveIntensity: 0.7,
      })
    );
    const shieldMesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.95, 0),
      new THREE.MeshBasicMaterial({
        color: projColors[1],
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      })
    );
    proj2Group.add(brainMesh);
    proj2Group.add(shieldMesh);
    proj2Group.position.copy(getProjPos(1));
    projGroup.add(proj2Group);
    projMeshes.push(proj2Group);

    // Project 3: Antigena AI Defense System - Cyber Defense Dodecahedron + Shield Perimeter
    const proj3Group = new THREE.Group();
    const cyberNode = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.55),
      new THREE.MeshStandardMaterial({
        color: projColors[2],
        wireframe: true,
        emissive: projColors[2],
        emissiveIntensity: 0.6,
      })
    );
    const perimeterRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.85, 0.02, 8, 32),
      new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.5 })
    );
    perimeterRing.rotation.x = Math.PI / 4;
    proj3Group.add(cyberNode);
    proj3Group.add(perimeterRing);
    proj3Group.position.copy(getProjPos(2));
    projGroup.add(proj3Group);
    projMeshes.push(proj3Group);

    // Project 4: OceanGuardian - Oceanic Globe + Radar rings
    const proj4Group = new THREE.Group();
    const globeMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.6, 16, 16),
      new THREE.MeshStandardMaterial({
        color: projColors[3],
        wireframe: true,
        emissive: projColors[3],
        emissiveIntensity: 0.6,
      })
    );
    const radarRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(0.85, 0.02, 8, 32),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5 })
    );
    radarRing1.rotation.x = Math.PI / 3;

    const radarRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.0, 0.015, 8, 32),
      new THREE.MeshBasicMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.4 })
    );
    radarRing2.rotation.y = Math.PI / 4;

    proj4Group.add(globeMesh);
    proj4Group.add(radarRing1);
    proj4Group.add(radarRing2);
    proj4Group.position.copy(getProjPos(3));
    projGroup.add(proj4Group);
    projMeshes.push(proj4Group);

    // ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const entry = entries[0];
      const { width: newWidth, height: newHeight } = entry.contentRect;

      width = newWidth;
      height = newHeight || 300;

      camera.aspect = width / height;

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

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / width) * 2 - 1;
      const y = -((event.clientY - rect.top) / height) * 2 + 1;
      stateRef.current.targetMouseX = x * 0.5;
      stateRef.current.targetMouseY = y * 0.5;
    };

    window.addEventListener("mousemove", onMouseMove);

    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const state = stateRef.current;

      state.mouseX += (state.targetMouseX - state.mouseX) * 0.08;
      state.mouseY += (state.targetMouseY - state.mouseY) * 0.08;

      starParticles.rotation.y = elapsedTime * 0.02 + state.scrollPercent * 0.001;
      starParticles.rotation.x = elapsedTime * 0.005;

      const positionsArray = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const offset = i * 3;
        const oy = originalPositions[offset + 1];
        positionsArray[offset + 1] = oy + Math.sin(elapsedTime * 0.8 + originalPositions[offset]) * 0.15;
      }
      particleGeo.attributes.position.needsUpdate = true;

      coreMesh.rotation.y = elapsedTime * 0.15;
      coreMesh.rotation.x = elapsedTime * 0.07;
      cageMesh.rotation.y = -elapsedTime * 0.05;

      // Rotate Project shapes
      projMeshes.forEach((mesh, index) => {
        mesh.rotation.y = elapsedTime * 0.35 + index * 10;
        mesh.rotation.x = elapsedTime * 0.12 + index * 5;

        if (index === 0) {
          scanRing.position.y = Math.sin(elapsedTime * 2) * 0.45;
        } else if (index === 2) {
          perimeterRing.rotation.z = elapsedTime * 0.4;
        } else if (index === 3) {
          radarRing1.rotation.z = elapsedTime * 0.5;
          radarRing2.rotation.x = elapsedTime * 0.3;
        }

        let targetScale = 0.85;
        if (state.activeSection === 2) {
          if (state.activeProjectIndex === index) {
            targetScale = 1.4;
          } else if (state.activeProjectIndex !== null) {
            targetScale = 0.55;
          } else {
            targetScale = 1.0;
          }
        } else {
          targetScale = 0.1;
        }

        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      });

      expNodes.forEach((node, idx) => {
        node.position.y = expDetails[idx].pos.y + Math.sin(elapsedTime * 1.5 + idx) * 0.15;
        node.rotation.y = elapsedTime * 0.5;
      });

      let targetLightColor = new THREE.Color(0xffb703);
      if (state.activeSection === 0) {
        targetLightColor.setHex(0xff6f59);
      } else if (state.activeSection === 1) {
        targetLightColor.setHex(0xffd166);
      } else if (state.activeSection === 2) {
        if (state.activeProjectIndex !== null && projColors[state.activeProjectIndex]) {
          targetLightColor.setHex(projColors[state.activeProjectIndex]);
        } else {
          targetLightColor.setHex(0xca8a04);
        }
      } else if (state.activeSection === 3) {
        targetLightColor.setHex(0xffb703);
      } else {
        targetLightColor.setHex(0xff6f59);
      }
      pointLight.color.lerp(targetLightColor, 0.05);

      let targetCamX = 0;
      let targetCamY = 0;
      let targetCamZ = 6;
      let targetLookAt = new THREE.Vector3(0, 0, 0);

      if (state.activeSection === 0) {
        // Hero
        targetCamX = state.mouseX * 1.5;
        targetCamY = state.mouseY * 1.5;
        targetCamZ = 5.2 - (state.scrollPercent * 0.01);
        coreMesh.visible = true;
        cageMesh.visible = true;
        expGroup.visible = false;
        expLines.visible = false;
        projGroup.visible = false;
      } else if (state.activeSection === 1) {
        // Experience
        targetCamX = state.mouseX * 1.2;
        targetCamY = 0.5 + state.mouseY * 1.2;
        targetCamZ = 5.8;
        coreMesh.visible = true;
        cageMesh.visible = true;
        expGroup.visible = true;
        expLines.visible = true;
        projGroup.visible = false;

        const coreS = 0.45;
        coreMesh.scale.lerp(new THREE.Vector3(coreS, coreS, coreS), 0.08);
        cageMesh.scale.lerp(new THREE.Vector3(0.5, 0.5, 0.5), 0.08);
        coreMesh.position.lerp(new THREE.Vector3(0, 0, -1), 0.08);
        cageMesh.position.lerp(new THREE.Vector3(0, 0, -1), 0.08);
      } else if (state.activeSection === 2) {
        // Projects
        coreMesh.visible = false;
        cageMesh.visible = false;
        expGroup.visible = false;
        expLines.visible = false;
        projGroup.visible = true;

        targetCamZ = 5.0;
        if (state.activeProjectIndex !== null && projMeshes[state.activeProjectIndex]) {
          const focusedPos = projMeshes[state.activeProjectIndex].position;
          targetCamX = focusedPos.x * 0.8 + state.mouseX * 0.6;
          targetCamY = focusedPos.y * 0.8 + state.mouseY * 0.6;
          targetLookAt.copy(focusedPos);
        } else {
          targetCamX = state.mouseX * 1.0;
          targetCamY = state.mouseY * 1.0;
        }
      } else if (state.activeSection === 3) {
        // Skills
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

        for (let i = 0; i < particleCount; i++) {
          const offset = i * 3;
          const tHeight = originalPositions[offset + 1];
          const spiralAngle = tHeight * 0.8 + elapsedTime * 1.0;
          const radius = 2.2 + Math.sin(tHeight * 0.4) * 0.5;

          const tx = Math.cos(spiralAngle) * radius;
          const tz = Math.sin(spiralAngle) * radius;

          positionsArray[offset] = THREE.MathUtils.lerp(positionsArray[offset], tx, 0.05);
          positionsArray[offset + 2] = THREE.MathUtils.lerp(positionsArray[offset + 2], tz, 0.05);
        }
      } else {
        // Certifications & Contact
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
        targetCamZ = 3.6;

        for (let i = 0; i < particleCount; i++) {
          const offset = i * 3;
          const angle = Math.atan2(originalPositions[offset + 2], originalPositions[offset]);
          const dist = 3.0 + (Math.abs(originalPositions[offset + 1]) * 0.6);
          const tx = Math.cos(angle + elapsedTime * 0.05) * dist;
          const ty = (Math.random() - 0.5) * 0.08;
          const tz = Math.sin(angle + elapsedTime * 0.05) * dist;

          positionsArray[offset] = THREE.MathUtils.lerp(positionsArray[offset], tx, 0.06);
          positionsArray[offset + 1] = THREE.MathUtils.lerp(positionsArray[offset + 1], ty, 0.06);
          positionsArray[offset + 2] = THREE.MathUtils.lerp(positionsArray[offset + 2], tz, 0.06);
        }
      }

      if (state.activeSection === 0) {
        const resetScale = 1.0;
        coreMesh.scale.lerp(new THREE.Vector3(resetScale, resetScale, resetScale), 0.08);
        cageMesh.scale.lerp(new THREE.Vector3(resetScale, resetScale, resetScale), 0.08);
        coreMesh.position.lerp(new THREE.Vector3(0, 0, 0), 0.08);
        cageMesh.position.lerp(new THREE.Vector3(0, 0, 0), 0.08);

        for (let i = 0; i < particleCount; i++) {
          const offset = i * 3;
          positionsArray[offset] = THREE.MathUtils.lerp(positionsArray[offset], originalPositions[offset], 0.04);
          positionsArray[offset + 1] = THREE.MathUtils.lerp(positionsArray[offset + 1], originalPositions[offset + 1], 0.04);
          positionsArray[offset + 2] = THREE.MathUtils.lerp(positionsArray[offset + 2], originalPositions[offset + 2], 0.04);
        }
      }

      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;

      const currentLookAt = new THREE.Vector3(0, 0, 0);
      currentLookAt.lerp(targetLookAt, 0.1);
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
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
      scanRing.geometry.dispose();
      (scanRing.material as THREE.Material).dispose();
      brainMesh.geometry.dispose();
      (brainMesh.material as THREE.Material).dispose();
      shieldMesh.geometry.dispose();
      (shieldMesh.material as THREE.Material).dispose();
      cyberNode.geometry.dispose();
      (cyberNode.material as THREE.Material).dispose();
      perimeterRing.geometry.dispose();
      (perimeterRing.material as THREE.Material).dispose();
      globeMesh.geometry.dispose();
      (globeMesh.material as THREE.Material).dispose();
      radarRing1.geometry.dispose();
      (radarRing1.material as THREE.Material).dispose();
      radarRing2.geometry.dispose();
      (radarRing2.material as THREE.Material).dispose();
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
