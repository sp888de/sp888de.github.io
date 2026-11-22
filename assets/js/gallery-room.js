const OUTER = 18;
const INNER = 12.2;
const HEIGHT = 6.2;
const OUTER_SLOTS = 36;
const INNER_SLOTS = 24;
const STEP = 2 * Math.PI / OUTER_SLOTS;
const TAU = 2 * Math.PI;
const ART_Y = 2.05;

export function createRoom(THREE, stage, artworks, onPick, onStepBack) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#191817');
  scene.fog = new THREE.Fog('#191817', 14, 41);
  const camera = new THREE.PerspectiveCamera(56, 1, 0.05, 70);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  function material(color, map = null, options = {}) {
    return new THREE.MeshBasicMaterial({ color, map, ...options });
  }

  function texture(size, paint) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    paint(canvas.getContext('2d'), size);
    const result = new THREE.CanvasTexture(canvas);
    result.colorSpace = THREE.SRGBColorSpace;
    return result;
  }

  function gradient(stops, radial = false) {
    return texture(256, (ctx, size) => {
      const midpoint = size / 2;
      const fill = radial
        ? ctx.createRadialGradient(midpoint, midpoint, 0, midpoint, midpoint, midpoint)
        : ctx.createLinearGradient(0, 0, 0, size);
      for (const [offset, color] of stops) fill.addColorStop(offset, color);
      ctx.fillStyle = fill;
      ctx.fillRect(0, 0, size, size);
    });
  }

  const walls = [];

  function addWall(radius, side, colors) {
    const wall = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, HEIGHT, 160, 1, true),
      material('#fff', gradient(colors), { side })
    );
    wall.position.y = HEIGHT / 2;
    scene.add(wall);
    walls.push(wall);
  }

  addWall(OUTER, THREE.BackSide, [[0, '#131212'], [.24, '#222120'], [.57, '#292827'], [.86, '#1e1d1c'], [1, '#141313']]);
  addWall(INNER, THREE.FrontSide, [[0, '#141313'], [.24, '#232221'], [.59, '#2c2b29'], [.86, '#201f1e'], [1, '#161514']]);

  const floor = new THREE.Mesh(new THREE.CircleGeometry(OUTER, 160), material('#fff', gradient([
    [0, '#1f1e1d'], [INNER / OUTER, '#161515'], [.82, '#292725'], [1, '#191817']
  ], true)));
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const ceiling = new THREE.Mesh(new THREE.CircleGeometry(OUTER, 160), material('#141313'));
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = HEIGHT;
  scene.add(ceiling);
  function addRing(inner, outer, y, color, faceDown) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(inner, outer, 160), material(color));
    ring.rotation.x = (faceDown ? 1 : -1) * Math.PI / 2;
    ring.position.y = y;
    scene.add(ring);
  }

  const lightTrack = OUTER - .85;
  addRing(lightTrack - .055, lightTrack + .055, HEIGHT - .026, '#3c3937', true);
  addRing(lightTrack - .028, lightTrack + .028, HEIGHT - .031, '#a6a09a', true);
  addRing(INNER, INNER + .045, .002, '#423e3b', false);
  addRing(OUTER - .045, OUTER, .002, '#423e3b', false);

  const shadow = gradient([[0, '#00000080'], [.46, '#00000063'], [.72, '#00000026'], [1, '#00000000']], true);
  const halo = gradient([[0, '#c6beaf59'], [.4, '#c6beaf3b'], [1, '#c6beaf00']], true);
  const frameMaterial = material('#4b4744');
  const matMaterial = material('#8e8982');
  const shadowMaterial = material('#fff', shadow, { transparent: true, depthWrite: false });
  const haloMaterial = material('#fff', halo, { transparent: true, depthWrite: false });
  const ray = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const targets = [];
  const loader = new THREE.TextureLoader();
  loader.setCrossOrigin('anonymous');

  function labelTexture(artwork, fontsReady = false) {
    return texture(512, (ctx) => {
      ctx.fillStyle = '#f5f4f0';
      ctx.font = fontsReady ? '34px Newsreader, Georgia' : '34px Georgia';
      ctx.fillText(artwork.name, 12, 51);
      ctx.fillStyle = '#c0bbb4';
      ctx.font = fontsReady ? '20px "DM Mono", monospace' : '20px monospace';
      ctx.fillText('GUNSTAR / VISUAL ARCHIVE', 12, 85);
    });
  }

  const artMaterials = artworks.map(artwork => {
    const art = material('#3a3836');
    loader.load(artwork.preview, map => {
      map.colorSpace = THREE.SRGBColorSpace;
      map.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      art.color.set('#fff');
      art.map = map;
      art.needsUpdate = true;
      requestFrame();
    });
    return { art, label: material('#fff', labelTexture(artwork), { transparent: true, depthWrite: false }) };
  });

  document.fonts.ready.then(() => {
    artMaterials.forEach(({ label }, index) => {
      label.map.dispose();
      label.map = labelTexture(artworks[index], true);
    });
    requestFrame();
  });

  function addPrint(slot, outside) {
    const slots = outside ? OUTER_SLOTS : INNER_SLOTS;
    const angle = (slot + (outside ? 0 : .5)) * TAU / slots;
    const count = artworks.length;
    const index = (count * (slots + 1) - slot + (outside ? 0 : 3)) % count;
    const artwork = artworks[index];
    const { art, label } = artMaterials[index];
    const ratio = artwork.width / artwork.height;
    const height = Math.min(1.84, 2.04 / ratio);
    const width = height * ratio;
    const radius = outside ? OUTER - .1 : INNER + .05;
    const group = new THREE.Group();
    group.position.set(radius * Math.cos(angle), 0, radius * Math.sin(angle));
    const direction = outside ? 0 : radius * 2;
    group.lookAt(direction * Math.cos(angle), 0, direction * Math.sin(angle));

    function plane(w, h, mat, x, y, z) {
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
      mesh.position.set(x, y, z);
      group.add(mesh);
      return mesh;
    }

    plane(width + 1.55, height + 1.5, haloMaterial, 0, ART_Y + .1, .003).renderOrder = 1;
    plane(width + .65, height + .8, shadowMaterial, .06, ART_Y - .10, .01).renderOrder = 2;
    const frame = new THREE.Mesh(new THREE.BoxGeometry(width + .15, height + .15, .07), frameMaterial);
    frame.position.set(0, ART_Y, .052);
    group.add(frame);
    plane(width + .103, height + .103, matMaterial, 0, ART_Y, .089);
    const print = plane(width, height, art, 0, ART_Y, .092);
    // The label uses the upper portion of a square canvas.
    const labelPlane = plane(1.35, 1.35, label, -width / 2 + .675, ART_Y - height / 2 - .85, .014);
    labelPlane.renderOrder = 3;
    print.userData = { index, angle, outside };
    targets.push(print);
    scene.add(group);
  }

  for (let slot = 0; slot < OUTER_SLOTS; slot++) addPrint(slot, true);
  for (let slot = 0; slot < INNER_SLOTS; slot++) addPrint(slot, false);
  const pickable = [...targets, ...walls];

  const narrow = () => camera.aspect < .87;
  const offset = () => narrow() ? .26 : .21;
  const walkPose = angle => ({ angle, radius: narrow() ? 14.75 : 15.45, yaw: narrow() ? -.36 : -.20, y: 1.84, pitch: -.12 });
  let pose = walkPose(.37);
  let target = pose.angle;
  let focusPrint = null;
  let glide = null;
  let animation = 0;
  let frameTime = 0;
  let drag = null;

  function requestFrame() {
    if (!animation) animation = requestAnimationFrame(render);
  }

  function moveTo(to, duration = 950) {
    target = to.angle;
    if (reduced.matches) {
      pose = to;
      glide = null;
    } else {
      glide = { from: { ...pose }, to, duration, start: performance.now() };
    }
    requestFrame();
  }

  function focusPose(print) {
    const angle = pose.angle + Math.atan2(Math.sin(print.angle - pose.angle), Math.cos(print.angle - pose.angle));
    const distance = narrow() ? 5.12 : 4.35;
    return {
      angle,
      radius: print.outside ? OUTER - distance : INNER + distance,
      yaw: print.outside ? Math.PI / 2 : -Math.PI / 2,
      y: narrow() ? 1.55 : 1.77,
      pitch: 0
    };
  }

  function focus(print) {
    focusPrint = print;
    moveTo(focusPose(print));
  }

  function stepBack() {
    if (!focusPrint) return;
    const angle = focusPrint.angle + offset();
    focusPrint = null;
    moveTo(walkPose(pose.angle + Math.atan2(Math.sin(angle - pose.angle), Math.cos(angle - pose.angle))));
  }

  function walk(angle) {
    target = angle;
    glide = null;
    if (reduced.matches) pose = walkPose(angle);
    requestFrame();
  }

  function step(direction) {
    if (focusPrint) {
      onStepBack();
      return;
    }
    walk((Math.round((target - offset()) / STEP) - direction) * STEP + offset());
  }

  function render(now) {
    animation = 0;
    const dt = frameTime ? Math.min(.05, (now - frameTime) / 1000) : 1 / 60;
    frameTime = now;

    if (glide) {
      const time = reduced.matches ? 1 : Math.min(1, (now - glide.start) / glide.duration);
      for (const key of Object.keys(pose)) {
        const power = key === 'angle' ? 4 : key === 'yaw' ? 2 : 3;
        pose[key] = THREE.MathUtils.lerp(glide.from[key], glide.to[key], 1 - (1 - time) ** power);
      }
      if (time === 1) glide = null;
    } else if (!focusPrint) {
      const delta = target - pose.angle;
      pose = walkPose(Math.abs(delta) < .0001 ? target : pose.angle + delta * (1 - Math.exp(-dt / .36)));
    }

    const { angle, radius, y, yaw, pitch } = pose;
    camera.position.set(radius * Math.cos(angle), y, radius * Math.sin(angle));
    camera.lookAt(
      camera.position.x + Math.sin(angle + yaw),
      y + pitch,
      camera.position.z - Math.cos(angle + yaw)
    );
    renderer.render(scene, camera);
    if (glide || (!focusPrint && pose.angle !== target)) requestFrame();
  }

  function resize() {
    if (!stage.clientWidth || !stage.clientHeight) return;
    camera.aspect = stage.clientWidth / stage.clientHeight;
    camera.fov = narrow() ? 80 : 56;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(stage.clientWidth, stage.clientHeight, false);
    if (focusPrint) moveTo(focusPose(focusPrint), 180);
    requestFrame();
  }

  function hit(event) {
    const box = stage.getBoundingClientRect();
    pointer.set((event.clientX - box.left) / box.width * 2 - 1, 1 - (event.clientY - box.top) / box.height * 2);
    ray.setFromCamera(pointer, camera);
    const hit = ray.intersectObjects(pickable, false)[0]?.object;
    return hit?.userData.index === undefined ? undefined : hit.userData;
  }

  stage.addEventListener('wheel', event => {
    event.preventDefault();
    if (focusPrint) {
      onStepBack();
      return;
    }
    const units = event.deltaMode === 1 ? 33 : event.deltaMode === 2 ? stage.clientHeight : 1;
    walk(target - (event.deltaY || event.deltaX) * units * .0016);
  }, { passive: false });

  stage.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    stage.setPointerCapture(event.pointerId);
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, start: target, moved: false };
  });

  stage.addEventListener('pointermove', event => {
    if (!drag) {
      stage.classList.toggle('is-over-art', Boolean(hit(event)));
      return;
    }
    if (event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) < 6) return;
    if (!drag.moved && focusPrint) {
      onStepBack();
      drag.start = target;
    }
    drag.moved = true;
    stage.classList.add('is-dragging');
    walk(drag.start + (Math.abs(dx) > Math.abs(dy) ? dx : dy) * (event.pointerType === 'touch' ? .0042 : .0022));
  });

  function finishDrag(event) {
    if (drag?.id !== event.pointerId) return;
    const click = !drag.moved && event.type === 'pointerup';
    drag = null;
    stage.classList.remove('is-dragging');
    if (click) {
      const print = hit(event);
      if (print) onPick(print);
      else if (focusPrint) onStepBack();
    }
  }

  stage.addEventListener('pointerup', finishDrag);
  stage.addEventListener('pointercancel', finishDrag);
  stage.addEventListener('lostpointercapture', finishDrag);
  stage.append(renderer.domElement);

  return {
    start() {
      new ResizeObserver(resize).observe(stage);
      if (stage.clientWidth) resize();
      const from = walkPose(offset() + .16);
      pose = { ...from, radius: from.radius - .35 };
      moveTo(walkPose(offset()), 1250);
    },
    bounds(print) {
      const mesh = targets.find(mesh => mesh.userData === print);
      const box = stage.getBoundingClientRect();
      const { width, height } = mesh.geometry.parameters;
      const corners = [-1, 1].flatMap(x => [-1, 1].map(y =>
        mesh.localToWorld(new THREE.Vector3(x * width / 2, y * height / 2, 0)).project(camera)
      ));
      if (corners.some(point => point.z < -1 || point.z > 1 || Math.abs(point.x) > 1 || Math.abs(point.y) > 1)) return;
      const xs = corners.map(point => box.left + (point.x + 1) * box.width / 2);
      const ys = corners.map(point => box.top + (1 - point.y) * box.height / 2);
      const left = Math.min(...xs);
      const top = Math.min(...ys);
      return { left, top, width: Math.max(...xs) - left, height: Math.max(...ys) - top };
    },
    focus,
    step,
    stepBack,
    nearest() {
      const slot = Math.round((target - offset()) / STEP);
      return targets[(slot % OUTER_SLOTS + OUTER_SLOTS) % OUTER_SLOTS].userData;
    },
    locate(index) {
      const copies = targets.slice(0, OUTER_SLOTS).filter(print => print.userData.index === index);
      function distance(print) {
        const delta = print.userData.angle - pose.angle;
        return Math.abs(Math.atan2(Math.sin(delta), Math.cos(delta)));
      }
      return copies.reduce((closest, print) => distance(print) < distance(closest) ? print : closest).userData;
    }
  };
}
