// app/(tabs)/map.tsx
import React, { useState } from 'react';
import { Dimensions, Modal, Pressable, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import FloorMap from './assets/realplan1.svg';

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

  { boothNumber: '17', x: 0.5514, y: 0.2786 },
  { boothNumber: '18', x: 0.5514, y: 0.299 },
  { boothNumber: '19', x: 0.5514, y: 0.3217 },
  { boothNumber: '20', x: 0.5514, y: 0.3495 },
  { boothNumber: '21', x: 0.5514, y: 0.3727 },
  { boothNumber: '22', x: 0.5514, y: 0.4012 },
  { boothNumber: '23', x: 0.5514, y: 0.4164 },
  { boothNumber: '24', x: 0.5514, y: 0.4312 },
  { boothNumber: '25', x: 0.5514, y: 0.4466 },
  { boothNumber: '26', x: 0.5514, y: 0.4618 },

  { boothNumber: '27', x: 0.4061, y: 0.340 },
  { boothNumber: '28', x: 0.3842, y: 0.340 },
  { boothNumber: '29', x: 0.3631, y: 0.34 },
  { boothNumber: '30', x: 0.3415, y: 0.34 },
  { boothNumber: '31', x: 0.3201, y: 0.34 },
  { boothNumber: '32', x: 0.2985, y: 0.34 },
  { boothNumber: '33', x: 0.2771, y: 0.34 },
  { boothNumber: '34', x: 0.2558, y: 0.34 },
  { boothNumber: '35', x: 0.2345, y: 0.34 },

  { boothNumber: '36', x: 0.22, y: 0.3501 },
  { boothNumber: '37', x: 0.22, y: 0.3655 },

  { boothNumber: '38', x: 0.2337, y: 0.3935 },
  { boothNumber: '39', x: 0.2555, y: 0.3935 },
  { boothNumber: '40', x: 0.277, y: 0.3935 },
  { boothNumber: '41', x: 0.298, y: 0.3935 },

  { boothNumber: '42', x: 0.378, y: 0.5530 },
  { boothNumber: '43', x: 0.378, y: 0.5379 },
  { boothNumber: '44', x: 0.378, y: 0.5228 },
  { boothNumber: '45', x: 0.378, y: 0.5077 },
  { boothNumber: '46', x: 0.378, y: 0.4926 },

  { boothNumber: '47', x: 0.3529, y: 0.4819 },
  { boothNumber: '48', x: 0.3319, y: 0.4819 },
  { boothNumber: '49', x: 0.310, y: 0.4819 },
  { boothNumber: '50', x: 0.2884, y: 0.4819 },
  { boothNumber: '51', x: 0.267, y: 0.4819 },
  { boothNumber: '52', x: 0.245, y: 0.4819 },
  { boothNumber: '53', x: 0.224, y: 0.4819 },
  { boothNumber: '54', x: 0.2025, y: 0.4819 },
  { boothNumber: '55', x: 0.181, y: 0.4819 },

  { boothNumber: '56', x: 0.1549, y: 0.495 },
  { boothNumber: '57', x: 0.1549, y: 0.5102 },
  { boothNumber: '58', x: 0.1549, y: 0.5253 },
  { boothNumber: '59', x: 0.1549, y: 0.5406 },
  { boothNumber: '60', x: 0.1549, y: 0.5557 },
  { boothNumber: '61', x: 0.1549, y: 0.5713 },
  { boothNumber: '62', x: 0.1549, y: 0.586 },


  { boothNumber: '63', x: 0.1692, y: 0.6 },
  { boothNumber: '64', x: 0.1905, y: 0.6 },
  { boothNumber: '65', x: 0.2121, y: 0.6 },
  { boothNumber: '66', x: 0.2335, y: 0.6 },
  { boothNumber: '67', x: 0.2551, y: 0.6 },

  { boothNumber: '68', x: 0.2811, y: 0.623 },

  { boothNumber: '69', x: 0.3079, y: 0.5914 },

  { boothNumber: '70', x: 0.3323, y: 0.5414 },
  { boothNumber: '71', x: 0.3323, y: 0.5260 },

  { boothNumber: '72', x: 0.3079, y: 0.5119 },
  { boothNumber: '73', x: 0.2863, y: 0.5119 },
  { boothNumber: '74', x: 0.2650, y: 0.5119 },
  { boothNumber: '75', x: 0.2434, y: 0.5119 },
  { boothNumber: '76', x: 0.2220, y: 0.5119 },

  { boothNumber: '77', x: 0.1975, y: 0.5260 },
  { boothNumber: '78', x: 0.1975, y: 0.5414 },

  { boothNumber: '79', x: 0.2222, y: 0.5557 },
  { boothNumber: '80', x: 0.2439, y: 0.5557 },
  { boothNumber: '81', x: 0.2653, y: 0.5557 },
  { boothNumber: '82', x: 0.2867, y: 0.5557 },
  { boothNumber: '83', x: 0.3081, y: 0.5557 },

  { boothNumber: '84', x: 0.5244, y: 0.6967 },

  { boothNumber: '85', x: 0.5244, y: 0.72 },
  { boothNumber: '86', x: 0.5244, y: 0.735 },
  { boothNumber: '87', x: 0.5244, y: 0.7583 },
  { boothNumber: '88', x: 0.5244, y: 0.7739 },
  { boothNumber: '89', x: 0.5244, y: 0.797 },
  { boothNumber: '90', x: 0.5244, y: 0.8126 },

  { boothNumber: '91', x: 0.6325, y: 0.7151 },
  { boothNumber: '92', x: 0.6325, y: 0.7341 },
  { boothNumber: '93', x: 0.6325, y: 0.7491 },
  { boothNumber: '94', x: 0.6325, y: 0.7641 },
  { boothNumber: '95', x: 0.6325, y: 0.7791 },

  { boothNumber: '96', x: 0.6325, y: 0.8121 },
  { boothNumber: '97', x: 0.6325, y: 0.8311 },
  { boothNumber: '98', x: 0.6325, y: 0.8463 },
  { boothNumber: '99', x: 0.6325, y: 0.8613 },
  { boothNumber: '100', x: 0.6325, y: 0.8763 },

  { boothNumber: '101', x: 0.6815, y: 0.8999 },
  { boothNumber: '102', x: 0.6601, y: 0.8999 },
  { boothNumber: '103', x: 0.6383, y: 0.8999 },

  { boothNumber: '104', x: 0.6996, y: 0.8899 },
  { boothNumber: '105', x: 0.6996, y: 0.8748 },
  { boothNumber: '106', x: 0.6996, y: 0.851 },
  { boothNumber: '107', x: 0.6996, y: 0.8362 },
  { boothNumber: '108', x: 0.6996, y: 0.8123 },
  { boothNumber: '109', x: 0.6996, y: 0.7975 },
  { boothNumber: '110', x: 0.6996, y: 0.7739 },
  { boothNumber: '111', x: 0.6996, y: 0.7583 },
  { boothNumber: '112', x: 0.6996, y: 0.7349 },
  { boothNumber: '113', x: 0.6996, y: 0.7197 },
  { boothNumber: '114', x: 0.6996, y: 0.6976 },

  { boothNumber: '115', x: 0.6835, y: 0.6846 },
  { boothNumber: '116', x: 0.6621, y: 0.6846 },
  { boothNumber: '117', x: 0.641, y: 0.6846 },

  { boothNumber: '118', x: 0.6649, y: 0.7187 },
  { boothNumber: '119', x: 0.6649, y: 0.7348 },
  { boothNumber: '120', x: 0.6649, y: 0.7653 },
  { boothNumber: '121', x: 0.6649, y: 0.7804 },
  { boothNumber: '122', x: 0.6649, y: 0.8107 },
  { boothNumber: '123', x: 0.6649, y: 0.8258 },
  { boothNumber: '124', x: 0.6649, y: 0.8558 },
  { boothNumber: '125', x: 0.6649, y: 0.8728 },
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
  const boothSize = 8;

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
                  borderRadius: 1,
                  borderWidth: 0.5,
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
