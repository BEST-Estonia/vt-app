// app/(tabs)/map.tsx
import React, { useState } from 'react';
import { Dimensions, Modal, Pressable, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import FloorMap from './assets/VT2026-messiplaan.svg';

type PlaceholderBooth = {
  boothNumber: string;
  x: number; // 0..1 suhteline x (viewBox 1190)
  y: number; // 0..1 suhteline y (viewBox 1684)
};

type NodeId = string;

type PathNode = {
  id: NodeId;
  x: number; // 0..1 – sama koordinaatsüsteem mis boksidel
  y: number;
  neighbors: NodeId[];
};

// --- BOKSIDE KOORDINAADID SVG põhjal ---
const BOOTHS: PlaceholderBooth[] = [
  { boothNumber: '1', x: 0.5006, y: 0.2050 },
  { boothNumber: '2', x: 0.5006, y: 0.185 },
  { boothNumber: '3', x: 0.5006, y: 0.1594 },
  { boothNumber: '4', x: 0.5006, y: 0.1400 },
  { boothNumber: '5', x: 0.4646, y: 0.2036 },
  { boothNumber: '6', x: 0.4646, y: 0.1884 },
  { boothNumber: '7', x: 0.4646, y: 0.1732 },
  { boothNumber: '8', x: 0.4646, y: 0.1580 },
  { boothNumber: '9', x: 0.4646, y: 0.1429 },
  { boothNumber: '10', x: 0.5347, y: 0.1427 },
  { boothNumber: '11', x: 0.5347, y: 0.1582 },
  { boothNumber: '12', x: 0.5347, y: 0.17299999999999999 },
  { boothNumber: '13', x: 0.5347, y: 0.1882 },
  { boothNumber: '14', x: 0.5347, y: 0.2033 },

  { boothNumber: '15', x: 0.5520, y: 0.2216 },
  { boothNumber: '16', x: 0.5524, y: 0.2407 },
  { boothNumber: '17', x: 0.5484, y: 0.2746 },
  { boothNumber: '18', x: 0.5484, y: 0.299 },
  { boothNumber: '19', x: 0.548, y: 0.3217 },
  { boothNumber: '20', x: 0.548, y: 0.3495 },
  { boothNumber: '21', x: 0.548, y: 0.3727 },
  { boothNumber: '22', x: 0.5484, y: 0.3976 },
  { boothNumber: '23', x: 0.5484, y: 0.4124 },
  { boothNumber: '24', x: 0.5484, y: 0.4277 },
  { boothNumber: '25', x: 0.5484, y: 0.443 },
  { boothNumber: '26', x: 0.5484, y: 0.4618 },
  { boothNumber: '27', x: 0.4011, y: 0.342 },
  { boothNumber: '28', x: 0.3792, y: 0.342 },
  { boothNumber: '29', x: 0.3581, y: 0.342 },
  { boothNumber: '30', x: 0.3365, y: 0.342 },
  { boothNumber: '31', x: 0.3151, y: 0.342 },
  { boothNumber: '32', x: 0.2935, y: 0.342 },
  { boothNumber: '33', x: 0.2721, y: 0.342 },
  { boothNumber: '34', x: 0.2508, y: 0.342 },
  { boothNumber: '35', x: 0.2289, y: 0.342 },
  { boothNumber: '36', x: 0.2056, y: 0.342 },
  { boothNumber: '37', x: 0.1826, y: 0.342 },
  { boothNumber: '38', x: 0.1607, y: 0.342 },
  { boothNumber: '39', x: 0.1388, y: 0.342 },
  { boothNumber: '40', x: 0.4147, y: 0.4584 },
  { boothNumber: '41', x: 0.3963, y: 0.4584 },
  { boothNumber: '43', x: 0.4567, y: 0.4884 },
  { boothNumber: '44', x: 0.4337, y: 0.4884 },
  { boothNumber: '45', x: 0.4047, y: 0.4884 },
  { boothNumber: '46', x: 0.3743, y: 0.4888 },
  { boothNumber: '47', x: 0.3479, y: 0.4844 },
  { boothNumber: '48', x: 0.3263, y: 0.4844 },
  { boothNumber: '49', x: 0.3049, y: 0.4844 },
  { boothNumber: '50', x: 0.2834, y: 0.4844 },
  { boothNumber: '51', x: 0.2626, y: 0.4844 },
  { boothNumber: '52', x: 0.2404, y: 0.4844 },
  { boothNumber: '53', x: 0.219, y: 0.4844 },
  { boothNumber: '54', x: 0.1974, y: 0.4844 },
  { boothNumber: '55', x: 0.1761, y: 0.4844 },
  { boothNumber: '56', x: 0.1519, y: 0.4914 },
  { boothNumber: '57', x: 0.1519, y: 0.5066 },
  { boothNumber: '58', x: 0.1519, y: 0.5217 },
  { boothNumber: '59', x: 0.1519, y: 0.537 },
  { boothNumber: '60', x: 0.1515, y: 0.5521 },
  { boothNumber: '61', x: 0.1515, y: 0.5677 },
  { boothNumber: '62', x: 0.1515, y: 0.5824 },
  { boothNumber: '63', x: 0.1642, y: 0.6008 },
  { boothNumber: '64', x: 0.1855, y: 0.6008 },
  { boothNumber: '65', x: 0.2071, y: 0.6008 },
  { boothNumber: '66', x: 0.2285, y: 0.6008 },
  { boothNumber: '67', x: 0.2501, y: 0.6008 },
  { boothNumber: '68', x: 0.2781, y: 0.62 },
  { boothNumber: '69', x: 0.3049, y: 0.5877 },
  { boothNumber: '70', x: 0.3293, y: 0.5374 },
  { boothNumber: '71', x: 0.3293, y: 0.5227 },
  { boothNumber: '72', x: 0.3029, y: 0.5129 },
  { boothNumber: '73', x: 0.2813, y: 0.5129 },
  { boothNumber: '74', x: 0.26, y: 0.5129 },
  { boothNumber: '75', x: 0.2384, y: 0.5129 },
  { boothNumber: '76', x: 0.217, y: 0.5129 },
  { boothNumber: '77', x: 0.177, y: 0.5517 },
  { boothNumber: '78', x: 0.1986, y: 0.5517 },
  { boothNumber: '79', x: 0.2202, y: 0.5517 },
  { boothNumber: '80', x: 0.2419, y: 0.5517 },
  { boothNumber: '81', x: 0.2633, y: 0.5517 },
  { boothNumber: '82', x: 0.2817, y: 0.5517 },
  { boothNumber: '83', x: 0.3041, y: 0.5519 },
  { boothNumber: '84', x: 0.4984, y: 0.6129 },
  { boothNumber: '85', x: 0.4775, y: 0.6129 },
  { boothNumber: '86', x: 0.4563, y: 0.6129 },
  { boothNumber: '87', x: 0.4343, y: 0.6129 },
  { boothNumber: '88', x: 0.4131, y: 0.6129 },
  { boothNumber: '89', x: 0.3917, y: 0.6129 },
  { boothNumber: '90', x: 0.3702, y: 0.6129 },
  { boothNumber: '91', x: 0.3509, y: 0.6131 },
  { boothNumber: '92', x: 0.3289, y: 0.6131 },
  { boothNumber: '93', x: 0.3049, y: 0.6131 },
  { boothNumber: '94', x: 0.2834, y: 0.6131 },
  { boothNumber: '95', x: 0.262, y: 0.6131 },
  { boothNumber: '96', x: 0.2403, y: 0.6131 },
  { boothNumber: '97', x: 0.2201, y: 0.6133 },
  { boothNumber: '98', x: 0.1978, y: 0.6133 },
  { boothNumber: '99', x: 0.1764, y: 0.6133 },
  { boothNumber: '100', x: 0.1544, y: 0.6133 },
  { boothNumber: '101', x: 0.6317, y: 0.6095 },
  { boothNumber: '102', x: 0.6551, y: 0.6095 },
  { boothNumber: '103', x: 0.6839, y: 0.6095 },
  { boothNumber: '104', x: 0.6956, y: 0.6291 },
  { boothNumber: '105', x: 0.6956, y: 0.6442 },
  { boothNumber: '106', x: 0.6956, y: 0.6597 },
  { boothNumber: '107', x: 0.6956, y: 0.6742 },
  { boothNumber: '108', x: 0.6956, y: 0.7093 },
  { boothNumber: '109', x: 0.6956, y: 0.7915 },
  { boothNumber: '110', x: 0.6956, y: 0.768 },
  { boothNumber: '111', x: 0.6952, y: 0.7533 },
  { boothNumber: '112', x: 0.6952, y: 0.7294 },
  { boothNumber: '113', x: 0.6952, y: 0.7143 },
  { boothNumber: '114', x: 0.6952, y: 0.6906 },
  { boothNumber: '115', x: 0.6764, y: 0.6866 },
  { boothNumber: '116', x: 0.6551, y: 0.6866 },
  { boothNumber: '117', x: 0.6335, y: 0.6866 },
  { boothNumber: '118', x: 0.6569, y: 0.7197 },
  { boothNumber: '119', x: 0.6726, y: 0.7348 },
  { boothNumber: '120', x: 0.6569, y: 0.7653 },
  { boothNumber: '121', x: 0.6718, y: 0.7804 },
  { boothNumber: '122', x: 0.6569, y: 0.8107 },
  { boothNumber: '123', x: 0.6726, y: 0.8258 },
];

// --- GRAAF: peauksest koridoripunktideni ---
const START_NODE_ID: NodeId = 'main-entrance';

const NODES: PathNode[] = [
  {
    id: 'main-entrance',
    x: 0.46,
    y: 0.26,
    neighbors: ['main-entrance-front'],
  },
  {
    id: 'main-entrance-front',
    x: 0.52,
    y: 0.26,
    neighbors: ['fuajee-top', 'corridor-cafe-front'],
  },
  {
    id: 'corridor-cafe-front',
    x: 0.52,
    y: 0.36,
    neighbors: ['main-entrance-front', 'cafe-area', 'corridor-aula-stairs'],
  },
  {
    id: 'cafe-area',
    x: 0.24,
    y: 0.36,
    neighbors: ['corridor-cafe-front'],
  },
  {
    id: 'corridor-aula-stairs',
    x: 0.52,
    y: 0.46,
    neighbors: ['corridor-cafe-front'],
  },
  {
    id: 'fuajee-top',
    x: 0.52,
    y: 0.17,
    neighbors: ['main-entrance'],
  },
];

// boks → lähim teepunkt (võid hiljem täiendada)
const BOOTH_TO_NODE: Record<string, NodeId> = {
  '1': 'fuajee-top',
  '2': 'fuajee-top',
  '3': 'fuajee-top',
  '4': 'fuajee-top',
  '10': 'corridor-fuajee',
  '11': 'corridor-fuajee',
  '12': 'corridor-fuajee',
  '13': 'corridor-fuajee',
  '14': 'corridor-fuajee',
  '15': 'corridor-fuajee',
  '16': 'corridor-fuajee',
  '17': 'corridor-fuajee',
  '18': 'corridor-fuajee',
  '19': 'corridor-fuajee',
  '20': 'corridor-cafe-front',
  '21': 'corridor-fuajee',
  '22': 'corridor-fuajee',
  '23': 'corridor-fuajee',
  '24': 'corridor-fuajee',
  '25': 'corridor-fuajee',
  '26': 'corridor-fuajee',
  '35': 'cafe-area',

  '60': 'corridor-aula',
  '61': 'corridor-aula',
  '62': 'corridor-aula',
  '63': 'corridor-aula',
  '64': 'corridor-aula',

  '84': 'corridor-middle', // näide – siia võiks tulla nt SEB
};

// --- PATHI LEIDMINE (BFS) ---
function findPath(startId: NodeId, endId: NodeId): PathNode[] {
  const byId: Record<string, PathNode> = {};
  NODES.forEach((n) => {
    byId[n.id] = n;
  });

  if (!byId[startId] || !byId[endId]) return [];

  const queue: NodeId[] = [startId];
  const visited: Record<string, boolean> = { [startId]: true };
  const prev: Record<string, NodeId | null> = { [startId]: null };

  let found = false;

  while (queue.length > 0) {
    const current = queue.shift() as NodeId;
    if (current === endId) {
      found = true;
      break;
    }
    const node = byId[current];
    for (const neighbor of node.neighbors) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        prev[neighbor] = current;
        queue.push(neighbor);
      }
    }
  }

  if (!found) return [];

  const path: PathNode[] = [];
  let cur: NodeId | null = endId;
  while (cur) {
    path.push(byId[cur]);
    cur = prev[cur] ?? null;
  }

  return path.reverse();
}

// --- ZOOMI SEADED ---
const MIN_SCALE = 0.8;
const MAX_SCALE = 3;

export default function MapScreen() {
  const [selected, setSelected] = useState<PlaceholderBooth | null>(null);
  const [pathNodes, setPathNodes] = useState<PathNode[]>([]);

  const { width, height: screenHeight } = Dimensions.get('window');
  const baseHeight = (width * 1684) / 1190; // SVG viewBox ratio
  const boothSize = 10;

  // zoom & pan shared values
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startScale = useSharedValue(1);

  // pinch zoom
  const pinch = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value;
    })
    .onUpdate((event) => {
      let next = startScale.value * event.scale;
      if (next < MIN_SCALE) next = MIN_SCALE;
      if (next > MAX_SCALE) next = MAX_SCALE;
      scale.value = next;
    });

  // pan
  const pan = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  // double tap reset
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      scale.value = withTiming(1);
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
    });

  const gesture = Gesture.Simultaneous(pinch, pan, doubleTap);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const containerHeight = Math.max(baseHeight, screenHeight * 0.7);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              width,
              height: containerHeight,
              justifyContent: 'center',
              alignItems: 'center',
            },
            animatedStyle,
          ]}
        >
          <View style={{ width, height: baseHeight }}>
            {/* SVG kaart */}
            <FloorMap width="100%" height="100%" />

            {/* PATH peauksest valitud boksini */}
            {pathNodes.length > 1 &&
              pathNodes.map((node, index) => {
                if (index === 0) return null;
                const prev = pathNodes[index - 1];

                const x1 = prev.x * width;
                const y1 = prev.y * baseHeight;
                const x2 = node.x * width;
                const y2 = node.y * baseHeight;

                const left = Math.min(x1, x2);
                const top = Math.min(y1, y2);
                const segmentWidth = Math.max(Math.abs(x2 - x1), 4);
                const segmentHeight = Math.max(Math.abs(y2 - y1), 4);

                return (
                  <View
                    key={`${prev.id}-${node.id}`}
                    style={{
                      position: 'absolute',
                      left,
                      top,
                      width: segmentWidth,
                      height: segmentHeight,
                      backgroundColor: 'rgba(16,185,129,0.7)', // roheline tee
                      borderRadius: 999,
                    }}
                  />
                );
              })}

            {/* PATH NODE ringid (algus/lõpp ja vahepunktid) */}
            {pathNodes.map((node) => (
              <View
                key={node.id}
                style={{
                  position: 'absolute',
                  left: node.x * width - 6,
                  top: node.y * baseHeight - 6,
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor:
                    node.id === START_NODE_ID ? '#22c55e' : '#0ea5e9',
                  borderWidth: 1,
                  borderColor: '#ffffff',
                }}
              />
            ))}

            {/* BOKSID kaardi peal */}
            {BOOTHS.map((b) => (
              <Pressable
                key={b.boothNumber}
                onPress={() => {
                  setSelected(b);
                  const nodeId = BOOTH_TO_NODE[b.boothNumber];
                  if (nodeId) {
                    const path = findPath(START_NODE_ID, nodeId);
                    setPathNodes(path);
                  } else {
                    setPathNodes([]);
                  }
                }}
                style={{
                  position: 'absolute',
                  left: b.x * width - boothSize / 2,
                  top: b.y * baseHeight - boothSize / 2,
                  width: boothSize,
                  height: boothSize,
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: '#1E66FF',
                  backgroundColor: 'rgba(30,102,255,0.18)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 4, fontWeight: '600' }}>
                  {b.boothNumber}
                </Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      </GestureDetector>

      {/* Modal boksi info jaoks */}
      <Modal visible={!!selected} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: '80%',
              padding: 16,
              borderRadius: 12,
              backgroundColor: 'white',
              gap: 8,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700' }}>
              Boks {selected?.boothNumber}
            </Text>
            <Text style={{ fontSize: 14 }}>
              Praegu placeholder. Hiljem loeme siia SEB / Swedbank / jne info
              otse veebirakenduse andmebaasist ja kuvame logo + kirjelduse.
            </Text>
            <Pressable
              onPress={() => setSelected(null)}
              style={{
                marginTop: 12,
                alignSelf: 'flex-end',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 999,
                backgroundColor: '#1E66FF',
              }}
            >
              <Text style={{ color: 'white', fontWeight: '600' }}>Sulge</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
